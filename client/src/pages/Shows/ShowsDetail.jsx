import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import ShowError from "./ShowError";

const ShowsDetail = () => {
  const { showId, season, episode } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(season);
  const [selectedEpisode, setSelectedEpisode] = useState(episode);
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchShows = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/tvshow/${showId}/${selectedSeason}/${selectedEpisode}`
        );
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

  const updateSeasonAndEpisode = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/tvshow/${showId}/${selectedSeason}/${selectedEpisode}`
      );
      const data = await res.json();
      setShowDetails(data);
      navigate(`/tvshows/${showId}/${selectedSeason}/${selectedEpisode}`);
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    }
  };

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
    seasons,
  } = showDetails;
  console.log(seasons);
  return (
    <div className="flex w-screen h-screen gap-48">
      <div className=" w-[30vw] flex flex-col pl-5 gap-2 mt-20">
        <img
          className=" object-contain w-40 h-40"
          src={posterPath}
          alt={title}
        />
        <h1 className=" text-4xl">{title}</h1>
        <div className="flex gap-2">
          <label htmlFor="season">Season:</label>
          <input
            type="text"
            id="season"
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="episode">Episode:</label>
          <input
            type="text"
            id="episode"
            value={selectedEpisode}
            onChange={(e) => setSelectedEpisode(e.target.value)}
          />
        </div>

        <button onClick={updateSeasonAndEpisode}>
          Update Season and Episode
        </button>

        <div className=" bg-blue-500">
          Hello baby
          {seasons.map((season, index) => {
            return (
              <div key={index}>
                <p>{season.seasonName}</p>
              </div>
            );
          })}
        </div>

        <p className="text-slate-500">{tagline}</p>
        <p>{overview}</p>
        <div className=" flex gap-2">
          Genre :
          {genres.map((genre, index) => {
            return <p key={index}>{genre}</p>;
          })}
        </div>
        {episode_run_time && <p>Episode Runtime : {episode_run_time}</p>}
        <p>Number of Seasons: {number_of_seasons}</p>
        <p>Number of Episodes: {number_of_episodes}</p>
        <button></button>
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
