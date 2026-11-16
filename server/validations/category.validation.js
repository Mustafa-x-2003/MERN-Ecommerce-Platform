import Joi from "joi";
import { paginationSchema } from "../utils/sharedSchemas.js";

export const creatCategorySchema = Joi.object({
  name: Joi.string().trim().min(3).max(30).required(),
});
export const getCategorySchema = Joi.object({
  ...paginationSchema
});

export const updateCategorSchema = Joi.object({
  name: Joi.string().trim().min(3).max(30).required(),
  
});
export const deleteCategoryBuIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
