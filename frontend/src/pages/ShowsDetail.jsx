import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import ShowError from "./ShowError";

const ShowsDetail = () => {
  const { showId } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    const fetchShows = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/tvshow/${showId}`);
        const data = await res.json();
        if (res.status !== 200) {
          setError(data.error);
        } else {
          setShowDetails(data);
          setGenres(data.genres);
        }
      } catch (error) {
        setError("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchShows();
  }, [showId]);

  // If there was an error during the API request, show the error message
  if (error) {
    return <ShowError />;
  }

  if (loading && !showDetails) {
    return <Loader />;
  }

  if (!showDetails) {
    return <div>TV show not found.</div>;
  }
  const {
    title,
    overview,
    posterPath,
    number_of_episodes,
    episode_run_time,
    number_of_seasons,
    tagline,
    embedUrl,
  } = showDetails;
  return (
    <div className="flex w-screen h-[91vh] gap-48">
      <div className=" w-[30vw] flex flex-col pl-5 gap-2 mt-20">
        <img
          className=" object-contain w-40 h-40"
          src={posterPath}
          alt={title}
        />
        <h1 className=" text-4xl">{title}</h1>
        <p className="text-slate-500">{tagline}</p>
        <p>{overview}</p>
        <div className=" flex gap-2 ">
          Genre :
          {genres.map((genre, index) => {
            return <p key={index}>{genre}</p>;
          })}
        </div>
        {episode_run_time && <p>Episode Runtime : {episode_run_time}</p>}
        <p>Number of Seasons: {number_of_seasons}</p>
        <p>Number of Episodes: {number_of_episodes}</p>
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

export default ShowsDetail;
