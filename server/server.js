import "dotenv/config";
import express from "express";
import concetDB from "./config/db.js";
import cors from "cors";
import routerUser from "./router/userRouter.js";
import routerAddress from "./router/addressRouter.js";
import routerProduct from "./router/productsRouter.js";
import cartRouter from "./router/cartRouter.js";
import categoryRouter from "./router/categoryRouter.js";
import wishlistRouter from "./router/wishlistRouter.js";
import orderRouter from "./router/orderRouter.js";
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use("/api/auth", routerUser);
app.use("/api/address", routerAddress);
app.use("/api/products", routerProduct);
app.use("/api/cart", cartRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/category", categoryRouter);
app.use("/api/orders", orderRouter);

app.get("/", async (req, res) => {
  res.send("API Working");
});

const startServer = async () => {
  try {
    await concetDB();

    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

startServer()
