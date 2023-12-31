import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import ShowError from "./ShowError";
import { Button, ButtonGroup, Image } from "@nextui-org/react";
// import axios from "axios";
import { PageContext } from "../../utils/PageContext";
import { Clapperboard, Dna, Popcorn } from "lucide-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  DropdownMenu,
} from "@nextui-org/react";

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
  const { userData } = useContext(PageContext);
  useEffect(() => {
    const fetchShows = async () => {
      setLoading(true);
      setButtonReload(true);
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_SERVER_URL
          }/api/tvshow/${showId}/${selectedSeason}/${selectedEpisode}`,
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
    // const StoreMovieList = async () => {
    //   try {
    //     if (userData.status) {
    //       await axios.post(
    //         `${import.meta.env.VITE_SERVER_URL}/api/user/watchList`,
    //         {
    //           movieId: showId,
    //           userId: userData.id,
    //         }
    //       );
    //     } else {
    //       return;
    //     }
    //   } catch (error) {
    //     return;
    //   }
    // };
    // StoreMovieList();
    fetchShows();
  }, [selectedEpisode, selectedSeason, showId, selectedSeasonIndex, userData]);

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
    number_of_seasons,
    tagline,
    embedUrl,
    seasons,
  } = showDetails;

  return (
    <div className="flex flex-col mx-20 h-screen">
      <div className="flex flex-col lg:flex-row justify-between items-center mt-32 mb-7">
        <div className="flex flex-col lg:mt-8 mt-10 w-full lg:max-w-lg max-w-md">
          <Image
            width={130}
            height={130}
            className="hidden lg:block"
            src={posterPath}
            alt={title}
          />
          <h1 className="text-3xl tracking-tighter pt-2">{title}</h1>
          <p className="text-white/80 text-sm pt-2 ">{tagline}</p>
          <p className="text-sm pt-3  lg:max-h-36 overflow-hidden text-ellipsis">
            {overview}
          </p>
          <div className="flex items-center text-white/70 text-sm mt-1 mb-1 gap-1">
            <Dna size={20} className="text-red-400" />
            Genre:
            {genres.map((genre, index) => (
              <p key={index} className="text-red-400">
                {genre}
              </p>
            ))}
          </div>
          <div className="flex text-white/70 items-center gap-2">
            <Clapperboard size={20} className="text-purple-400" />
            <p className="text-sm">
              Number of Seasons:{" "}
              <span className="text-purple-400">{number_of_seasons}</span>
            </p>
          </div>
          <div className="flex items-center text-white/70 gap-2 mt-1">
            <Popcorn size={20} className="text-yellow-400" />
            <p className="text-sm">
              Number of Episodes:{" "}
              <span className="text-yellow-400">{number_of_episodes}</span>
            </p>
          </div>
        </div>
        <div className="lg:flex w-full max-w-3xl aspect-video">
          {loading && (
            <div className="w-full aspect-video flex items-center justify-center">
              <Loader />
            </div>
          )}
          {!loading && (
            <iframe
              src={embedUrl}
              allowFullScreen
              className="block w-full rounded-3xl"
            ></iframe>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center mb-5">
        <Dropdown backdrop="blur" placement="top">
          <DropdownTrigger>
            <Button
              radius="sm"
              size="lg"
              color="danger"
              variant="flat"
              disabled={buttonReload}
            >
              {seasons[selectedSeasonIndex].seasonName}
            </Button>
          </DropdownTrigger>
          <DropdownMenu color="danger" variant="flat">
            {seasons.map((season, seasonIndex) => (
              <DropdownItem
                key={seasonIndex}
                onPress={() => setSelectedSeasonIndex(seasonIndex)}
              >
                {season.seasonName}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
      <ButtonGroup color="primary" variant="flat" className="flex flex-wrap">
        {seasons[selectedSeasonIndex].episodeCount.map(
          (episode, episodeIndex) => (
            <Button
              key={episodeIndex}
              onPress={() => {
                setSelectedSeason(seasons[selectedSeasonIndex].seasonNumber);
                setSelectedEpisode(episode);
                navigate(
                  `/tvshows/${showId}/${seasons[selectedSeasonIndex].seasonNumber}/${episode}`,
                );
              }}
            >
              Episode {episodeIndex + 1}
            </Button>
          ),
        )}
      </ButtonGroup>
    </div>
  );
};

export default ShowsDetail;
