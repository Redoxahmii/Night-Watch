import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  let navbarClasses = ["navbar", "fixed", "top-0", "z-10", "rounded-xl"];
  if (scrolled) {
    navbarClasses.push("bg-primary-content/70");
  } else {
    navbarClasses.push("bg-primary-content");
  }

  return (
    <div className={navbarClasses.join(" ")}>
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Night Watch
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary>User</summary>
              <ul className="p-2 bg-base-100">
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>Movies and Shows</summary>
              <ul className="p-2 bg-base-100">
                <li>
                  <Link to="/movies/popular">Popular Movies</Link>
                </li>
                <li>
                  <Link to="/movies/toprated">Top Rated Movies</Link>
                </li>
                <li>
                  <Link to="/tvshows/popular">Popular Shows</Link>
                </li>
                <li>
                  <Link to="/tvshows/toprated">Top Rated Shows</Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
