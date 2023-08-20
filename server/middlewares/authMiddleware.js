import User from "../models/User.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const userVerification = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false, message: "No token provided" });
  }
  jwt.verify(token, process.env.SECRET_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false, message: "Token verification failed" });
    } else {
      const user = await User.findById(data.id);
      if (user) {
        return res.json({ status: true, username: user.username });
      } else {
        return res.json({ status: false, message: "User not found" });
      }
    }
  });
};
