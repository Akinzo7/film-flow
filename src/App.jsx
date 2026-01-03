import { Footer } from './components/Footer';
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./components/HomePage";
import MovieInfo from "./components/Movie/MovieInfo";
import Favorites from "./components/Favorites"; 
import { useState } from "react";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-900 grid grid-rows-[auto_1fr_auto] grid-cols-1 text-white ">
      <header className=" area-header py-3 md:pt-6 md:px-8 px-4">
        <Navbar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setSearchQuery={setSearchQuery}
        />
      </header>
      <main className="area-main mb-7">
        <Routes>
          <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
          <Route path="/movie/:id" element={<MovieInfo />} />
          {/* Add this route for Favorites */}
          <Route path="/favorites" element={<Favorites />} />
          {/* Add placeholder routes for Movies and Series if needed */}
          <Route path="/movies" element={<div className="text-center py-20">Movies page coming soon</div>} />
          <Route path="/series" element={<div className="text-center py-20">Series page coming soon</div>} />
        </Routes>
      </main>
     <Footer     />
    </div>
  );
}

export default App;