import e, { json } from "express";
import User from "../models/userModel.js";

export const register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (e) {
    res.status(400).json({
      message: "Registration failed",
      error: e.message,
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateToken();
    res.status(200).json({
      user,
      token,
    });
  } catch (e) {
    res.status(400).json({
      message: "Unable to login",
      error: e.message,
    });
  }
};
export const getProfile = (req, res) => {
  const user = req.user;
  res.status(200).json(user);
};
export const updateUser = async (req, res) => {
  try {
    const user = req.user;
    const allowedUpdate = ["name", "email", "phone"];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((field) => {
      return allowedUpdate.includes(field);
    });
    if (!isValidOperation) {
      return res.status(400).json({
        message: "Invalid update fields",
      });
    }
    updates.forEach((field) => {
      user[field] = req.body[field];
    });
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const user = req.user;
    await user.deleteOne();
    res.status(200).json({
      message: "Account deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete account",
      error: error.message,
    });
  }
};
export const logout = async (req, res) => {
  try {
    const user = req.user;
    const token = req.token;
    user.tokens = user.tokens.filter((t) => t.token !== token);
    await user.save();
    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to logout",
    });
  }
};
