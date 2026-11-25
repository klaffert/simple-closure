import { useMovies } from "./hooks/useMovies";
import { MovieGrid } from "./components/MovieGrid/MovieGrid";
import styles from "./App.module.css";
import { useMemo } from "react";
import { sortMovies } from "./utils/sortMovies";

const DEFAULT_GENRE_ID = 28;
const DEFAULT_SORT_KEY = "title";

const App = () => {
  const { movies, loading, error } = useMovies(DEFAULT_GENRE_ID);

  const sortedMovies = useMemo(() => {
    return sortMovies(movies, DEFAULT_SORT_KEY);
  }, [movies]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (movies.length === 0) {
    return <div>No movies found.</div>;
  }

  return (
    <main className={styles.page}>
      <h1>Movies</h1>
      <MovieGrid movies={sortedMovies} />
    </main>
  );
};

export default App;
