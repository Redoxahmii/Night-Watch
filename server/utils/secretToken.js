import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "70d",
  });
};
