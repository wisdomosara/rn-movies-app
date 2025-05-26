const headers = {
  accept: "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYmQ1MDg0MzU0N2EyNjljNDJkMmJmNzAxZTEzNTlmOSIsIm5iZiI6MTc0NzkyMDUzOC4xMjcsInN1YiI6IjY4MmYyNjlhYjMzNzliN2Q5OWQ1YzEyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FZW1sUryhqtAveOqEsJOuzI2psO8ML1OBDmmCKcHMr4",
};

export const getTrendingMovies = async (page: number) => {
  const url = `https://api.themoviedb.org/3/trending/all/day?language=en-US&page=${page}`;
  const options = {
    method: "GET",
    headers,
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.results as NewTrendingMovie[];
  } catch (error) {
    console.log("Error fetching trending movies: ", error);
    console.error(error);
    throw error;
  }
};

export const getLatestMovies = async (page: number) => {
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;
  const options = {
    method: "GET",
    headers,
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.results as Movie[];
  } catch (error) {
    console.log("Error fetching trending movies: ", error);
    console.error(error);
    throw error;
  }
};

export const getMovieById = async (id: number) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const options = {
    method: "GET",
    headers,
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data as MovieDetails;
  } catch (error) {
    console.log("Error fetching movie details: ", error);
    console.error(error);
    throw error;
  }
};

export const searchMovies = async (query: string, page: number = 1) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
    query || ""
  )}&include_adult=false&language=en-US&page=${page}`;
  const options = {
    method: "GET",
    headers,
  };

  try {
    const response = await fetch(url, options);

    const data = await response.json();
    return data.results as Movie[];
  } catch (error) {
    console.log("Error searching movies: ", error);
    console.error(error);
    throw error;
  }
};
