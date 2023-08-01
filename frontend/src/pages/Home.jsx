import { useEffect, useState } from "react";
import Card from "../components/Card";
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
    <>
      <div className="w-screen mt-56 flex items-center justify-center">
        <div className=" flex flex-col items-center justify-center gap-4">
          <h1 className="text-7xl tracking-tighter ">
            Welcome to Movie Database
          </h1>
          <div className=" w-full   max-w-3xl text-center">
            <p className=" text-2xl tracking-tight font-serif">
              A free Frontend Client for watching Movies. Search for your
              favourite movies and watch them for free.
            </p>
          </div>
          <input
            type="text"
            className="input input-primary"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap w-screen pl-10  gap-5 mt-20">
        {Response.map((movie, index) => (
          <div key={index}>
            <Card movie={movie}></Card>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
