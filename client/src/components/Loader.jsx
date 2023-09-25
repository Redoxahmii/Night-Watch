import { CircularProgress } from "@nextui-org/react";

const Loader = () => {
  return (
    <div className=" flex items-center pt-20 justify-center h-screen w-screen">
      <h1 className="text-2xl pr-2">Loading...</h1>
      <CircularProgress color="secondary" aria-label="Loading..." size="lg" />
    </div>
  );
};

export default Loader;
