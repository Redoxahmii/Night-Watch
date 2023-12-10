/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import Card from "../components/Card";
import { Button, Input } from "@nextui-org/react";
import { Search } from "lucide-react";
import { PageContext } from "../utils/PageContext";
import CardSkeleton from "../components/CardSkeleton";

const Home = () => {
  const { homeResponse, setHomeResponse } = useContext(PageContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [Buttonloading, setButtonLoading] = useState(false);
  const [homeLoading, setHomeLoading] = useState(false);
  const [InputDisabled, setInputDisabled] = useState(false);
  const [searchInputError, setsearchInputError] = useState("");
  const [Error, setError] = useState("");
  const resultsRef = useRef(null);
  useEffect(() => {
    const handleSubmit = async () => {
      setHomeLoading(true);
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_SERVER_URL
          }/api/movie/search/shows?query=batman`,
        ).then((response) => response.json());
        if (response.error) {
          console.log(response.error);
        } else {
          setHomeResponse(response);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setHomeLoading(false);
      }
    };
    handleSubmit();
  }, [setHomeResponse]);

  const handleSubmit = async () => {
    setButtonLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/movie/search/shows?query=` +
          searchTerm,
      ).then((response) => response.json());
      if (response.error) {
        setInputDisabled(true); // Disable the input field.
        setsearchInputError(response.error); // Set a specific error message from the server.
      } else {
        setHomeResponse(response);
        setInputDisabled(false);
        setsearchInputError("");
        resultsRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
      setButtonLoading(false);
    } catch (error) {
      setButtonLoading(false);
      setError("An error occurred. Please try again later."); // Set a generic error message for network issues.
    }
  };

  return (
    <>
      <div className="w-screen h-[91vh] flex items-center justify-center">
        <div className=" flex  flex-col items-center justify-center gap-4 animate-fade animate-delay-700 animate-duration-500">
          <h1 className="lg:text-7xl text-4xl tracking-tighter text-secondary-700">
            Welcome to Night Watch
          </h1>
          <div className="w-full max-w-3xl text-center pt-4 mb-2">
            <p className="lg:text-2xl tracking-tight text-lg">
              A free Frontend Client for watching Movies. Search for your
              favourite movies and watch them for free!
            </p>
          </div>
          <Input
            type="text"
            variant="flat"
            isInvalid={InputDisabled}
            isRequired
            errorMessage={searchInputError}
            size="md"
            isClearable
            className="w-96"
            placeholder="Search for media..."
            onChange={(e) => setSearchTerm(e.target.value)}
            startContent={
              <Search
                className={InputDisabled ? "text-red-600" : " text-default-400"}
              />
            }
          />
          <Button
            isDisabled={Buttonloading}
            isLoading={Buttonloading}
            className="px-10"
            color="secondary"
            variant="shadow"
            onPress={handleSubmit}
          >
            {Buttonloading ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>
      <div
        ref={resultsRef}
        className=" flex flex-wrap gap-5 justify-center pb-10 items-center mx-20"
      >
        {Error && (
          <div className="w-full max-w-3xl text-center pt-4 mb-2">
            <p className="text-2xl tracking-tight text-danger">{Error}</p>
          </div>
        )}
        {homeResponse && (
          <h1 className="text-5xl font-semibold tracking-tighter mb-10">
            Movies
          </h1>
        )}
        <div className=" flex justify-center items-center flex-wrap gap-5">
          {homeLoading
            ? Array.from({ length: 20 }, (_, index) => (
                <CardSkeleton key={index} />
              ))
            : homeResponse.movies?.map((movie) => {
                return <Card key={movie.id} Data={movie} />;
              })}
        </div>
        {homeResponse && (
          <h1 className="text-5xl font-semibold tracking-tighter my-10">
            TV Shows
          </h1>
        )}
        <div className="flex justify-center items-center flex-wrap gap-5">
          {homeLoading
            ? Array.from({ length: 20 }, (_, index) => (
                <CardSkeleton key={index} />
              ))
            : homeResponse.tvShows?.map((movie) => {
                return <Card key={movie.id} Data={movie} />;
              })}
        </div>
      </div>
    </>
  );
};

export default Home;
