/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Card = ({ movie }) => {
  const { title, navigateLink, posterPath, overview } = movie;
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={posterPath} alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{overview}</p>
        <div className="card-actions justify-end">
          <Link to={navigateLink}>
            <button className="btn btn-primary">Watch Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
