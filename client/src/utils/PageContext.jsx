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
  const [cookies, removeCookie] = useCookies(["token"]);
  const [username, setUsername] = useState(null);
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        return console.log("no cookie");
      } else {
        console.log("cookie");
      }

      try {
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
      } catch (error) {
        console.log(error);
      }
    };
    verifyCookie();
  }, [cookies, username, removeCookie]);

  const logout = () => {
    try {
      const res = axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/user/logout`,
        {},
        { withCredentials: true }
      );
      setUsername(null);
      removeCookie("token");
      window.location.reload();
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    popularMoviePage,
    logout,
    username,
    setPopularMoviePage,
    ratedMoviePage,
    setRatedMoviePage,
    popularTvPage,
    setPopularTvPage,
    ratedTvPage,
    setRatedTvPage,
  };

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};
