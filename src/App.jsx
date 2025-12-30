import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./components/HomePage";
import MovieInfo from "./components/Movie/MovieInfo";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 grid grid-rows-[auto_1fr_auto] grid-cols-1 text-white ">
      <header className=" area-header pt-6 px-8">
        <Navbar />
      </header>
      <main className="area-main mb-7">
        <Routes>
          <Route path="/" element={<HomePage />} />
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
