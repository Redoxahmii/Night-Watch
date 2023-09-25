import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PopularMovies from "./pages/Movies/PopularMovies";
import MovieDetails from "./pages/Movies/MovieDetail";
import TopRatedMovies from "./pages/Movies/TopRatedMovies";
import PopularShows from "./pages/Shows/PopularShows";
import ShowsDetail from "./pages/Shows/ShowsDetail";
import TopRatedShows from "./pages/Shows/TopRatedShows";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Nav from "./components/Navbar";
const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/movies/popular" element={<PopularMovies />} />
        <Route
          path="/tvshows/:showId/:season/:episode"
          element={<ShowsDetail />}
        />
        <Route path="/tvshows/popular" element={<PopularShows />} />
        <Route path="/tvshows/toprated" element={<TopRatedShows />} />
        <Route path="/movies/toprated" element={<TopRatedMovies />} />
        <Route path="/movies/:movieId" element={<MovieDetails />} />
      </Routes>
    </>
  );
};

export default App;
