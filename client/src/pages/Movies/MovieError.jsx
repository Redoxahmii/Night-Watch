import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const MovieError = () => {
  const navigate = useNavigate();
  return (
    <div className="flex w-screen flex-col gap-2 h-screen items-center justify-center">
      <h1 className="text-8xl tracking-tighter">404</h1>
      <div className="w-full max-w-md text-center">
        <p className="text-2xl tracking-tight mt-3">
          This movie has not yet been added to the servers 😞. You can navigate
          back to look for other shows.
        </p>
      </div>
      <Button
        color="secondary"
        variant="faded"
        onPress={() => navigate(-1)}
        size="lg"
        className="mt-2"
      >
        Back
      </Button>
    </div>
  );
};

export default MovieError;
