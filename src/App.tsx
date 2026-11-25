import { useMovies } from "./hooks/useMovies";

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

  return (
    <div>
      {movies.map((movie) => (
        <div key={movie.id}>{movie.title}</div>
      ))}
    </div>
  );
};

export default App;
