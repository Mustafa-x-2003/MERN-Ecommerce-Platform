import express from "express";
import auth from "../middleware/auth.js";
import getOverview from "../controllers/overveiwController.js";
const overviewStatsRouter = express.Router();
overviewStatsRouter.get("/overview", auth, getOverview);
export default overviewStatsRouter;
