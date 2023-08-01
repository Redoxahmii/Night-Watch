/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Card = ({ movie }) => {
  const { title, navigateLink, posterPath, overview, vote_average } = movie;
  return (
    <div className="card card-compact w-full max-w-md bg-primary-content rounded-xl shadow-xl">
      <figure>
        <img src={posterPath} alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className=" text-base-content/70">{overview}</p>
        <p>Rating: {vote_average}</p>
        <div className="card-actions justify-end">
          <Link to={navigateLink}>
            <button className="btn btn-base-100 normal-case">Watch Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
