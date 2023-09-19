import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { PageContext } from "../utils/PageContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { logout, username } = useContext(PageContext);
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
    navbarClasses.push("bg-base-300/70");
  } else {
    navbarClasses.push("bg-base-300");
  }

  return (
    <div className={navbarClasses.join(" ")}>
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Night Watch
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal justify-between items-center px-1">
          <li>
            <details>
              <summary>Movies</summary>
              <ul className="p-2 bg-base-100 w-32">
                <li>
                  <Link to="/movies/popular">Popular</Link>
                </li>
                <li>
                  <Link to="/movies/toprated">Top Rated</Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>Shows</summary>
              <ul className=" bg-base-100 p-2 w-32">
                <li>
                  <Link to="/tvshows/popular">Popular</Link>
                </li>
                <li>
                  <Link to="/tvshows/toprated">Top Rated</Link>
                </li>
              </ul>
            </details>
          </li>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="mask mask-squircle w-8 h-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              {username && <li>Welcome {username}</li>}
              <li>
                <button onClick={() => logout()}>Logout</button>
              </li>
            </ul>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
