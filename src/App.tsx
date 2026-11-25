import { useEffect } from "react";
import fetchMovies from "./api/tmdb";

const App = () => {
  useEffect(() => {
    fetchMovies(28).then((data) => console.log(data));
  }, []);
  return <div>Movie Grid</div>;
};

export default App;
