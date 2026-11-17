import express from "express";
const brandRouter = express.Router();
// Middleware
import validator from "../middleware/valitatorMiddleware.js";
// Controllers
import { createBrand } from "../controllers/brandController.js";
import { createBrandValidator } from "../validations/brand.validation.js";

brandRouter.post("/", validator(createBrandValidator, "body"), createBrand);
export default brandRouter;
