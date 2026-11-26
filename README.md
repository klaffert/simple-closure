Kell’s MacBook Air, Connected
That’s right. It’s centered with breathing room, and keeps the full width on mobile.

Commit the styling fixes together (e.g. “Center page layout and equalize card heights,” after you’ve added height: 100% to .card), then update the README. After that, tests if you have time.

.card {
background-color: var(--color-surface);
box-shadow: var(--shadow-sm);
border-radius: var(--radius);
overflow: hidden;
transition:
transform 200ms ease,
box-shadow 200ms ease;
height: 100%;

&:hover {
transform: translateY(-4px);
box-shadow: var(--shadow-lg);
}
}

.poster {
aspect-ratio: 2/3;
width: 100%;
object-fit: cover;
display: block;
}

.noPoster {
aspect-ratio: 2/3;
width: 100%;
display: flex;
align-items: center;
justify-content: center;
background: var(--color-placeholder);
color: var(--color-text);
text-align: center;
}

.details {
padding: 1rem;
}
Good progress: height: 100%, the larger hover shadow and your own variables are all in. Three items from earlier are still missing:

Reduced motion. Add a @media (prefers-reduced-motion: reduce) block at the bottom that sets transition: none on .card and transform: none on .card:hover. It’s in your README’s styling decisions, so the code needs to match.
Placeholder padding. .noPoster has no padding, so “No movie poster available” can touch the edges in a 180px card. Add padding: 1rem. Optionally switch its color to var(--color-text-muted), so it reads as secondary.
Heading and paragraph margins. Add rules for .details h2 and .details p: a smaller margin (e.g. 0 0 0.5rem for the title, 0 for the rating) and a more modest font-size for the title (around 1rem). Default <h2> sizing is too large for a narrow card.
Test the reduced-motion block: Chrome DevTools → Command menu (Cmd+Shift+P) → “Emulate CSS prefers-reduced-motion: reduce.” Hovering a card should then have no lift or animation.

Then commit and move on to the README.

i'm not going to do the reduced motion

That’s fine. It’s not a requirement. Just make sure the README doesn’t claim it. Your current styling bullet doesn’t mention it, so you’re covered. Don’t add it when you expand that bullet.

If you want to show you’re aware of it without building it, add “respect prefers-reduced-motion for the hover animation” under With more time. That’s optional.

Still worth doing: the .noPoster padding and the h2/p margins. Then commit and update the README.

.card {
background-color: var(--color-surface);
box-shadow: var(--shadow-sm);
border-radius: var(--radius);
overflow: hidden;
transition:
transform 200ms ease,
box-shadow 200ms ease;
height: 100%;

&:hover {
transform: translateY(-4px);
box-shadow: var(--shadow-lg);
}
}

.poster {
aspect-ratio: 2/3;
width: 100%;
object-fit: cover;
display: block;
}

.noPoster {
aspect-ratio: 2/3;
width: 100%;
display: flex;
align-items: center;
justify-content: center;
background: var(--color-placeholder);
color: var(--color-text-muted);
text-align: center;
padding: 1rem;
}

.details {
padding: 1rem;

h2 {
font-size: 1rem;
margin: 0 0 0.5rem 0;
}

p {
margin: 0;
}
}
That’s done. The placeholder is padded and muted, the title and rating are compact, and nesting h2 and p under .details keeps them scoped to the card. The card styling is finished.

Commit (e.g. “Polish card layout and spacing”), then update the README:

Sort line: now accurate, since the dropdown exists.
Prioritization: the genre filter is fixed to Action at the API level; the sort control was built because it’s handled entirely in the browser; the genre selector was deferred because it would need stale-request handling.
With more time: genre selector with AbortController, URL-synced filters, reduced-motion support, and tests if you don’t get to them.
Paste it when it’s updated and I’ll do a final check.

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

export default MovieCard;
This is unchanged from last time, and it doesn’t need anything. The CSS changes are what mattered, and those are done. (.toFixed(1) appears only once now, so there’s no need for the separate variable I suggested earlier.)

Everything’s in place: commit, then the README update.

.grid {
display: grid;
grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
gap: 1.5rem;
list-style: none;
margin: 0;
padding: 0;
}
This is also unchanged and correct. Nothing to do here.

If you’re going through every file for a final review, keep pasting them: Control.tsx (to confirm value and htmlFor are in), Control.module.css, useMovies.ts (to confirm the updated TODO), and index.css. Otherwise, go straight to the README.

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
MovieGrid is done and correct, no changes needed.

Still to check: Control.tsx, useMovies.ts and index.css.

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
The logic is correct. One thing is missing: the TODO comment isn’t there. Add it above the useEffect, worded for your current scope, e.g.:

The genre is currently fixed, so requests can’t overlap. If a genre selector is added, ignore stale responses in the effect cleanup (e.g. with AbortController).

Why it’s worth the two lines: a reviewer reading the hook will see it accepts a changing genreId and may ask “what happens if it changes quickly?” The comment shows you already know the answer, and it matches what your README says.

