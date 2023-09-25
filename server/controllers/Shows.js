import axios from "axios";

export const getAllShows = async (req, res) => {
  try {
    const { page, category } = req.query;
    const tmdbApiKey = process.env.TMDB_API_KEY;
    if (!["popular", "top_rated", "on_the_air"].includes(category)) {
      return res.status(400).json({ error: "Invalid category." });
    }
    const tmdbUrl = `https://api.themoviedb.org/3/tv/${category}?api_key=${tmdbApiKey}&page=${page}`;

    // Make a request to TMDB API to get a list of popular TV shows using axios
    const tmdbResponse = await axios.get(tmdbUrl);
    const tvShows = tmdbResponse.data.results;
    const fetchTrailerUrl = async (tvshowId) => {
      const trailerResponse = await axios.get(
        `https://api.themoviedb.org/3/tv/${tvshowId}/videos?api_key=${tmdbApiKey}`
      );

      // Filter for trailers based on the "type" field
      const trailers = trailerResponse.data.results.filter(
        (video) => video.type === "Trailer"
      );

      // Check if there are trailers available for the movie
      if (trailers.length > 0) {
        const trailerKey = trailers[0].key; // Assuming you want the first trailer in the list
        return `${trailerKey}`;
      } else {
        return ""; // Return an empty string if no trailers are found
      }
    };

    // Generate video embed URLs for each TV show using vidsrc.me API
    const tvShowsWithEmbedUrls = await Promise.all(
      tvShows.map(async (tvShow) => {
        const navigateLink = `/tvshows/${tvShow.id}/1/1`;
        const trailerKey = await fetchTrailerUrl(tvShow.id);
        const { name, overview, vote_average } = tvShow;
        const title = name;
        const posterPath = `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`;
        const embedUrl = `https://vidsrc.to/embed/tv/${tvShow.id}`;
        return {
          title,
          overview,
          vote_average,
          trailerUrl: trailerKey,
          navigateLink,
          posterPath,
          embedUrl,
        };
      })
    );

    res.json(tvShowsWithEmbedUrls);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch TV shows. Try again later" });
  }
};

export const getOneShow = async (req, res) => {
  try {
    const tmdbApiKey = process.env.TMDB_API_KEY;
    const { showId, episode, season } = req.params;
    const tmdbUrl = `https://api.themoviedb.org/3/tv/${showId}?api_key=${tmdbApiKey}`;
    const tmdbResponse = await axios.get(tmdbUrl);
    const data = tmdbResponse.data;

    // Extract seasons information with names
    const seasons = data.seasons.map((season) => ({
      seasonNumber: season.season_number,
      seasonName: season.name,
      episodeCount: Array.from(
        { length: season.episode_count },
        (_, i) => i + 1
      ),
    }));

    const {
      poster_path,
      name,
      number_of_episodes,
      overview,
      vote_average,
      status,
      tagline,
    } = data;
    const posterPath = `https://image.tmdb.org/t/p/w500/${poster_path}`;
    const embedUrl = `https://vidsrc.to/embed/tv/${showId}/${season}/${episode}`;
    const genres = data.genres.map((genre) => genre.name);
    const title = name;
    const ShowData = {
      posterPath,
      title,
      number_of_episodes,
      overview,
      number_of_seasons: data.number_of_seasons,
      vote_average,
      status,
      genres,
      tagline,
      embedUrl,
      episode_run_time: data.episode_run_time[0],
      seasons: seasons, // Include the extracted seasons object
    };

    const vidsrcResponse = await axios.head(embedUrl);
    if (vidsrcResponse.status !== 200) {
      return res
        .status(404)
        .json({ error: "Movie or TV show not found on VidSrc." });
    }
    res.status(200).json(ShowData);
  } catch (error) {
    res
      .status(402)
      .json({ error: "Failed to fetch TV shows. Try again later" });
  }
};
