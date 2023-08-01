import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import PopularMovies from "./pages/PopularMovies";
import MovieDetails from "./pages/MovieDetail";
import TopRatedMovies from "./pages/TopRatedMovies";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/popular" element={<PopularMovies />} />
        <Route path="/movies/toprated" element={<TopRatedMovies />} />
        <Route path="/movies/:movieId" element={<MovieDetails />} />
      </Routes>
    </>
  );
};

export default App;
