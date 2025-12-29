import { useState,useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import MovieResults from "./components/Movie/MovieResults";
import Search from "./components/Search";
import useFetch from "./hooks/useFetch";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  

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
    <div className="min-h-screen bg-gray-900 text-white ">
      <header className="pt-6 px-8">
        <Navbar />
      </header>
      <main className="flex flex-col items-center justify-center w-full">
        <Search
          search={searchInput}
          setSearch={setSearchInput}
          onSearchSubmit={setSearchQuery}
        />
        <MovieResults movies={movies} isLoading={isLoading} isError={isError} />
      </main>
    </div>
  );
}

export default App;
