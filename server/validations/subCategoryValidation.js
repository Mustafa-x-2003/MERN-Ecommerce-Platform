import joi from "joi";
import { paginationSchema } from "../utils/sharedSchemas.js";
export const createSubCategorySchema = joi.object({
  name: joi.string().min(2).max(32).trim().lowercase(),
  category: joi.string().hex().length(24).required(),
});
export const geteSubCategorySchema = joi.object({
  ...paginationSchema,
});
export const updateSubCategorySchema = joi.object({
 name: joi.string().min(2).max(32).trim().lowercase().required()
});
