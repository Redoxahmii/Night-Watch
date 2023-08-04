import { Link } from "react-router-dom";

const ShowError = () => {
  return (
    <div className="flex w-screen flex-col gap-2 mt-52 items-center justify-center">
      <h1 className="text-8xl">404</h1>
      <div className="w-full max-w-md text-center">
        <p className="text-2xl mt-3">
          This show has not yet been added to the servers 😞. You can navigate
          back to look for other shows.
        </p>
      </div>
      <Link
        to="/tvshows/popular"
        className=" btn btn-primary mt-2 rounded-xl normal-case"
      >
        Back
      </Link>
    </div>
  );
};

export default ShowError;
