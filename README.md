# TMDB Movies

Fetches Action movies from the TMDB API and displays them in a responsive grid of cards showing the poster, title, and average rating. Movies can be sorted by rating, release date, or title (rating is the default).

## How to run it

- `npm i && npm start`
- Requires Node `^20.19.0 || >=22.12.0` (Vite 8's requirement)
- Built and tested on Node 26

## Decisions and why

- **Vite + React + TypeScript:** `npm start` works on a fresh clone with no build step, and the app doesn't need SSR or routing, so Next.js would add complexity without benefit.
- **Committed `.env`:** Normally never committed. Here it's intentional: it allows zero setup for reviewers, and any `VITE_` variable is bundled into client code, so the key is visible in the browser regardless. In production I'd keep the key on a server and proxy requests through it.
- **Filter on the API, sort in code:** Filtering on the server means only relevant movies are downloaded. Sorting in code meets the "sort using a method" requirement and lets users change the sort without a new request. A vote floor (`vote_count.gte=100`) keeps obscure films with a handful of votes from topping the rating sort.
- **Loading state derived, not stored:** The hook stores which genre its results belong to, and `loading` is calculated by comparing that to the requested genre. This avoids calling `setState` at the start of the effect (flagged by the React hooks lint rule) and the extra render it causes.
- **Explicit empty-date handling:** Unreleased films have an empty `release_date`; they always sort last regardless of direction. The sort uses an exhaustiveness check, so adding a new sort option without handling it fails to compile.
- **Types that surface edge cases:** `poster_path` is typed as nullable, so the compiler forced handling of movies without posters (a placeholder is shown).
- **Styling:**
  - `aspect-ratio` on posters reserves space before images load, preventing layout shift
  - The hover effect animates `transform`, which the GPU handles without recalculating layout
  - CSS variables for colors and shadows, so theming (including dark mode) is controlled in one place
  - CSS Modules keep styles scoped to each component
- **Accessibility:** Semantic HTML (`main`, `article`, list markup for the grid), a labeled sort control, descriptive alt text, and errors announced with `role="alert"`.

## Prioritization

1. Required features first (fetch, filter, sort, grid, cards, hover), committed as each was completed.
2. Then extras chosen by value for the effort: responsive grid, sort control, transitions.
3. The genre filter is fixed to Action at the API level. I built the sort control because it's handled entirely in the browser; a genre selector would introduce overlapping requests and need stale-response handling, so I deferred it rather than ship it half-handled.

## With more time

- Genre selector, with stale requests cancelled via `AbortController`
- Sync sort/filter state to the URL for shareable links
- Unit tests for `sortMovies` and the `useMovies` hook
- Runtime response validation (e.g. Zod)
- Pagination or infinite scroll
- Analytics events on sort/filter changes
- Respect `prefers-reduced-motion` for the hover animation
- Alternate layout option
