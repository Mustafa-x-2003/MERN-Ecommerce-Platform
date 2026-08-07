import express from "express";
import auth from "../middleware/auth.js";
import { addToCart, getCart ,updateCartQuantity} from "../controllers/cartController.js";

const cartRouter = express.Router();
cartRouter.post("/:id",auth, addToCart);
cartRouter.get("/",auth, getCart);
cartRouter.patch("/quantity",auth, updateCartQuantity);
export default cartRouter