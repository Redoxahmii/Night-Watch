import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createSecretToken } from "../utils/secretToken.js";

export const Signup = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    try {
      const newUser = await User.create({ email, password, username });
      const token = createSecretToken(User._id);
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });
      res
        .status(200)
        .json({ message: "User created successfully", success: true, newUser });
      next();
    } catch (error) {
      // Handle duplicate key error for username
      if (error.code === 11000 && error.keyPattern.username === 1) {
        return res.status(400).json({ message: "Username is already taken" });
      }
      throw error; // Rethrow other errors
    }
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword) {
      return res.status(400).json({ message: "Password is incorrect" });
    }
    const token = createSecretToken(checkUser._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
      sameSite: "None", // "strict
      secure: true,
    });
    res.status(200).json({
      message: "User Logged in successfully",
      success: true,
      cookie: req.cookies,
    });
    next();
  } catch (error) {
    console.log(error);
  }
};

export const Logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res
      .status(200)
      .json({ message: "User Logged out successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

export const watchList = async (req, res) => {
  try {
    const { movieId, userId } = req.body;
    const user = await User.findById(userId);

    if (user.watchList.includes(movieId)) {
      return res.status(400).json({ message: "Movie already added" });
    }

    // Ensure uniqueness by only adding the movieId if it's not already in the watchList.
    user.watchList = [...new Set([...user.watchList, movieId])];
    await user.save();

    res
      .status(200)
      .json({ message: "Movie added successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};
