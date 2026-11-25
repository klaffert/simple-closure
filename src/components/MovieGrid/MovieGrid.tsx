import { MovieCard } from "../MovieCard/MovieCard";
import type { Movie } from "../../types/movie";
import styles from "./MovieGrid.module.css";

const MovieGrid = ({ movies }: { movies: Movie[] }) => {
  return (
    <div className={styles.grid}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export { MovieGrid };
