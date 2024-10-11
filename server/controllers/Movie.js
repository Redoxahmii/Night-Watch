import axios from "axios";

export const getAllMovies = async (req, res) => {
  try {
    const { page, category } = req.query;
    const tmdbApiKey = process.env.TMDB_API_KEY;
    if (!["popular", "top_rated", "upcoming"].includes(category)) {
      return res.status(400).json({ error: "Invalid category." });
    }
    const tmdbUrl = `https://api.themoviedb.org/3/movie/${category}?api_key=${tmdbApiKey}&page=${page}`;
    const tmdbResponse = await axios.get(tmdbUrl);

    const movies = tmdbResponse.data.results;
    const baseUrl = "https://image.tmdb.org/t/p/w500";

    const fetchTrailerUrl = async (movieId) => {
      const trailerResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${tmdbApiKey}`,
      );

      // Filter for trailers based on the "type" field
      const trailers = trailerResponse.data.results.filter(
        (video) => video.type === "Trailer",
      );

      // Check if there are trailers available for the movie
      if (trailers.length > 0) {
        const trailerKey = trailers[0].key; // Assuming you want the first trailer in the list
        return `${trailerKey}`;
      } else {
        return ""; // Return an empty string if no trailers are found
      }
    };

    // Generate video embed URLs and trailer URLs for each movie
    const moviesWithEmbedAndTrailerUrls = await Promise.all(
      movies.map(async (movie) => {
        const navigateLink = `/movies/${movie.id}`;
        const posterPath = `${baseUrl}${movie.poster_path}`;
        const trailerUrl = await fetchTrailerUrl(movie.id);

        // Check if the poster image exists
        const imageExists = await checkImageExists(posterPath);

        return {
          ...movie,
          navigateLink,
          posterPath: imageExists ? posterPath : "",
          trailerUrl, // Add the trailer URL to the movie data
        };
      }),
    );

    res.json(moviesWithEmbedAndTrailerUrls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch movies. Try again later" });
  }
};

export const getOneMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const tmdbApiKey = process.env.TMDB_API_KEY;
    const tmdbUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${tmdbApiKey}`;
    const tmdbResponse = await axios.get(tmdbUrl);
    const data = tmdbResponse.data;
    const {
      title,
      overview,
      poster_path,
      release_date,
      status,
      tagline,
      vote_average,
    } = data;
    const baseUrl = "https://image.tmdb.org/t/p/w500";
    const posterPath = `${baseUrl}${poster_path}`;

    const embedUrl = `https://vidsrc.to/embed/movie/${movieId}`;

    // Check if the poster image exists
    const imageExists = await checkImageExists(posterPath);

    const MovieData = {
      title,
      overview,
      vote_average,
      posterPath: imageExists ? posterPath : "", // Set an empty path if the image doesn't exist
      release_date,
      status,
      tagline,
      embedUrl,
    };

    const vidsrcResponse = await axios.head(embedUrl);
    if (vidsrcResponse.status !== 200) {
      return res
        .status(404)
        .json({ error: "Movie or TV show not found on VidSrc." });
    }
    res.status(200).json(MovieData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies. Try again later" });
  }
};

export const searchMovies = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: "Please enter a Search term" });
    }
    const tmdbApiKey = process.env.TMDB_API_KEY;
    const tmdbUrl = `https://api.themoviedb.org/3/search/movie?include_adult=true&language=en-US&api_key=${tmdbApiKey}&query=${query}`;
    const tmdbResponse = await axios.get(tmdbUrl);
    const movies = tmdbResponse.data.results;
    const baseUrl = "https://image.tmdb.org/t/p/w500";

    // Function to fetch trailer URL for a movie
    const fetchTrailerUrl = async (movieId) => {
      const trailerResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${tmdbApiKey}`,
      );

      // Filter for trailers based on the "type" field
      const trailers = trailerResponse.data.results.filter(
        (video) => video.type === "Trailer",
      );

      // Check if there are trailers available for the movie
      if (trailers.length > 0) {
        const trailerKey = trailers[0].key; // Assuming you want the first trailer in the list
        return `${trailerKey}`;
      } else {
        return ""; // Return an empty string if no trailers are found
      }
    };

    const moviesWithEmbedUrls = await Promise.all(
      movies.map(async (movie) => {
        const navigateLink = `/movies/${movie.id}`;
        const posterPath = `${baseUrl}${movie.poster_path}`;
        const embedUrl = `https://vidsrc.to/embed/movie/${movie.id}`;

        // Check if the poster image exists
        try {
          const imageExists = await checkImageExists(posterPath);
          if (imageExists) {
            // Fetch trailer URL
            const trailerUrl = await fetchTrailerUrl(movie.id);

            return {
              ...movie,
              navigateLink,
              posterPath,
              embedUrl,
              trailerUrl, // Add the trailer URL to the movie data
            };
          } else {
            // If the image doesn't exist, return an empty posterPath and trailerUrl
            return {
              ...movie,
              navigateLink,
              posterPath: "",
              embedUrl,
              trailerUrl: "",
            };
          }
        } catch (error) {
          console.error("Error checking image existence:", error);
          return {
            ...movie,
            navigateLink,
            posterPath: "",
            embedUrl,
            trailerUrl: "",
          };
        }
      }),
    );
    res.json(moviesWithEmbedUrls);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie. Try again later." });
  }
};

