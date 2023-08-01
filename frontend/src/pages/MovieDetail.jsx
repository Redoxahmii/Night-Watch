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
    <div className="flex w-screen h-[91vh] gap-48">
      <div className=" w-[30vw] flex flex-col pl-5 gap-5 mt-20">
        <img
          className=" object-contain w-40 h-40"
          src={PosterPath}
          alt={title}
        />
        <h1 className=" text-4xl">{title}</h1>
        <p className="text-slate-500">{tagline}</p>
        <p>{overview}</p>
        <p>Status: {status}</p>
        <p>Release Date: {release_date}</p>
      </div>
      <div className=" w-[60vw] flex">
        <iframe
          src={embedUrl}
          allowFullScreen
          className=" w-full aspect-video"
        ></iframe>
      </div>
    </div>
  );
};

export default MovieDetails;
