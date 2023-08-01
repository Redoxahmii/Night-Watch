import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <Link to="/movies">Navigate to Popular Movies</Link>
    </div>
  );
};

export default Home;
