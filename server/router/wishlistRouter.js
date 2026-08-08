import express from "express";
import auth from "../middleware/auth.js";
import { addToWishlist, getWishlist } from "../controllers/wishlistController.js";

const wishlistRouter = express.Router();

wishlistRouter.post("/:id", auth, addToWishlist);
wishlistRouter.get("/", auth, getWishlist);

export default wishlistRouter;
