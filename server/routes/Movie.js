import express from "express";
import {
  getAllMovies,
  getOneMovie,
  searchMovieAndShows,
  searchMovies,
} from "../controllers/Movie.js";

const router = express.Router();

router.get("/allmovies", getAllMovies);
router.get("/search", searchMovies);
router.get("/:movieId", getOneMovie);
router.get("/search/shows", searchMovieAndShows);

export default router;
