import express from "express";
import { createCategory, getCategory } from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post("/", createCategory);
categoryRouter.get("/", getCategory);
export default categoryRouter;
