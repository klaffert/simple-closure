import MovieCard from "../MovieCard/MovieCard";
import type { Movie } from "../../types/movie";
import styles from "./MovieGrid.module.css";

type MovieGridProps = {
  movies: Movie[];
};

const MovieGrid = ({ movies }: MovieGridProps) => {
  return (
    <ul className={styles.grid}>
      {movies.map((movie) => (
        <li key={movie.id}>
          <MovieCard movie={movie} />
        </li>
      ))}
    </ul>
  );
};

export default MovieGrid;
