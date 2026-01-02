import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoStar } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function HeroSection({ movies }) {
  // State to track current slide index
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Auto-slide functionality
  useEffect(() => {
    if (movies.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % movies.length);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [movies.length]);
  
  // Handle manual navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % movies.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  };
  
  // If no movies, don't render
  if (!movies || movies.length === 0) {
    return <div className="h-[400px] bg-gray-800 animate-pulse"></div>;
  }
  
  const currentMovie = movies[currentSlide];
  
  return (
    <div className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
      {/* Background image with fade effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ 
          backgroundImage: `url(https://image.tmdb.org/t/p/original${currentMovie.backdrop_path})` 
        }}
      />
      
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
      
      {/* Content container */}
      <div className="relative h-full flex items-end px-4 md:px-16 pb-12">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {currentMovie.title}
          </h1>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1 bg-black/50 px-3 py-1 rounded">
              <IoStar className="text-yellow-500" />
              <span className="font-bold">{currentMovie.vote_average?.toFixed(1)}</span>
            </div>
            <span className="text-gray-300">
              {currentMovie.release_date?.split("-")[0]}
            </span>
          </div>
          
          <p className="text-gray-300 mb-6 line-clamp-3 max-w-2xl">
            {currentMovie.overview}
          </p>
          
          <div className="flex gap-4">
            {/* Only More Info button, which links to movie info page */}
            <Link
              to={`/movie/${currentMovie.id}`}
              className="bg-gray-800/70 hover:bg-gray-700/70 text-white font-bold py-3 px-8 rounded-lg transition-colors border border-gray-600"
            >
              More Info
            </Link>
          </div>
        </div>
      </div>
      
      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        {movies.slice(0, 5).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "bg-amber-500 w-8" 
                : "bg-gray-400/50 hover:bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full transition-colors"
      >
        <FaChevronLeft className="text-white w-6 h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full transition-colors"
      >
        <FaChevronRight className="text-white w-6 h-6" />
      </button>
    </div>
  );
}

export default HeroSection;