import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [Response, setResponse] = useState([]);
  useEffect(() => {
    const searchMovies = async () => {
      const response = await fetch(
        "http://localhost:3000/api/movie/search?query=" + searchTerm
      ).then((response) => response.json());
      setResponse(response);
    };
    searchMovies();
  }, [searchTerm]);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <input type="text" onChange={(e) => setSearchTerm(e.target.value)} />
      {Response.map((movie, index) => (
        <div key={index}>
          <h1>{movie.title}</h1>
          <Link to={movie.navigateLink}>Navigate</Link>
          <img src={movie.posterPath} alt={movie.title} />
        </div>
      ))}
      <Link to="/movies">Navigate to Popular Movies</Link>
    </div>
  );
};

export default Home;
