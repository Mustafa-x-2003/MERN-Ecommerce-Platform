import "dotenv/config";
import express from "express";
import concetDB from "./config/db.js";
import cors from "cors";
import routerUser from "./router/userRouter.js";
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
app.use("/api/auth", routerUser);

app.get("/", async (req, res) => {
  res.send("API Working");
});

app.listen(port, async () => {
  try {
    await concetDB();
    console.log(`server is running on port ${port}`);
  } catch (e) {
    console.log(e);
  }
});
