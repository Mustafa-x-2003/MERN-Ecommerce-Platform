import express from "express";
const brandRouter = express.Router();
// Middleware
import validator from "../middleware/valitatorMiddleware.js";
// Controllers
import { createBrand, getBrands } from "../controllers/brandController.js";
import {
  createBrandValidator,
  getBrandsValidator,
} from "../validations/brand.validation.js";

brandRouter.post("/", validator(createBrandValidator, "body"), createBrand);
brandRouter.get("/", validator(getBrandsValidator, "query"), getBrands);
export default brandRouter;
