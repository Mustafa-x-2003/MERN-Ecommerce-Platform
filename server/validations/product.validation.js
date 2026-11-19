import joi from "joi";
import Category from "../models/categoryModel.js";
import ApiError from "../utils/errorClass.js";
import SubCategory from "../models/subCategoryModel.js";
export const createProductValidator = joi
  .object({
    title: joi.string().trim().required().min(2).max(100),

    description: joi.string().trim().required().min(20).max(2000),

    price: joi.number().required().min(0).max(1000000),

    discount: joi.number().min(0).max(100).default(0),

    colors: joi.array().items(joi.string().trim()),

    imageCaver: joi.string().trim().required(),

    images: joi.array().items(joi.string().trim()).default([]),

    stock: joi.number().integer().min(0).default(0),

    category: joi.string().hex().length(24).required(),

    subCategory: joi.array().items(joi.string().hex().length(24)).default([]),

    brand: joi.string().hex().length(24).optional(),

    isActive: joi.boolean().default(true),
  })
  .external(async (value) => {
    // Validation Category
    const categoryID = value.category;
    const category = await Category.exists({ _id: categoryID });

    if (!category) {
      throw new ApiError(`Category not found for id: ${categoryID}`, 404);
    }
    // Validation SubCategory
    const padSubCategory = [];
    await Promise.all(
      value.subCategory.map(async (id) => {
        let result = await SubCategory.exists({
          _id: id,
          category: categoryID,
        });
        if (!result) {
          padSubCategory.push(id);
        }
      }),
    );
    if (padSubCategory.length > 0) {
      throw new ApiError(
        `The following subcategories were not found or do not belong to the selected category: ${padSubCategory}`,
        404,
      );
    }
  });
