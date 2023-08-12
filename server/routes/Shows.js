import express from "express";
import { getAllShows, getOneShow, testOneShow } from "../controllers/Shows.js";
const router = express.Router();

router.get("/allshows", getAllShows);
router.get("/:showId/:season/:episode", getOneShow);
router.get("/test/:showId", testOneShow);
export default router;
