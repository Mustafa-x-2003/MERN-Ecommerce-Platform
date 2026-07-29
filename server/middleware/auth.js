import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      throw new Error("Authentication required");
    }
    const token = authHeader.replace("Bearer ", "");
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded, "=====decoded====");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error("Authentication failed");
    }
    req.user = user;
    req.token = token;

    next();
  } catch (e) {
    res.status(401).json({
      message: "Authentication failed",
      error: e.message,
    });
  }
};
export default auth;
