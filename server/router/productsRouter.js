import express from "express";
import auth from "../middleware/auth.js";
import validator from "../middleware/valitatorMiddleware.js";
import {
  createProduct,
  getProduct,
  getProducts,
} from "../controllers/productController.js";
import upload from "../middleware/upload.js";
import { createProductValidator } from "../validations/product.validation.js";
const routerProduct = express.Router();
routerProduct.post("/", upload.array("images", 5),validator(createProductValidator), createProduct);
routerProduct.get("/", getProducts);
routerProduct.get("/:id", getProduct);
export default routerProduct;
