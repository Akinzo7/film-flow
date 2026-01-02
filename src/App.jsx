import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./components/HomePage";
import MovieInfo from "./components/Movie/MovieInfo";
import { useState } from "react";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-900 grid grid-rows-[auto_1fr_auto] grid-cols-1 text-white ">
      <header className=" area-header pt-3 md:pt-6 md:px-8 px-4">
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
        </Routes>
      </main>
      <footer className="w-full h-[20vh] area-footer w-full bg-[#101426]">
        this is footer
      </footer>
    </div>
  );
}

export default App;
