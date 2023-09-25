import { useState, useEffect, useContext } from "react";
import Card from "../../components/Card";
import axios from "axios";
import { PageContext } from "../../utils/PageContext";
import { Pagination } from "@nextui-org/react";
import CardSkeleton from "../../components/CardSkeleton";
const TopRatedMovies = () => {
  const { ratedMoviePage, setRatedMoviePage } = useContext(PageContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/movie/allmovies`,
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

  return (
    <div className=" w-screen items-center pt-28 justify-center flex flex-col gap-10">
      <h1 className=" text-6xl tracking-tighter">Top Rated Movies</h1>
      <Pagination
        total={500}
        showShadow
        // isCompact
        variant="bordered"
        showControls
        color="secondary"
        page={ratedMoviePage}
        onChange={setRatedMoviePage}
      />
      {loading ? (
        <div className="flex flex-wrap gap-5 justify-center items-center mx-10">
          {Array.from({ length: 20 }).map((_, index) => (
            <CardSkeleton key={index}></CardSkeleton>
          ))}
        </div>
      ) : error ? (
        <div className="w-full max-w-3xl text-center pt-4 mb-2">
          <p className="text-2xl tracking-tight text-danger">{error}</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-5 justify-center items-center mx-10">
          {movies.map((movie, index) => (
            <Card key={index} Data={movie}></Card>
          ))}
        </div>
      )}
      <Pagination
        total={500}
        showShadow
        // isCompact
        variant="bordered"
        showControls
        color="secondary"
        page={ratedMoviePage}
        onChange={setRatedMoviePage}
        className="mb-10"
      />
    </div>
  );
};

export default TopRatedMovies;
