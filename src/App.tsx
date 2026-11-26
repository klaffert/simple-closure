import { useMemo, useState } from "react";
import { useMovies } from "./hooks/useMovies";
import MovieGrid from "./components/MovieGrid/MovieGrid";
import styles from "./App.module.css";
import { sortMovies, type SortKey } from "./utils/sortMovies";
import Control from "./components/Control/Control";

const ACTION_GENRE_ID = 28;
const DEFAULT_SORT_KEY: SortKey = "rating";

const App = () => {
  const [sortKey, setSortKey] = useState<SortKey>(DEFAULT_SORT_KEY);

  const { movies, loading, error } = useMovies(ACTION_GENRE_ID);

  const sortedMovies = useMemo(() => {
    return sortMovies(movies, sortKey);
  }, [movies, sortKey]);

  const renderContent = () => {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div role="alert">Error: {error.message}</div>;
    }
    if (movies.length === 0) {
      return <div>No movies found.</div>;
    }
    return <MovieGrid movies={sortedMovies} />;
  };

  return (
    <main className={styles.page}>
      <h1>Action Movies</h1>
      <Control sortKey={sortKey} onSortChange={setSortKey} />
      {renderContent()}
    </main>
  );
};

export default App;
