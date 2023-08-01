import express from "express";
import { getAllShows, getOneShow } from "../controllers/Shows.js";
const router = express.Router();

router.get("/allshows", getAllShows);
router.get("/:showId", getOneShow);
export default router;
