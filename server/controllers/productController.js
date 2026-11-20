import ApiError from "../utils/errorClass.js";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
export const createProduct = asyncHandler(async (req, res) => {
  //   const images = req.files.map((image) => image.path);
  //   const product = new Product({ ...req.body, images });

  const product = new Product(req.body);
  await product.save();
  res.status(201).json({
    success: true,
    message: "Product ctreted successfully",
    data: product,
  });
});

export const getProducts = asyncHandler(async (req, res) => {
  // 1) Filtreing
  const queryStringObj = { ...req.validateData };
  const excludesFields = ["page", "limit", "sort", "fields", "keyword"];
  excludesFields.forEach((field) => delete queryStringObj[field]);

  const queryStr = JSON.stringify(queryStringObj);

  const filter = JSON.parse(
    queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`),
  );

  // 2) Pagination
  const { page, limit } = req.validateData;
  const skip = (page - 1) * limit;
  const mongooseQuery = Product.find(filter).skip(skip).limit(limit);
  // 3) Sorting
  if (req.validateData.sort) {
    const sortBy = req.validateData.sort.split(",").join(" ");
    console.log(sortBy);
    console.log(req.validateData.sort);

    mongooseQuery.sort(sortBy);
  }
  // 4) Fields limiting
  if (req.validateData.fields) {
    const fields = req.validateData.fields.split(",").join(" ");
    mongooseQuery.select(fields);
  }
  // 5) Search
  if (req.validateData.keyword) {
    const keyword = req.validateData.keyword;

    const searchBy = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    mongooseQuery.find(searchBy);
  }
  const products = await mongooseQuery;

  const totalProducts = await Product.countDocuments(filter);
  const totalPages = Math.ceil(totalProducts / limit);

  return res.status(200).json({
    success: true,
    message: "Products retrieved successfully",
    result: products.length,
    totalProducts,
    currentPage: page,
    totalPages,
    limit,
    data: products,
  });
});

export const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(`Product not found for id: ${id}`, 404);
  }
  res.status(200).json({
    success: true,
    data: product,
  });
});
