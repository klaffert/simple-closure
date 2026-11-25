import { getPosterUrl } from "../../api/tmdb";
import type { Movie } from "../../types/movie";
import styles from "./MovieCard.module.css";

type MovieCardProps = {
  movie: Movie;
};

const MovieCard = ({ movie }: MovieCardProps) => {
  const posterUrl = getPosterUrl(movie.poster_path);
  return (
    <article className={styles.card}>
      {posterUrl ? (
        <img
          className={styles.poster}
          src={posterUrl}
          alt={`Poster for ${movie.title}`}
          loading="lazy"
        />
      ) : (
        <div className={styles.noPoster}>No movie poster available</div>
      )}
      <div className={styles.details}>
        <h2>{movie.title}</h2>
        <p>Rating: {movie.vote_average.toFixed(1)}/10</p>
      </div>
    </article>
  );
};

export { MovieCard };
