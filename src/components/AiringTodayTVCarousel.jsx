import { useRef } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoStar } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavorites } from "../contexts/FavoritesContext";

function AiringTodayTVCarousel({ tvShows }) {
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

  // If no TV shows, don't render
  if (!tvShows || tvShows.length === 0) return null;

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
        {tvShows.map((tvShow) => {
          const tvShowTitle = tvShow.name || "Untitled";
          const year = tvShow.first_air_date?.split("-")[0] || "";
          const rating = tvShow.vote_average?.toFixed(1) || "N/A";
          const posterPath = tvShow.poster_path
            ? `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`
            : "/poster.jpg";

          // TV show object for favorites
          const tvShowForFavorites = {
            id: tvShow.id,
            title: tvShow.name, // TV shows use 'name'
            name: tvShow.name, // Keep 'name' for identification
            poster_path: tvShow.poster_path,
            release_date: tvShow.first_air_date, // Keep for compatibility
            first_air_date: tvShow.first_air_date,
            vote_average: tvShow.vote_average,
            type: "tv", // ← ADD THIS! Critical for favorites filtering
          };

          return (
            <div
              key={tvShow.id}
              className="flex-shrink-0 w-[150px] sm:w-[180px] relative pt-2"
            >
              {/* TV show card link */}
              <Link
                to={`/movie/${tvShow.id}`}
                style={{ backgroundImage: `url('${posterPath}')` }}
                className="w-full aspect-[2/3] flex flex-col justify-between bg-cover bg-center bg-gray-800 rounded-sm p-1 cursor-pointer"
              >
                {/* TV show name and year banner */}
                <div className="w-full mx-auto bg-gray-900 text-white text-[14px] text-center py-[0.3em] px-[0.6em] rounded-sm font-bold">
                  {tvShowTitle} {year && `(${year})`}
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
                      toggleFavorite(tvShowForFavorites);
                    }}
                    className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                    aria-label={
                      isFavorite(tvShow.id)
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                  >
                    {isFavorite(tvShow.id) ? (
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

export default AiringTodayTVCarousel;
