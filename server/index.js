import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import MovieRoutes from "./routes/Movie.js";
import TvShowRoutes from "./routes/Shows.js";
import UserRoutes from "./routes/User.js";
import cookieParser from "cookie-parser";

let helmet;

if (process.env.HELMET === "true") {
  import("helmet").then((module) => {
    helmet = module.default;
    initializeServer();
  });
} else {
  import("helmet/index.cjs").then((module) => {
    helmet = module.default;
    initializeServer();
  });
}

function initializeServer() {
  dotenv.config();
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const serverAddress = process.env.ORIGIN;
  const serverPort = process.env.PORT || 5000;
  app.use(
    cors({
      origin: `${serverAddress}`,
      credentials: true,
    })
  );

  app.use(cookieParser());

  // Ensure that helmet is a function before using it
  if (typeof helmet === "function") {
    app.use(helmet());
    app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
  }

  app.use("/api/movie", MovieRoutes);
  app.use("/api/tvshow", TvShowRoutes);
  app.use("/api/user", UserRoutes);

  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      app.listen(serverPort, () => {
        console.log(`Server is running on ${serverPort}`);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
