import express from "express";
import auth from "../middleware/auth.js";
import { addToCart } from "../controllers/cartController.js";

const cartRouter = express.Router();
cartRouter.post("/:id",auth, addToCart);
export default cartRouter