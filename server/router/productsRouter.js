import express from "express";
import auth from "../middleware/auth.js";
import validator from "../middleware/valitatorMiddleware.js";
import {
  createProduct,
  getProduct,
  getProducts,
} from "../controllers/productController.js";
import upload from "../middleware/upload.js";
import {
  createProductValidator,
  getProductsValidator,
} from "../validations/product.validation.js";
import { idParamSchema } from "../utils/sharedSchemas.js";
const routerProduct = express.Router();
routerProduct.post(
  "/",
  upload.array("images", 5),
  validator(createProductValidator),
  createProduct,
);
routerProduct.get("/", validator(getProductsValidator, "query"), getProducts);
routerProduct.get("/:id", validator(idParamSchema, "params"), getProduct);
export default routerProduct;
