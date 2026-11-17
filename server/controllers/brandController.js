import asyncHandler from "express-async-handler";
import Brand from "../models/brandModel.js";
import ApiError from "../utils/errorClass.js";
export const createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  let brand = await Brand.findOne({ name });
  if (brand) {
    throw new ApiError("Brand already exists", 409);
  }
  brand = new Brand({name});
  await brand.save();
  res.status(201).json({
    success: true,
    message: "Brand Created Successfully",
    data: brand,
  });
});
