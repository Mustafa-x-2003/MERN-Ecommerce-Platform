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
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "error",
      error: error.message,
    });
  }
};
