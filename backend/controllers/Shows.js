import axios from "axios";

export const getAllShows = async (req, res) => {
  try {
    const tmdbApiKey = process.env.TMDB_API_KEY;
    const tmdbUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${tmdbApiKey}`;

    // Make a request to TMDB API to get a list of popular TV shows using axios
    const tmdbResponse = await axios.get(tmdbUrl);
    const tvShows = tmdbResponse.data.results;

    // Generate video embed URLs for each TV show using vidsrc.me API
    const tvShowsWithEmbedUrls = await Promise.all(
      tvShows.map(async (tvShow) => {
        const embedUrl = `https://vidsrc.me/embed/tv?tmdb=${tvShow.id}`;
        return {
          ...tvShow,
          embedUrl,
        };
      })
    );

    res.json(tvShowsWithEmbedUrls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch TV shows." });
  }
};

export const getOneShow = async (req, res) => {
  try {
    const tmdbApiKey = process.env.TMDB_API_KEY;
    const { showId } = req.params;
    const tmdbUrl = `https://api.themoviedb.org/3/tv/${showId}?api_key=${tmdbApiKey}`;
    const tmdbResponse = await axios.get(tmdbUrl);
    const data = tmdbResponse.data;
    const { poster_path } = data;
    const baseUrl = "https://image.tmdb.org/t/p/w500";
    data.poster_path = `${baseUrl}${poster_path}`;
    data.networks[0].logo_path = `${baseUrl}${data.networks[0].logo_path}`;
    const embedUrl = `https://vidsrc.me/embed/tv?tmdb=${showId}`;
    const ShowData = {
      data,
      embedUrl,
    };
    res.status(200).json(ShowData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch TV show." });
  }
};