Optional: a blank line between the useState and the useEffect for readability.

Next: Control.tsx and index.css.

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

// TODO: The genre is currently fixed. If genre becomes dynamic, we may need to reset the result when the genre changes.
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
The placement is right, but the TODO describes the wrong problem. Resetting the result when the genre changes is already handled: the derived loading makes the old result count as “not current” the moment the genre changes. Nothing needs resetting.

The actual gap is stale responses. If the genre changed quickly, an older request could finish after a newer one and overwrite its result, leaving the grid stuck on loading. The fix would be to ignore or cancel the old request in the effect’s cleanup.

If a reviewer reads the current wording, it suggests you think the reset is missing, when your design already solves it. Reword it to something like:

TODO: Genre is currently fixed, so requests can’t overlap. If it becomes dynamic, ignore stale responses in the effect cleanup (e.g. AbortController) so a slower, older request can’t overwrite a newer one.

Next: Control.tsx and index.css.

import { SORT_OPTIONS, type SortKey } from "../../utils/sortMovies";
import styles from "./Control.module.css";

type ControlProps = {
sortKey: SortKey;
onSortChange: (key: SortKey) => void;
};

const Control = ({ sortKey, onSortChange }: ControlProps) => {
const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
onSortChange(e.target.value as SortKey);
};

return (

<div className={styles.control}>
<label htmlFor="sort">Sort:</label>
<select id="sort" value={sortKey} onChange={handleSortChange}>
{SORT_OPTIONS.map((option) => (
<option key={option.value} value={option.value}>
{option.label}
</option>
))}
</select>
</div>
);
};

export default Control;
That’s done. It’s controlled (value={sortKey}), the label is connected (htmlFor), the props are named for what they do, and the as SortKey cast is safe because every option comes from SORT_OPTIONS. Be ready to explain that cast if asked.

Optional: React.ChangeEvent works because React’s types make the React namespace available everywhere. Some teams prefer an explicit import type { ChangeEvent } from "react" so every name in the file has a visible source. Either is fine.

Last one: index.css. Then the README.

:root {
/_ Colors _/
--color-bg: #f5f5f7;
--color-surface: #ffffff;
--color-placeholder: #e2e2e6;
--color-text: #1d1d1f;
--color-text-muted: #6e6e73;

/_ Shadows _/
--shadow-sm: 0 1px 3px rgb(0 0 0 / 0.12);
--shadow-lg: 0 10px 24px rgb(0 0 0 / 0.18);

/_ Shape _/
--radius: 8px;

font-family:
system-ui,
-apple-system,
"Segoe UI",
Roboto,
sans-serif;
line-height: 1.5;
color-scheme: light dark;
}

@media (prefers-color-scheme: dark) {
:root {
--color-bg: #121214;
--color-surface: #1e1e22;
--color-placeholder: #2c2c32;
--color-text: #f5f5f7;
--color-text-muted: #a1a1a6;
--shadow-sm: 0 1px 3px rgb(0 0 0 / 0.5);
--shadow-lg: 0 10px 24px rgb(0 0 0 / 0.7);
}
}

_,
_::before,
\*::after {
box-sizing: border-box;
}

body {
margin: 0;
min-height: 100vh;
background-color: var(--color-bg);
color: var(--color-text);
}

img {
max-width: 100%;
}
This matches what we set up (Prettier just put the font list on separate lines). Nothing to change.

The code review is done. Last checks before submitting:

Leftover template files: delete App.css and src/assets/react.svg if they’re still there and unused. Also check that public/vite.svg isn’t still the browser-tab icon in index.html, and update the <title> in index.html from “Vite + React + TS” to something like “Action Movies.” The title is easy to miss and shows up in the browser tab while the reviewers are using the app.
npm run lint and npm run build: both should pass with no errors. The build also runs TypeScript checks, so it catches anything the dev server lets through.
Clean-clone test: clone the repo into a new folder, run npm i && npm start, and confirm it works, exactly as the reviewers will.
README update: the sort line, Prioritization, With more time. Paste it for a final look.
import type { DiscoverMoviesResponse } from "../types/movie";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const fetchMovies = async (genreId: number) => {
const url = new URL(`${API_BASE_URL}/discover/movie`);
url.searchParams.set("api_key", API_KEY);
url.searchParams.set("with_genres", genreId.toString());
url.searchParams.set("include_adult", "false");
url.searchParams.set("vote_count.gte", "100");

const response = await fetch(url.toString());
if (!response.ok) {
throw new Error(`Failed to fetch movies: ${response.status}`);
}
const data: DiscoverMoviesResponse = await response.json();
return data.results;
};

const getPosterUrl = (posterPath: string | null, size = "w342") => {
if (!posterPath) {
return null;
}
return `${IMAGE_BASE_URL}/${size}${posterPath}`;
};

export { fetchMovies, getPosterUrl };
tmdb.ts is unchanged and correct. Nothing needed.

