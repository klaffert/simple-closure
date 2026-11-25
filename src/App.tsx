import { useMovies } from "./hooks/useMovies";
import { MovieGrid } from "./components/MovieGrid/MovieGrid";

const DEFAULT_GENRE_ID = 28;

const App = () => {
  const { movies, loading, error } = useMovies(DEFAULT_GENRE_ID);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (movies.length === 0) {
    return <div>No movies found.</div>;
  }

  return <MovieGrid movies={movies} />;
};

export default App;
