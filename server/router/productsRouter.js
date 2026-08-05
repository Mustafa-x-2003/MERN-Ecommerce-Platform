import express from "express";
import auth from "../middleware/auth.js";
import { createProduct, getProducts } from "../controllers/productController.js";
import upload from "../middleware/upload.js";
const routerProduct = express.Router();
routerProduct.post("/",  upload.array("images", 5), createProduct);
routerProduct.get("/", getProducts);
export default routerProduct;
