import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import MoviesList from "./pages/MoviesList";
import MovieDetails from "./pages/MovieDetail";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/movies" element={<MoviesList />}></Route>
        <Route path="/movies/:movieId" element={<MovieDetails />}></Route>
      </Routes>
    </>
  );
};

export default App;
