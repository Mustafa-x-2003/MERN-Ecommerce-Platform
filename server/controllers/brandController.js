import asyncHandler from "express-async-handler";
import Brand from "../models/brandModel.js";
import ApiError from "../utils/errorClass.js";
/**
  @desc    Create a new brand
  @route   POST /api/brand
  @access  Private (Admin)
 */
export const createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  let brand = await Brand.findOne({ name });
  if (brand) {
    throw new ApiError("Brand already exists", 409);
  }
  brand = new Brand({ name });
  await brand.save();
  res.status(201).json({
    success: true,
    message: "Brand Created Successfully",
    data: brand,
  });
});
/**
  @desc    Retrieve all brands
  @route   GET /api/brand
  @access  Public
*/
export const getBrands = asyncHandler(async (req, res) => {
  const { page, limit } = req.validateData;

  const skip = (page - 1) * limit;
  const brands = await Brand.find({}).skip(skip).limit(limit);
  const totalBrands = await Brand.countDocuments();
  const totalPages = Math.ceil(totalBrands / limit);
  return res.status(200).json({
    success: true,
    message: "Brands retrieved successfully",
    result: brands.length,
    totalBrands,
    currentPage: page,
    totalPages,
    limit,
    data: brands,
  });
});
/**
  @desc    Retrieve brands by id
  @route   GET /api/brand/:id
  @access  Public
*/
export const getBrandById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);
  if (!brand) {
    throw new ApiError(`No brand found for id: ${id}`, 404);
  }
  res.status(200).json({
    success: true,
    data: brand,
  });
});
/**
  @desc    Update brand
  @route   PUT /api/brand/:id
  @access  Private (Admin)
*/
export const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const brand = await Brand.findById(id);
  if (!brand) {
    throw new ApiError(`No brand found for id: ${id}`, 404);
  }
  brand.name = name;
  await brand.save();
  res.status(200).json({
    success: true,
    data: brand,
  });
});

/**
  @desc    Delete brand
  @route   PUT /api/brand/:id
  @access  Private (Admin)
*/
export const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const brand = await Brand.findByIdAndDelete(id);
  if (!brand) {
    throw new ApiError(`No brand found for id: ${id}`, 404);
  }
  res.status(200).json({
    success: true,
    data: brand,
  });
});