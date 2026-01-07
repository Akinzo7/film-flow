import { Footer } from './components/Footer';
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./Pages/HomePage";
import MovieInfo from "./components/Movie/MovieInfo";
import Favorites from "./components/Favorites"; 
import MoviePage from "./Pages/MoviePage"; 
import TVShowsPage from "./Pages/TVShowsPage"; 
import { useState } from "react";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

   const clearSearch = () => {
    setSearchInput("");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gray-900 grid grid-rows-[auto_1fr_auto] grid-cols-1 text-white ">
      <header className=" area-header py-3 md:pt-6 md:px-8 px-4">
        <Navbar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setSearchQuery={setSearchQuery}
          clearSearch={clearSearch}
        />
      </header>
      <main className="area-main mb-7">
        <Routes>
          <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
          <Route path="/movie/:id" element={<MovieInfo />} />
          <Route path="/tv/:id" element={<MovieInfo />} />  {/* Add TV show detail route */}
          <Route path="/favorites" element={<Favorites />} />
          {/* Use the actual page components */}
          <Route path="/movies" element={<MoviePage />} />
          <Route path="/series" element={<TVShowsPage />} />
        </Routes>
      </main>
     <Footer />
    </div>
  );
}

export default App;