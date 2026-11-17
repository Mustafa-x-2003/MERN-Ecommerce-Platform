import express from "express";
import {
  createCategory,
  deleteCategoryById,
  getCategory,
  getCategoryById,
  updateCategoryById,
} from "../controllers/categoryController.js";
import validator from "../middleware/valitatorMiddleware.js";
import {
  creatCategorySchema,
  getCategorySchema,
  updateCategorSchema,
} from "../validations/category.validation.js";
import { idParamSchema } from "../utils/sharedSchemas.js";
import subCategoryRouter from "../router/subcategoryRouter.js";
const categoryRouter = express.Router();
categoryRouter.use("/:categoryID/subcategory", subCategoryRouter);
categoryRouter.post(
  "/",
  validator(creatCategorySchema, "body"),
  createCategory,
);
categoryRouter.get("/", validator(getCategorySchema, "query"), getCategory);
categoryRouter.get("/:id", validator(idParamSchema, "params"), getCategoryById);
categoryRouter.put(
  "/:id",
  validator(idParamSchema, "params"),
  validator(updateCategorSchema, "body"),
  updateCategoryById,
);
categoryRouter.delete(
  "/:id",
  validator(idParamSchema, "params"),
  deleteCategoryById,
);
export default categoryRouter;
