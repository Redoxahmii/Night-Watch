import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
  return (
    <div>
      <h1>Showdetails</h1>
      {
        <div key={showDetails?.id}>
          <p> Name :{showDetails?.name}</p>
          <p>Overview :{showDetails?.overview}</p>
          <p>vote_average :{showDetails?.vote_average}</p>
          <p>Number of episodes : {showDetails?.number_of_episodes}</p>
          <p>episode run time : {showDetails?.episode_run_time}</p>
          <p>Number of seasons : {showDetails?.number_of_seasons}</p>
          <p>status: {showDetails?.status}</p>
          {genres.map((genre, index) => {
            return (
              <div key={index}>
                <p>Genre: {genre}</p>
              </div>
            );
          })}
          <p>tagline : {showDetails?.tagline}</p>
          {/* <img src={showDetails?.posterPath} alt={showDetails?.name} /> */}
        </div>
      }
    </div>
  );
};

export default ShowsDetail;
