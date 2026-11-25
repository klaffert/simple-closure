const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

const fetchMovies = async (genreId: number) => {
  const url = new URL(`${API_BASE_URL}/discover/movie`);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("with_genres", genreId.toString());

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }
  const data = await response.json();
  return data.results;
};

const getPosterUrl = (posterPath: string | null, size: string = "w342") => {
  if (!posterPath) {
    return null;
  }
  return `${IMAGE_BASE_URL}${size}${posterPath}`;
};

export { fetchMovies, getPosterUrl };
