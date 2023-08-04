import { useState, useEffect, useContext } from "react";
import Card from "../components/Card";
import axios from "axios";
import Loader from "../components/Loader";
import { PageContext } from "../utils/PageContext";
const TopRatedMovies = () => {
  const { ratedMoviePage, setRatedMoviePage } = useContext(PageContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/movie/allmovies`,
          {
            params: {
              page: ratedMoviePage,
              category: "top_rated",
            },
          }
        );
        setMovies(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response.data.error);
        setLoading(false);
      }
    }

    fetchMovies();
  }, [ratedMoviePage]);
  const handleNextPage = () => {
    setRatedMoviePage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (ratedMoviePage > 1) {
      setRatedMoviePage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className=" w-screen items-center justify-center flex flex-col gap-10">
      <h1 className=" text-6xl mt-10 tracking-tighter">Top Rated Movies</h1>
      <div className="join">
        <button className="join-item btn text-2xl" onClick={handlePreviousPage}>
          «
        </button>
        <p className="join-item btn normal-case text-md">
          Page {ratedMoviePage}
        </p>
        <button className="join-item btn text-2xl" onClick={handleNextPage}>
          »
        </button>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      ) : (
        <div className="flex flex-wrap gap-16 pl-5 w-screen">
          {movies.map((movie, index) => (
            <div key={index}>
              <Card Data={movie}></Card>
            </div>
          ))}
        </div>
      )}
      <div className="join">
        <button className="join-item btn" onClick={handlePreviousPage}>
          «
        </button>
        <p className="join-item btn normal-case">Page {ratedMoviePage}</p>
        <button className="join-item btn" onClick={handleNextPage}>
          »
        </button>
      </div>
    </div>
  );
};

export default TopRatedMovies;
