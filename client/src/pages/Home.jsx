/* eslint-disable react/prop-types */
import { useState } from "react";
import Card from "../components/Card";
const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [Response, setResponse] = useState([]);
  const [Error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/movie/search?query=` +
          searchTerm
      ).then((response) => response.json());
      if (response.error) {
        setError(response.error); // Set a specific error message from the server.
      } else {
        setResponse(response);
      }
    } catch (error) {
      setError("An error occurred. Please try again later."); // Set a generic error message for network issues.
    }
  };

  return (
    <>
      <div className="w-screen h-[80vh] flex items-center justify-center">
        <div className=" flex flex-col items-center justify-center gap-4">
          {/* <div className="bg-gradient-to-r from-secondary to-primary bg-clip-text h-[85px]"> */}
          <h1 className="text-7xl tracking-tighter text-base-content">
            Welcome to Night Watch
          </h1>
          {/* </div> */}
          <div className="w-full max-w-3xl text-center pt-4 mb-2">
            <p className="text-2xl tracking-tight">
              A free Frontend Client for watching Movies. Search for your
              favourite movies and watch them for free!
            </p>
          </div>
          <input
            type="text"
            placeholder="Search for movies"
            className="input input-bordered w-96 input-primary"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className=" btn btn-primary btn-wide rounded-xl normal-case"
            onClick={handleSubmit}
          >
            Search
          </button>
        </div>
      </div>
      {Error ? (
        <p className=" alert alert-error">{Error}</p>
      ) : (
        <div className="flex flex-wrap pl-20 gap-5">
          {Response.map((movie, index) => (
            <Card key={index} Data={movie}></Card>
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
