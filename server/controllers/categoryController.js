import Category from "../models/categortModel.js";

export const createCategory = async (req, res) => {
  try {
    let category = await Category.findOne({ name: req.body.name });
    if (category) {
      return res.status(400).json({
        message: "category olrady valid",
      });
    }

    category = new Category(req.body);
    await category.save();

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating category",
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      },
    });
  }
};
export const getCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      success: true,
      message: "Categories retrieved successfully",
      categories: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching categories",
      error: {
        code: "INTERNAL_SERVER_ERROR",
        error: error.message,
      },
    });
  }
};
