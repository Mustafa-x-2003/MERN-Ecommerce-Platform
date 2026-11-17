import express from "express";
import {
  createSubCategory,
  deleteSubCategory,
  getSubCategory,
  updateSubCategory,
} from "../controllers/subCategoryController.js";
import {
  createSubCategorySchema,
  geteSubCategorySchema,
  updateSubCategorySchema,
} from "../validations/subCategoryValidation.js";
import validator from "../middleware/valitatorMiddleware.js";
import { idParamSchema } from "../utils/sharedSchemas.js";
const subCategoryRouter = express.Router({ mergeParams: true });
subCategoryRouter.post(
  "/",
  validator(createSubCategorySchema, "body"),
  createSubCategory,
);
subCategoryRouter.get(
  "/",
  validator(geteSubCategorySchema, "query"),
  getSubCategory,
);
subCategoryRouter.put(
  "/:id",
  validator(idParamSchema, "params"),
  validator(updateSubCategorySchema, "body"),
  updateSubCategory,
);
subCategoryRouter.delete(
  "/:id",
  validator(idParamSchema, "params"),
  deleteSubCategory,
);
export default subCategoryRouter;
