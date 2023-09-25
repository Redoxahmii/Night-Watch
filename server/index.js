import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import MovieRoutes from "./routes/Movie.js";
import TvShowRoutes from "./routes/Shows.js";
import UserRoutes from "./routes/User.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Specify the IP address (127.0.0.1) and port (e.g., 5000)
const serverAddress = process.env.ORIGIN;
const serverPort = process.env.PORT || 5000;
app.use(
  cors({
    // Use the serverAddress variable for the origin
    origin: `${serverAddress}`,
    credentials: true,
  })
);

app.use(cookieParser());

// Routes

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
