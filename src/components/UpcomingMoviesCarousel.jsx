import { useRef } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoStar } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavorites } from "../contexts/FavoritesContext";

function UpcomingMoviesCarousel({ movies }) {
  const scrollContainerRef = useRef(null);
  const { isFavorite, toggleFavorite } = useFavorites();

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  // If no movies, don't render
  if (!movies || movies.length === 0) return null;

  return (
    <div className="relative">
      {/* Navigation arrows */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 bg-gray-900/80 hover:bg-gray-800 p-2 rounded-full cursor-pointer transition-colors"
      >
        <FaChevronLeft className="text-white w-5 h-5 md:w-6 md:h-6" />
      </button>

      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 bg-gray-900/80 hover:bg-gray-800 p-2 rounded-full cursor-pointer transition-colors"
      >
        <FaChevronRight className="text-white w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Carousel container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-4 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {movies.map((movie) => {
          const movieTitle = movie.title || "Untitled";
          const year = movie.release_date?.split("-")[0] || "";
          const rating = movie.vote_average?.toFixed(1) || "N/A";
          const posterPath = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "/poster.jpg";

          // Movie object for favorites
          const movieForFavorites = {
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
            vote_average: movie.vote_average,
          };

          return (
            <div
              key={movie.id}
              className="flex-shrink-0 w-[173px] md:w-[180px] relative pt-2"
            >
              {/* Movie card link - Same style as other carousels */}
              <Link
                to={`/movie/${movie.id}`}
                style={{ backgroundImage: `url('${posterPath}')` }}
                className="w-full aspect-[2/3] flex flex-col justify-between bg-cover bg-center bg-gray-800 rounded-sm p-1 cursor-pointer"
              >
                {/* Movie name and year banner */}
                <div className="w-full mx-auto bg-gray-900 text-white text-[14px] text-center py-[0.3em] px-[0.6em] rounded-sm font-bold">
                  {movieTitle} {year && `(${year})`}
                </div>

                <div className="flex justify-between items-start">
                  {/* Rating badge with star */}
                  <div className="flex items-center bg-gray-900 text-white gap-1 self-start p-1 rounded-sm">
                    <IoStar className="text-yellow-500 w-4 h-4 mb-0.5" />
                    <span className="font-bold text-sm sm:text-base">
                      {rating}
                    </span>
                  </div>

                  {/* Favorite heart button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFavorite(movieForFavorites);
                    }}
                    className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                    aria-label={
                      isFavorite(movie.id)
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                  >
                    {isFavorite(movie.id) ? (
                      <FaHeart className="text-red-500 w-4 h-4" />
                    ) : (
                      <FaRegHeart className="text-white w-4 h-4" />
                    )}
                  </button>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UpcomingMoviesCarousel;