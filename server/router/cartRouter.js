import express from "express";
import auth from "../middleware/auth.js";
import { addToCart, getCart } from "../controllers/cartController.js";

const cartRouter = express.Router();
cartRouter.post("/:id",auth, addToCart);
cartRouter.get("/",auth, getCart);
export default cartRouter