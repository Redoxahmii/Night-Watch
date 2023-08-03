import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-primary-content rounded-xl">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Night Watch
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/movies/popular">Popular Movies</Link>
          </li>
          <li>
            <Link to="/movies/toprated">Top Rated Movies</Link>
          </li>
          <li>
            <Link to="/tvshows/popular">Popular Shows</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
