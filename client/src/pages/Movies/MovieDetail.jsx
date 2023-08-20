import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import { useParams } from "react-router-dom";
import MovieError from "./MovieError";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const res = await fetch(`http://127.0.0.1:3000/api/movie/${movieId}`);
        const data = await res.json();
        if (res.status !== 200) {
          setError(data.error);
        } else {
          setMovieDetails(data);
        }
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovieDetails();
  }, [movieId]);

  if (error) {
    return <MovieError />;
  }

  if (loading && !movieDetails) {
    return <Loader />;
  }

  if (!movieDetails) {
    return <div>TV show not found.</div>;
  }

  const {
    title,
    overview,
    posterPath,
    release_date,
    status,
    tagline,
    embedUrl,
  } = movieDetails;

  return (
    <div className="flex w-screen h-screen gap-48">
      <div className=" w-[20vw] flex flex-col pl-5 gap-5 mt-20">
        <img
          className=" object-contain w-40 h-40"
          src={posterPath}
          alt={title}
        />
        <h1 className=" text-4xl">{title}</h1>
        <p className="text-slate-500">{tagline}</p>
        <p>{overview}</p>
        <p>Status: {status}</p>
        <p>Release Date: {release_date}</p>
      </div>
      <div className="w-[70vw] flex">
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
