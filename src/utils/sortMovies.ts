import type { Movie } from "../types/movie";

export type SortKey = "rating" | "releaseDate" | "title";

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "rating", label: "Rating (high to low)" },
  { value: "releaseDate", label: "Release Date (newest to oldest)" },
  { value: "title", label: "Title (A to Z)" },
];

const compareReleaseDateDesc = (a: Movie, b: Movie) => {
  if (!a.release_date && !b.release_date) return 0;
  if (!a.release_date) return 1;
  if (!b.release_date) return -1;
  return b.release_date.localeCompare(a.release_date);
};

export const sortMovies = (movies: Movie[], sortKey: SortKey) => {
  return [...movies].sort((a, b) => {
    switch (sortKey) {
      case "rating":
        return b.vote_average - a.vote_average;
      case "releaseDate":
        return compareReleaseDateDesc(a, b);
      case "title":
        return a.title.localeCompare(b.title);
      default: {
        const unhandled: never = sortKey;
        throw new Error(`Unhandled sort key: ${unhandled}`);
      }
    }
  });
};
