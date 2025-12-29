import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./components/HomePage"; 

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="pt-6 px-8">
        <Navbar />
      </header>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieInfo />} />
      </Routes>
    </div>
  );
}

export default App;