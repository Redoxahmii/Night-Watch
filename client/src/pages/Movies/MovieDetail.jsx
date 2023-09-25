import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import { useParams } from "react-router-dom";
import MovieError from "./MovieError";
import { Image } from "@nextui-org/react";
import { Rocket, Star } from "lucide-react";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/movie/${movieId}`
        );
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
    vote_average,
    tagline,
    embedUrl,
  } = movieDetails;

  return (
    <div className="flex flex-col lg:flex-row h-screen lg:mx-10 justify-between items-center">
      <div className="flex flex-col lg:mt-8 mt-10 w-full lg:max-w-lg max-w-md">
        <Image
          width={130}
          height={130}
          className="hidden lg:block"
          src={posterPath}
          alt={title}
        />
        <h1 className="text-3xl tracking-tighter pt-2 lg:mx-4">{title}</h1>
        <p className="text-white/80 text-sm pt-2 lg:mx-4">{tagline}</p>
        <p className="text-sm pt-3 lg:mx-4 lg:max-h-36 overflow-hidden text-ellipsis">
          {overview}
        </p>
        <div className="flex items-center gap-2 pt-2 lg:mx-4">
          <Star
            size={20}
            fill="currentColor"
            className="text-yellow-400"
          ></Star>
          <p className="text-white/70 text-sm">{vote_average}</p>
        </div>
        <div className="flex items-center gap-2 pt-1 lg:mb-0 mb-5 lg:mx-4">
          <Rocket size={20} className="text-red-400"></Rocket>
          <p className="text-white/70 text-sm">{release_date}</p>
        </div>
      </div>
      <div className="lg:flex w-full max-w-3xl aspect-video">
        <iframe
          src={embedUrl}
          className="block w-full rounded-3xl"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default MovieDetails;
