const Loader = () => {
  return (
    <div className=" flex items-center pt-20 justify-center h-[80vh] w-screen">
      <h1 className="text-2xl pr-2">Loading...</h1>
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
};

export default Loader;
