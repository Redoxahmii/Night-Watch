import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-primary rounded-xl">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          MovieDatabase
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/movies/popular">Popular</Link>
          </li>
          <li>
            <Link>Top Rated</Link>
          </li>
          <li>
            <Link>Link</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
