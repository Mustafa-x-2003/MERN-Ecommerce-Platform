import Joi from "joi";
export const paginationSchema = {
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(4),
};

export const idParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
