import express from "express";
import { getAllShows, getOneShow, getOneShow2 } from "../controllers/Shows.js";
const router = express.Router();

router.get("/allshows", getAllShows);
router.get("/:showId", getOneShow);
router.get("/check/:showId", getOneShow2);
export default router;
