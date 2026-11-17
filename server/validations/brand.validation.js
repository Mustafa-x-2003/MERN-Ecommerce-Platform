import joi from "joi";
export const createBrandValidator = joi.object({
    name:joi.string().trim().min(2).max(32).required()
})