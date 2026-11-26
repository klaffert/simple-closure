import { useState, useEffect } from "react";
import type { Movie } from "../types/movie";
import { fetchMovies } from "../api/tmdb";

type MoviesResult = {
  genreId: number | null;
  movies: Movie[];
  error: Error | null;
};

const useMovies = (genreId: number) => {
  const [result, setResult] = useState<MoviesResult>({
    movies: [],
    genreId: null,
    error: null,
  });

  // TODO: Genre is currently fixed, so requests can't overlap.
  // If it becomes dynamic, ignore stale responses in the effect cleanup
  // (e.g. AbortController) so a slower, older request can't overwrite a newer one.
  useEffect(() => {
    fetchMovies(genreId)
      .then((movies) => {
        setResult({ genreId, movies, error: null });
      })
      .catch((error) => {
        setResult({ genreId, movies: [], error });
      });
  }, [genreId]);

  const loading = result.genreId !== genreId;
  const error = loading ? null : result.error;

  return { movies: result.movies, loading, error };
};

export { useMovies };
