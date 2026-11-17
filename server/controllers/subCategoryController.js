import asyncHandler from "express-async-handler";
import SubCategory from "../models/subCategoryModel.js";
import ApiError from "../utils/errorClass.js";
export const createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  let subCategory = await SubCategory.findOne({ name });
  if (subCategory) {
    throw new ApiError("subCategory already exists", 400);
  }
  subCategory = new SubCategory({ category, name });
  await subCategory.save();
  return res.status(201).json({
    success: true,
    message: "SubCategory created successfully",
    data: subCategory,
  });
});
export const getSubCategory = asyncHandler(async (req, res) => {
  let { page, limit } = req.validateData;
  let filtter = {};
  if (req.params.categoryID) {
    filtter = { category: req.params.categoryID };
  }
  const skip = (page - 1) * limit;
  const subCategory = await SubCategory.find(filtter).skip(skip).limit(limit);
  const totalSubCategory = await SubCategory.countDocuments();
  const totalPages = Math.ceil(totalSubCategory / limit);

  if (!subCategory) {
    throw new ApiError("");
  }
  return res.status(200).json({
    success: true,
    message: "SubCategories retrieved successfully",
    result: subCategory.length,
    totalSubCategory,
    currentPage: page,
    totalPages,
    limit,
    data: subCategory,
  });
});
export const updateSubCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const subCategory = await SubCategory.findById(id);
  if (!subCategory) {
    throw new ApiError(`No SubCategory found for id: ${id}`, 404);
  }

  subCategory.name = name;
  await subCategory.save();

  return res.status(200).json({
    success: true,
    data: subCategory,
  });
});
export const deleteSubCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findByIdAndDelete(id);
  if (!subCategory) {
    throw new ApiError(`No SubCategory found for id: ${id}`, 404);
  }
  res.status(200).json({
    success: true,
    message: "SubCategory deleted successfully",
  });
});
