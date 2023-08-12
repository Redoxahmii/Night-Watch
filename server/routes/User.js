import express from "express";
import { Signup, Login, Logout } from "../controllers/User.js";
import { userVerification } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/signup", Signup);
router.post("/", userVerification);
router.post("/login", Login);
router.post("/logout", Logout);

export default router;
