/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

export const PageContext = createContext();

export const PageProvider = ({ children }) => {
  const [popularMoviePage, setPopularMoviePage] = useState(1);
  const [ratedMoviePage, setRatedMoviePage] = useState(1);
  const [popularTvPage, setPopularTvPage] = useState(1);
  const [ratedTvPage, setRatedTvPage] = useState(1);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]); // Add setCookie
  const [username, setUsername] = useState(null);
  const [homeResponse, setHomeResponse] = useState([]);

  useEffect(() => {
    const verifyCookie = async () => {
      try {
        if (cookies.token) {
          const { data } = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/api/user`,
            {},
            { withCredentials: true }
          );
          const { status, username } = data;
          if (status) {
            setUsername(username);
          } else {
            removeCookie("token");
          }
        }
      } catch (error) {
        console.log(error);
        // Handle the error, e.g., show an error message to the user
      }
    };

    verifyCookie();
  }, [cookies, username, removeCookie]);

  const logout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/user/logout`,
        {},
        { withCredentials: true }
      );
      if (cookies.token) {
        removeCookie("token");
      }
      setUsername(null);
      // Redirect or show a message to the user after successful logout
    } catch (error) {
      console.log(error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  const value = {
    popularMoviePage,
    logout,
    homeResponse,
    setHomeResponse,
    username,
    setPopularMoviePage,
    ratedMoviePage,
    setRatedMoviePage,
    popularTvPage,
    setPopularTvPage,
    setCookie,
    ratedTvPage,
    setRatedTvPage,
  };

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};
