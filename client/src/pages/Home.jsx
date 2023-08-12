import { useEffect, useState } from "react";
import Card from "../components/Card";
const Home = ({ logout, username }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [Response, setResponse] = useState([]);

  useEffect(() => {
    const debounceSearch = debounce(async () => {
      const response = await fetch(
        "http://localhost:3000/api/movie/search?query=" + searchTerm
      ).then((response) => response.json());
      setResponse(response);
    }, 3000);

    debounceSearch();
  }, [searchTerm]);

  function debounce(func, delay) {
    let timerId;
    return function (...args) {
      clearTimeout(timerId);
      timerId = setTimeout(() => func.apply(this, args), delay);
    };
  }

  return (
    <>
      <div className="w-screen  h-screen flex items-center justify-center">
        <div className=" flex flex-col items-center justify-center gap-4">
          <div className="bg-gradient-to-r from-secondary/70 to-primary bg-clip-text h-[85px]">
            <h1 className="text-7xl tracking-tighter text-transparent">
              Welcome to Night Watch
            </h1>
          </div>
          <div className=" w-full max-w-3xl text-center pt-4 mb-2">
            <p className=" text-2xl tracking-tight font-serif">
              A free Frontend Client for watching Movies. Search for your
              favourite movies and watch them for free.
            </p>
          </div>
          <input
            type="text"
            placeholder="Search for movies"
            className="input input-bordered w-96 input-primary"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <p>{username}</p>

      <button onClick={() => logout()}>Logout</button>
      <div className="flex flex-wrap w-screen pl-10 gap-5">
        {Response.map((movie, index) => (
          <div key={index}>
            <Card Data={movie}></Card>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
