import express from "express";
import { getAllMovies, getOneMovie } from "../controllers/Movie.js";
import { getAllShows } from "../controllers/Shows.js";

const router = express.Router();

router.get("/allmovies", getAllMovies);
router.get("/:movieId", getOneMovie);

export default router;
