import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Search from "./components/Search";
import useFetch from "./hooks/useFetch";

function App() {
  const [search, setSearch] = useState("");
 
  const url =
    search.trim() === ""
      ? null
      : `http://www.omdbapi.com/?s=${search}&apikey=${import.meta.env.VITE_OMDB_KEY}`;

        // http://www.omdbapi.com/?s=avengers&apikey=76d75171
        // image http://img.omdbapi.com/?apikey=76d75171&s=avengers
  const { data: movies, isLoading, isError } = useFetch(url);
        console.log(movies);
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="pt-6 px-8">
        <Navbar />
      </header>
      <main className="flex flex-col items-center justify-center w-full">
        <Search search={search} setSearch={setSearch} />
      </main>
    </div>
  );
}

export default App;
