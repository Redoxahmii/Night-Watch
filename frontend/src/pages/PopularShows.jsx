import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const PopularShows = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      const res = await fetch("http://localhost:3000/api/tvshow/allshows");
      const data = await res.json();
      setShows(data);
    };
    fetchShows();
  }, []);
  console.log(shows);

  return (
    <div>
      <h1>popular</h1>
      {shows.map((show) => {
        return (
          <div key={show.id}>
            <p>{show.name}</p>
            <img src={show.posterPath} alt={show.name} />
            <Link to={show.navigateLink}>Navigate</Link>
          </div>
        );
      })}
    </div>
  );
};

export default PopularShows;
