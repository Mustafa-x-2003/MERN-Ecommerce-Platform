import "dotenv/config";
import express from "express";
import cors from "cors";

import routerUser from "./router/userRouter.js";
import routerAddress from "./router/addressRouter.js";
import routerProduct from "./router/productsRouter.js";
import cartRouter from "./router/cartRouter.js";
import categoryRouter from "./router/categoryRouter.js";
import wishlistRouter from "./router/wishlistRouter.js";
import orderRouter from "./router/orderRouter.js";
import overviewStatsRouter from "./router/adminOverviewStats.js";

import ApiError from "./utils/errorClass.js";
import globalError from "./middleware/globalError.js";
import connectDB from "./config/db.js";
import subCategoryRouter from "./router/subcategoryRouter.js";

const app = express();
const port = process.env.PORT || 5000;

// Middleware الأساسية
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("API Working");
});

app.use("/api/auth", routerUser);
app.use("/api/address", routerAddress);
app.use("/api/products", routerProduct);
app.use("/api/cart", cartRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/category", categoryRouter);
app.use("/api/subCategory", subCategoryRouter);
app.use("/api/orders", orderRouter);
app.use("/api/admin", overviewStatsRouter);

// 404 Handler
app.all(/(.*)/, (req, res, next) => {
  next(new ApiError(`Can't find (${req.originalUrl}) on this server`, 404));
});

// Global Error Handling Middleware
app.use(globalError);

// الاتصال بقاعدة البيانات ثم تشغيل السيرفر
await connectDB();

const server = app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

process.on("unhandledRejection", (error) => {
  console.error(`UnhandledRejection Errors: ${error.name} | ${error.message}`);
  if (server) {
    server.close(() => {
      console.error("Shutting down...");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
