type Movie = {
  genre_ids: number[];
  id: number;
  overview: string;
  poster_path: string | null;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
};

type DiscoverMoviesResponse = {
  results: Movie[];
};

export type { DiscoverMoviesResponse, Movie };
