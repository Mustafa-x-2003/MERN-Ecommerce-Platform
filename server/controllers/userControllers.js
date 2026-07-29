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
    res.status(200).json({
      user,
    });
  } catch (e) {
    res.status(400).json({
      message: "tttttttt",
      error: e.message,
    });
  }
};
