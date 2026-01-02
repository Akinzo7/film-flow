import { useState, useEffect } from "react";
import MovieResults from "./Movie/MovieResults";
import useFetch from "../hooks/useFetch";

function HomePage({searchQuery}) {
 
  const url = searchQuery
    ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        searchQuery
      )}&api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false`
    : null;

  useEffect(() => {
    console.log("searchQuery changed:", searchQuery);
    console.log("URL:", url);
  }, [searchQuery, url]);

  const { data: movies, isLoading, isError } = useFetch(url);

  return (
    <div className="flex flex-col items-center justify-center w-full">
     
      <MovieResults
        movies={movies}
        isLoading={isLoading}
        isError={isError}
        searchQuery={searchQuery}
      />
    </div>
  );
}
export default HomePage;
