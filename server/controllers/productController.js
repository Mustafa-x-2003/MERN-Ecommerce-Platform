import mongoose from "mongoose";
import Product from "../models/productModel.js";
export const createProduct = async (req, res) => {
  try {
    const images = req.files.map((image) => image.path);
    const product = new Product({ ...req.body, images });
    await product.save();
    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "",
      error: error.message,
    });
  }
};
export const getProducts = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    const filter = {};

    if (name) {
      filter.name = {
        $regex: name,
        $options: "i",
      };
    }

    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    const products = await Product.find(filter);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching products",
      error: error.message,
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const productID = req.params.id;
    if (!productID || !mongoose.Types.ObjectId.isValid(productID)) {
      return res.status(404).json({
        success: false,
        message: "Invalid product ID",
      });
    }
    const product = await Product.findById(productID);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: "Internal server error",
    });
  }
};
