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
    const newUser = await User.create({ email, password, username });
    const token = createSecretToken(User._id);
    res.cookie("token", token, {
      httpOnly: false,
      withCredentials: true,
      sameSite: "None",
      secure: true,
    });
    res
      .status(200)
      .json({ message: "User created  successfully", success: true, newUser });
    next();
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
      httpOnly: false,
      withCredentials: true,
      sameSite: "None",
      secure: true,
    });
    res
      .status(200)
      .json({ message: "User Logged in successfully", success: true });
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
