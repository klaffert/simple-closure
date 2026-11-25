import { getPosterUrl } from "../../api/tmdb";
import type { Movie } from "../../types/movie";

type MovieCardProps = {
  movie: Movie;
};

const MovieCard = ({ movie }: MovieCardProps) => {
  const posterUrl = getPosterUrl(movie.poster_path);
  return (
    <article>
      {posterUrl ? (
        <img src={posterUrl} alt={`Poster for ${movie.title}`} loading="lazy" />
      ) : (
        <div>No movie poster available</div>
      )}
      <h2>{movie.title}</h2>
      <p>Rating: {movie.vote_average.toFixed(1)}/10</p>
    </article>
  );
};

export { MovieCard };
