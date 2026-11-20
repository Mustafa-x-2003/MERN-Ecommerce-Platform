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
  // Filtreing
  const queryStringObj = { ...req.validateData };
  const excludesFields = ["page", "limit", "sort", "fields"];
  excludesFields.forEach((field) => delete queryStringObj[field]);

  const queryStr = JSON.stringify(queryStringObj);

  const filter = JSON.parse(
    queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`),
  );

  // Pagination
  const { page, limit } = req.validateData;
  const skip = (page - 1) * limit;

  const mongooseQuery = Product.find(filter).skip(skip).limit(limit);
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
