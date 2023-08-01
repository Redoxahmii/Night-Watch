import { useState, useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/movie/allmovies`,
          {
            params: {
              page: page,
              category: "popular",
            },
          }
        );
        setMovies(response.data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    }

    fetchMovies();
  }, [page]);
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className=" w-screen items-center justify-center flex flex-col gap-10">
      <h1 className=" text-6xl mt-10 tracking-tighter">Popular Movies</h1>
      <div className="join">
        <button className="join-item btn text-2xl" onClick={handlePreviousPage}>
          «
        </button>
        <p className="join-item btn normal-case text-md">Page {page}</p>
        <button className="join-item btn text-2xl" onClick={handleNextPage}>
          »
        </button>
      </div>
      <div className="flex flex-wrap gap-16 pl-5 w-screen">
        {movies.map((movie, index) => (
          <div key={index}>
            <Card movie={movie}></Card>
          </div>
        ))}
      </div>
      <div className="join">
        <button className="join-item btn" onClick={handlePreviousPage}>
          «
        </button>
        <p className="join-item btn normal-case">Page {page}</p>
        <button className="join-item btn" onClick={handleNextPage}>
          »
        </button>
      </div>
    </div>
  );
};

export default PopularMovies;
