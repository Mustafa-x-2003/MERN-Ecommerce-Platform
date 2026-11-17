import Category from "../models/categoryModel.js";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/errorClass.js";

// @desc    Create category
// @Route   POST /api/category
// @Access  Private
export const createCategory = asyncHandler(async (req, res) => {
  let category = await Category.findOne({ name: req.body.name });
  if (category) {
    throw new ApiError("Category already exists", 400);
  }

  category = new Category(req.body);
  await category.save();

  return res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: category,
  });
});

// @desc    Get category list
// @Route   GET /api/category
// @Access  Public
export const getCategory = asyncHandler(async (req, res) => {
  let { page, limit } = req.validateData;
  const skip = (page - 1) * limit;
  const categories = await Category.find().skip(skip).limit(limit);
  const totalCategories = await Category.countDocuments();
  const totalPages = Math.ceil(totalCategories / limit);
  return res.status(200).json({
    success: true,
    message: "Categories retrieved successfully",
    result: categories.length,
    totalCategories,
    currentPage:page,
    totalPages,
    limit,
    data: categories,
  });
});

// @desc    Get category by id
// @Route   GET /api/category/:id
// @Access  Public
export const getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);

  if (!category) {
    throw new ApiError(`No category found for id: ${id}`, 404);
  }

  return res.status(200).json({
    success: true,
    data: category,
  });
});

// @desc    Update category by id
// @Route   PUT /api/category/:id
// @Access  Private
export const updateCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;


  const category = await Category.findById(id);

  if (!category) {
    throw new ApiError(`No category found for id: ${id}`, 404);
  }

  category.name = name;
  await category.save();

  return res.status(200).json({
    success: true,
    data: category,
  });
});

// @desc    Delete category by id
// @Route   DELETE /api/category/:id
// @Access  Private
export const deleteCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    throw new ApiError(`No category found for id: ${id}`, 404);
  }

  return res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
});
