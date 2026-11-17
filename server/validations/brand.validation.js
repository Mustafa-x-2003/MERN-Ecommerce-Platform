import joi from "joi";
import { paginationSchema } from "../utils/sharedSchemas.js";
export const createBrandValidator = joi.object({
    name:joi.string().trim().min(2).max(32).required()
})
export const getBrandsValidator = joi.object({
    ...paginationSchema
})