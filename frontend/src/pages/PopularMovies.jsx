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
    <div className=" w-screen items-center justify-center flex flex-col">
      <h1 className=" text-7xl mt-10">Popular Movies</h1>
      <div className=" flex gap-5 font-bold text-2xl my-10">
        <button onClick={handleNextPage}>Next Page</button>
        <button onClick={handlePreviousPage}>Previous Page</button>
      </div>
      <div className="flex flex-wrap gap-16 pl-5 w-screen">
        {movies.map((movie, index) => (
          <div key={index}>
            <Card movie={movie}></Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularMovies;
