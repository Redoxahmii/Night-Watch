import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card";
import { PageContext } from "../../utils/PageContext";
import { Pagination } from "@nextui-org/react";
import CardSkeleton from "../../components/CardSkeleton";
const PopularShows = () => {
  const { popularTvPage, setPopularTvPage } = useContext(PageContext);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/tvshow/allshows`,
          {
            params: {
              category: "popular",
              page: popularTvPage,
            },
          }
        );
        setShows(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.response.data.error);
      }
    };
    fetchShows();
  }, [popularTvPage]);

  return (
    <div className="w-screen items-center pt-28 justify-center flex flex-col gap-10">
      <h1 className=" text-6xl tracking-tighter">Popular TV Shows</h1>
      <Pagination
        total={500}
        showShadow
        // isCompact
        variant="bordered"
        showControls
        color="secondary"
        page={popularTvPage}
        onChange={setPopularTvPage}
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
          {shows.map((movie, index) => (
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
        page={popularTvPage}
        onChange={setPopularTvPage}
        className="mb-10"
      />
    </div>
  );
};

export default PopularShows;