Optional: move "100" into a named constant like MIN_VOTE_COUNT at the top of the file, next to the base URLs. The vote floor is one of the decisions in your README, and a named constant makes it visible and easy to find when they ask about it. Not required.

That’s every source file reviewed. Remaining: template cleanup and the index.html title, lint and build, the clean-clone test, and the README update.

what can i put in the commit

Sorting through uncommitted changes in the working tree.
Sorting through uncommitted changes in the working tree.
Run git status first to see what’s changed. Based on what we’ve worked through, you probably have several unrelated changes waiting. Split them into small commits by topic, so the history keeps telling the story of how you built it, which is part of what they’re evaluating.

Likely groups and messages (stage each group with git add <files>, then commit):

Files Message
Control.tsx, Control.module.css, App.tsx, sortMovies.ts (if SORT_OPTIONS is new) add sort control
MovieGrid.tsx, MovieGrid.module.css use list semantics for movie grid
MovieCard.module.css, App.module.css polish card spacing and center page layout
useMovies.ts document stale-response handling for dynamic genre
App.tsx (if the rename and role="alert" weren’t in the first commit) rename genre constant and announce errors
Message style: your existing commits are lowercase and imperative (“add sortMovies with empty date handling”). Keep that style. Imperative mood (“add,” not “added”) is the git convention: a message completes the sentence “this commit will…”.

If a file contains changes for two topics (e.g. App.tsx has both the sort control and the rename), commit it with whichever group it mostly belongs to. Splitting individual lines with git add -p is possible, but not worth the time today.

If you’d rather do one commit: add sort control and polish layout and accessibility is fine. Smaller commits read better, but a clear single commit beats spending an hour on git.

Then the remaining checklist: template cleanup, lint and build, the clean-clone test, the README.

what is the template cleanup

Template cleanup means removing the leftovers from Vite’s starter project, so the repo only contains code you wrote or chose to keep. Reviewers notice demo files, because they make a project look unfinished.

Check each of these:

src/App.css: the demo styles. You use App.module.css now. If nothing imports App.css, delete it.
src/assets/react.svg: the React logo from the demo counter. Delete it (and the assets folder if it’s empty).
public/vite.svg: Vite’s logo, used as the browser tab icon. Either delete it and remove the <link rel="icon"> line in index.html, or keep it. A missing icon is better than Vite’s, but this is minor.
index.html: the <title> says “Vite + React + TS” or similar. Change it to “Action Movies” (or your project name). It’s the text in the browser tab while the reviewers use your app.
The template’s README.md content: you’ve already replaced it. Just make sure none of the template’s text (“This template provides a minimal setup…”) is left at the bottom.
Unused imports: npm run lint will flag any left behind after deleting files.
How to find any I’ve missed: search the project (Cmd+Shift+F in VS Code) for vite.svg, react.svg, App.css and count. Anything still referring to the demo shows up.

After deleting: run npm start to confirm nothing broke (a missing import shows as an error right away), then commit: remove vite template boilerplate.

okay this is my read me

# TMDB Movies

This project fetches Action movies from TMDB API, sorted by rating and is shown as a responsive grid of cards that includes movie poster, title and average rating. It also supports sorting by rating, release date, or title; rating is the default.

## How to run it

- `npm i && npm start`
- Built and tested on Node 26
- Requires Node ^20.19.0 || >=22.12.0 (Vite 8's requirement)

## Decisions and why

- Vite + React + TS: the npm start requirement and there is no need for SSR
- Committed .env: Normally, never committed. Here it's intentional as this allows zero setup for reviewers and the key is exposed in browser already. In a production environment, I would use a server proxy.
- Filter on the API, sort in code: Filtering on the server means you only download relevant movies; sorting in code meets the 'sort using a method' requirement and lets users change the sort without a new request. The vote floor `vote_count.gte=100` bars obscure films with a handful of votes from topping the rating sort.
- Loading state derived from genre
- Explicit empty-date handling: : Unreleased films have an empty `release_date`, they will always sort last regardless of direction
- Styling decisions: Adding `aspect-ratio` to poster image to prevent layout shift; transform for the hover UI and CSS variables for theming

## Prioritization

- Tackled required features first and committed each one as completed.

## With more time

- Unit testing
- Pagination
- Runtime response validation (eg. Zod)
- Analytics on filter changes
- Alternate layout
  Reviewing the remaining open issues in the draft.
  Reviewing the remaining open issues in the draft.
  It’s close. These are the gaps still open from last time:

“Loading state derived from genre” still has no explanation.
Double colon in the empty-date bullet, and the exhaustiveness check isn’t mentioned.
Styling lists what but not why.
Prioritization doesn’t mention the scope decision, which is your best prioritization story.
With more time is missing the genre selector and URL sync.
Accessibility isn’t mentioned anywhere, even though you did a fair amount of it.
Here’s a full version with those filled in, keeping your wording wherever it already worked. Read it through and change anything that doesn’t sound like you. You’ll be explaining each line on the call.

markdown

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
