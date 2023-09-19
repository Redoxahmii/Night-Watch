/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Card = ({ Data }) => {
  const { title, navigateLink, posterPath, overview, vote_average } = Data;

  return (
    <div className="relative w-full max-w-md bg-primary-content rounded-xl shadow-xl">
      <Link to={navigateLink}>
        <div className="group">
          <div
            className="bg-cover rounded-xl bg-center h-[28rem] transition-all duration-300 ease-in-out transform scale-100 group-hover:scale-105"
            style={{
              backgroundImage: posterPath ? `url(${posterPath})` : "none",
            }}
          ></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-opacity-90 backdrop-blur transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100">
            <h2 className="text-2xl text-center text-white font-semibold">
              {title}
            </h2>
            <p className="text-base-content/70 text-center text-white">
              {overview}
            </p>
            <p className="text-white mt-2">Rating: {vote_average}</p>
            <button className="btn rounded-xl normal-case mt-2">
              Watch Now
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
