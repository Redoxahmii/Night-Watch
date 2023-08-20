import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import ShowError from "./ShowError";

const ShowsDetail = () => {
  const { showId, season, episode } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buttonReload, setButtonReload] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(season);
  const [selectedEpisode, setSelectedEpisode] = useState(episode);
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);

  useEffect(() => {
    const fetchShows = async () => {
      setLoading(true);
      setButtonReload(true);
      try {
        const res = await fetch(
          `http://127.0.0.1:3000/api/tvshow/${showId}/${selectedSeason}/${selectedEpisode}`
        );
        const data = await res.json();
        if (res.status !== 200) {
          setError(data.error);
        } else {
          setShowDetails(data);
          setGenres(data.genres);
          setButtonReload(false);
        }
      } catch (error) {
        setError("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchShows();
  }, [selectedEpisode, selectedSeason, showId, selectedSeasonIndex]);

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

  return (
    <>
      <div className="flex w-screen h-screen">
        <div className="w-[40vw] flex flex-col pl-5 gap-2 mt-20 mr-20">
          <img
            className="object-contain w-40 h-40"
            src={posterPath}
            alt={title}
          />
          <h1 className="text-4xl">{title}</h1>
          <p className="text-slate-500">{tagline}</p>
          <p>{overview}</p>
          <div className="flex gap-2">
            Genre :
            {genres.map((genre, index) => (
              <p key={index}>{genre}</p>
            ))}
          </div>
          {episode_run_time && <p>Episode Runtime : {episode_run_time}</p>}
          <p>Number of Seasons: {number_of_seasons}</p>
          <p>Number of Episodes: {number_of_episodes}</p>
        </div>
        <div className="w-[70vw] flex">
          {loading && (
            <div className="w-full aspect-video flex items-center justify-center">
              <Loader />
            </div>
          )}
          {!loading && (
            <iframe
              src={embedUrl}
              allowFullScreen
              className="w-full aspect-video"
            ></iframe>
          )}
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="dropdown dropdown-top">
          <button
            tabIndex={0}
            disabled={buttonReload}
            className="btn btn-neutral m-1 normal-case"
          >
            {seasons[selectedSeasonIndex].seasonName}
          </button>
          <ul className="dropdown-content z-[1] flex gap-2  shadow bg-base-300 menu menu-horizontal w-[500px] ">
            {seasons.map((season, seasonIndex) => (
              <li key={seasonIndex}>
                <button
                  disabled={buttonReload}
                  onClick={() => setSelectedSeasonIndex(seasonIndex)}
                >
                  {season.seasonName}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap">
          {seasons[selectedSeasonIndex].episodeCount.map(
            (episode, episodeIndex) => (
              <div key={episodeIndex} className="p-2">
                <button
                  disabled={buttonReload}
                  onClick={() => {
                    setSelectedSeason(
                      seasons[selectedSeasonIndex].seasonNumber
                    );
                    setSelectedEpisode(episode);
                    navigate(
                      `/tvshows/${showId}/${seasons[selectedSeasonIndex].seasonNumber}/${episode}`
                    );
                  }}
                >
                  Episode {episodeIndex + 1}
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default ShowsDetail;
