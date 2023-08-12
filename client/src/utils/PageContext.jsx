/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const PageContext = createContext();

export const PageProvider = ({ children }) => {
  const [popularMoviePage, setPopularMoviePage] = useState(1);
  const [ratedMoviePage, setRatedMoviePage] = useState(1);

  const [popularTvPage, setPopularTvPage] = useState(1);
  const [ratedTvPage, setRatedTvPage] = useState(1);

  const value = {
    popularMoviePage,
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
