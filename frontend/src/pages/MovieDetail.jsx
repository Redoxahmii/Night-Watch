// MovieDetails.js

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/movie/${movieId}`
        ); // Replace this with the actual API endpoint to get a specific movie
        setMovieDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    }

    fetchMovieDetails();
  }, [movieId]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  const {
    title,
    overview,
    PosterPath,
    release_date,
    status,
    tagline,
    embedUrl,
  } = movieDetails;

  return (
    <div>
      <h1>{title}</h1>
      <p>{tagline}</p>
      <p>{overview}</p>
      <p>Status: {status}</p>
      <p>Release Date: {release_date}</p>
      <img src={PosterPath} alt={title} />
      <iframe src={embedUrl} title="Movie Trailer" allowFullScreen />
    </div>
  );
};

export default MovieDetails;
