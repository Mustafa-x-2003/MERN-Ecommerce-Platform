import express from "express";
const brandRouter = express.Router();
// Middleware
import validator from "../middleware/valitatorMiddleware.js";
// Controllers
import {
  createBrand,
  getBrandById,
  getBrands,
} from "../controllers/brandController.js";
import {
  createBrandValidator,
  getBrandsValidator,
} from "../validations/brand.validation.js";
import { idParamSchema } from "../utils/sharedSchemas.js";

brandRouter.post("/", validator(createBrandValidator, "body"), createBrand);
brandRouter.get("/", validator(getBrandsValidator, "query"), getBrands);
brandRouter.get("/:id", validator(idParamSchema, "params"), getBrandById);
export default brandRouter;
