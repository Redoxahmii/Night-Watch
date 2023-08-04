import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

const ShowsDetail = () => {
  const { showId } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    const fetchShows = async () => {
      const res = await fetch(`http://localhost:3000/api/tvshow/${showId}`);
      const data = await res.json();
      setShowDetails(data);
      setGenres(data.genres);
    };
    fetchShows();
  }, [showId]);
  if (!showDetails) {
    return <Loader />;
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
