import axios from "axios";

export const getAllMovies = async (req, res) => {
  try {
    // Make a request to TMDB API to get a list of popular movies
    const { page } = req.query;
    const tmdbApiKey = process.env.TMDB_API_KEY;
    const tmdbUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${tmdbApiKey}&page=${page}`;
    const tmdbResponse = await axios.get(tmdbUrl);

    // Extract relevant movie data from TMDB API response
    const movies = tmdbResponse.data.results;
    const baseUrl = "https://image.tmdb.org/t/p/w500";

    // Generate video embed URLs for each movie using vidsrc.me API
    const moviesWithEmbedUrls = await Promise.all(
      movies.map(async (movie) => {
        const posterPath = `${baseUrl}${movie.poster_path}`;
        return {
          ...movie,
          posterPath,
        };
      })
    );

    res.json(moviesWithEmbedUrls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch movies." });
  }
};

export const getOneMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const tmdbApiKey = process.env.TMDB_API_KEY;
    const tmdbUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${tmdbApiKey}`;
    const tmdbResponse = await axios.get(tmdbUrl);
    const data = tmdbResponse.data;
    const { title, overview, poster_path, release_date, status, tagline } =
      data;
    const baseUrl = "https://image.tmdb.org/t/p/w500";
    const PosterPath = `${baseUrl}${poster_path}`;

    const embedUrl = `https://vidsrc.me/embed/movie?tmdb=${movieId}`;
    const MovieData = {
      title,
      overview,
      PosterPath,
      release_date,
      status,
      tagline,
      embedUrl,
    };
    res.status(200).json(MovieData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie." });
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
    res.status(500).json({ error: "Failed to fetch movie." });
  }
};
