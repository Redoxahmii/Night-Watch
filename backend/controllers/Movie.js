import axios from "axios";

export const getAllMovies = async (req, res) => {
  try {
    // Make a request to TMDB API to get a list of popular movies
    const { page, category } = req.query;
    const tmdbApiKey = process.env.TMDB_API_KEY;
    if (!["popular", "top_rated", "upcoming"].includes(category)) {
      return res.status(400).json({ error: "Invalid category." });
    }
    const tmdbUrl = `https://api.themoviedb.org/3/movie/${category}?api_key=${tmdbApiKey}&page=${page}`;
    const tmdbResponse = await axios.get(tmdbUrl);

    // Extract relevant movie data from TMDB API response
    const movies = tmdbResponse.data.results;
    const baseUrl = "https://image.tmdb.org/t/p/w500";

    // Generate video embed URLs for each movie using vidsrc.me API
    const moviesWithEmbedUrls = await Promise.all(
      movies.map(async (movie) => {
        const navigateLink = `/movies/${movie.id}`;
        const posterPath = `${baseUrl}${movie.poster_path}`;
        return {
          ...movie,
          navigateLink,
          posterPath,
        };
      })
    );

    res.json(moviesWithEmbedUrls);
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

    const embedUrl = `https://vidsrc.me/embed/movie?tmdb=${movieId}&color=472e5d`;
    const MovieData = {
      title,
      overview,
      vote_average,
      posterPath,
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
    const tmdbApiKey = process.env.TMDB_API_KEY;
    const tmdbUrl = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${query}`;
    const tmdbResponse = await axios.get(tmdbUrl);
    const movies = tmdbResponse.data.results;
    const baseUrl = "https://image.tmdb.org/t/p/w500";
    const moviesWithEmbedUrls = await Promise.all(
      movies.map(async (movie) => {
        const navigateLink = `/movies/${movie.id}`;
        const posterPath = `${baseUrl}${movie.poster_path}`;
        const embedUrl = `https://vidsrc.me/embed/movie?tmdb=${movie.id}`;
        return {
          ...movie,
          navigateLink,
          posterPath,
          embedUrl,
        };
      })
    );
    res.json(moviesWithEmbedUrls);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie. Try again later." });
  }
};