export const searchMovieAndShows = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: "Please enter a Search term" });
    }
    const tmdbApiKey = process.env.TMDB_API_KEY;
    const tvUrl = `https://api.themoviedb.org/3/search/tv?include_adult=true&language=en-US&api_key=${tmdbApiKey}&query=${query}`;
    const movieUrl = `https://api.themoviedb.org/3/search/movie?include_adult=true&language=en-US&api_key=${tmdbApiKey}&query=${query}`;
    const [tvResponse, movieResponse] = await Promise.all([
      axios.get(tvUrl),
      axios.get(movieUrl),
    ]);
    const movies = movieResponse.data.results;
    const tvShows = tvResponse.data.results;
    const baseUrl = "https://image.tmdb.org/t/p/w500";

    // Function to fetch trailer URL for a movie
    const fetchTrailerUrl = async (movieId) => {
      const trailerResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${tmdbApiKey}`,
      );

      // Filter for trailers based on the "type" field
      const trailers = trailerResponse.data.results.filter(
        (video) => video.type === "Trailer",
      );

      // Check if there are trailers available for the movie
      if (trailers.length > 0) {
        const trailerKey = trailers[0].key; // Assuming you want the first trailer in the list
        return `${trailerKey}`;
      } else {
        return ""; // Return an empty string if no trailers are found
      }
    };
    const fetchTrailerUrlTV = async (showId) => {
      const trailerResponse = await axios.get(
        `https://api.themoviedb.org/3/tv/${showId}/videos?api_key=${tmdbApiKey}`,
      );

      // Filter for trailers based on the "type" field
      const trailers = trailerResponse.data.results.filter(
        (video) => video.type === "Trailer",
      );

      // Check if there are trailers available for the movie
      if (trailers.length > 0) {
        const trailerKey = trailers[0].key; // Assuming you want the first trailer in the list
        return `${trailerKey}`;
      } else {
        return ""; // Return an empty string if no trailers are found
      }
    };

    const moviesWithEmbedUrls = await Promise.all(
      movies.map(async (movie) => {
        const navigateLink = `/movies/${movie.id}`;
        const posterPath = `${baseUrl}${movie.poster_path}`;
        const embedUrl = `https://vidsrc.to/embed/movie/${movie.id}`;

        // Check if the poster image exists
        try {
          const imageExists = await checkImageExists(posterPath);
          if (imageExists) {
            // Fetch trailer URL
            const trailerUrl = await fetchTrailerUrl(movie.id);

            return {
              ...movie,
              navigateLink,
              posterPath,
              embedUrl,
              trailerUrl, // Add the trailer URL to the movie data
            };
          } else {
            // If the image doesn't exist, return an empty posterPath and trailerUrl
            return {
              ...movie,
              navigateLink,
              posterPath: "",
              embedUrl,
              trailerUrl: "",
            };
          }
        } catch (error) {
          console.error("Error checking image existence:", error);
          return {
            ...movie,
            navigateLink,
            posterPath: "",
            embedUrl,
            trailerUrl: "",
          };
        }
      }),
    );
    const tvShowsWithEmbedUrls = await Promise.all(
      tvShows.map(async (movie) => {
        const navigateLink = `/tvshows/${movie.id}/1/1`;
        const posterPath = `${baseUrl}${movie.poster_path}`;
        const embedUrl = `https://vidsrc.to/embed/tv/${movie.id}`;
        const { name } = movie;
        const title = name;
        // Check if the poster image exists
        try {
          const imageExists = await checkImageExists(posterPath);
          if (imageExists) {
            // Fetch trailer URL
            const trailerUrl = await fetchTrailerUrlTV(movie.id);

            return {
              ...movie,
              title,
              navigateLink,
              posterPath,
              embedUrl,
              trailerUrl, // Add the trailer URL to the movie data
            };
          } else {
            // If the image doesn't exist, return an empty posterPath and trailerUrl
            return {
              ...movie,
              title,
              navigateLink,
              posterPath: "",
              embedUrl,
              trailerUrl: "",
            };
          }
        } catch (error) {
          console.error("Error checking image existence:", error);
          return {
            ...movie,
            title,
            navigateLink,
            posterPath: "",
            embedUrl,
            trailerUrl: "",
          };
        }
      }),
    );

    res.json({
      tvShows: tvShowsWithEmbedUrls,
      movies: moviesWithEmbedUrls,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie. Try again later." });
  }
};

async function checkImageExists(url) {
  try {
    const response = await axios.head(url);
    return response.status === 200;
  } catch (error) {
    return false; // Image doesn't exist
  }
}
