import express from "express";
import auth from "../middleware/auth.js";
import { addToWishlist, deleteFromWishlist, getWishlist } from "../controllers/wishlistController.js";

const wishlistRouter = express.Router();

wishlistRouter.post("/:id", auth, addToWishlist);
wishlistRouter.get("/", auth, getWishlist);
wishlistRouter.delete("/:id", auth, deleteFromWishlist);

export default wishlistRouter;
