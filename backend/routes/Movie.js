import express from "express";
import {
  getAllMovies,
  getOneMovie,
  searchMovies,
} from "../controllers/Movie.js";

const router = express.Router();

router.get("/allmovies", getAllMovies);
router.get("/search", searchMovies);
router.get("/:movieId", getOneMovie);

export default router;
