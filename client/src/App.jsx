import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import PopularMovies from "./pages/Movies/PopularMovies";
import MovieDetails from "./pages/Movies/MovieDetail";
import TopRatedMovies from "./pages/Movies/TopRatedMovies";
import PopularShows from "./pages/Shows/PopularShows";
import ShowsDetail from "./pages/Shows/ShowsDetail";
import TopRatedShows from "./pages/Shows/TopRatedShows";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
const App = () => {
  const [cookies, removeCookie] = useCookies(["token"]);
  const [username, setUsername] = useState(null);
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        return console.log("no cookie");
      }
      const { data } = await axios.post(
        "http://localhost:3000/api/user",
        {},
        { withCredentials: true }
      );
      const { status, username } = data;
      setUsername(username);
      return status ? console.log("status exists") : removeCookie("token");
    };
    verifyCookie();
  }, [cookies, username, removeCookie]);
  const Logout = () => {
    try {
      const res = axios.post(
        "http://localhost:3000/api/user/logout",
        {},
        { withCredentials: true }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home logout={Logout} username={username} />}
        />
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
