// MovieList.js

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/movie/allmovies?page=${page}`
        );
        setMovies(response.data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    }

    fetchMovies();
  }, [page]);
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      <h1>Popular Movies</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            {/* Use Link component to navigate to MovieDetails */}
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
        <button onClick={handleNextPage}>Next Page</button>
        <button onClick={handlePreviousPage}>Previous Page</button>
      </ul>
    </div>
  );
};

export default MoviesList;
