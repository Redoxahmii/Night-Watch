import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import PopularMovies from "./pages/PopularMovies";
import MovieDetails from "./pages/MovieDetail";
import TopRatedMovies from "./pages/TopRatedMovies";
import PopularShows from "./pages/PopularShows";
import ShowsDetail from "./pages/ShowsDetail";
import TopRatedShows from "./pages/TopRatedShows";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/popular" element={<PopularMovies />} />
        <Route path="/tvshows/:showId" element={<ShowsDetail />} />
        <Route path="/tvshows/popular" element={<PopularShows />} />
        <Route path="/tvshows/toprated" element={<TopRatedShows />} />
        <Route path="/movies/toprated" element={<TopRatedMovies />} />
        <Route path="/movies/:movieId" element={<MovieDetails />} />
      </Routes>
    </>
  );
};

export default App;
