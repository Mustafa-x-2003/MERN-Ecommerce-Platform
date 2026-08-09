import express from "express";
import {createOrder} from "../controllers/orederController.js";
import auth from "../middleware/auth.js";
const orderRouter = express.Router();

orderRouter.post("/", auth, createOrder);

export default orderRouter;
