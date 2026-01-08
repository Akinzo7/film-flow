import { IoStar } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavorites } from "../contexts/FavoritesContext";
import { useState, useEffect } from "react";

function TVShowCard({ tvShow }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [seasonCount, setSeasonCount] = useState(null);
  const [loading, setLoading] = useState(true);

  // Extract TV show information
  const tvShowTitle = tvShow.name || "Untitled";
  const year = tvShow.first_air_date?.split("-")[0] || "";
  const rating = tvShow.vote_average?.toFixed(1) || "N/A";
  const posterPath = tvShow.poster_path
    ? `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`
    : "/poster.jpg";

  // Fetch season count for this specific TV show
  useEffect(() => {
    const fetchSeasonCount = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${tvShow.id}?api_key=${
            import.meta.env.VITE_TMDB_KEY
          }&language=en-US`
        );
        const data = await response.json();
        setSeasonCount(data.number_of_seasons);
      } catch (error) {
        console.error("Error fetching season count:", error);
        setSeasonCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchSeasonCount();
  }, [tvShow.id]);

  // TV show object for favorites
  const tvShowForFavorites = {
    id: tvShow.id,
    title: tvShow.name,
    name: tvShow.name,
    poster_path: tvShow.poster_path,
    release_date: tvShow.first_air_date,
    first_air_date: tvShow.first_air_date,
    vote_average: tvShow.vote_average,
    type: "tv",
  };

  return (
    <div className="md:w-[180px] w-[173px] max-[420px]:w-[155px]">
      {/* TV Show card link - matching MovieInfo.jsx seasons style */}
      <Link
        to={`/tv/${tvShow.id}`}
        style={{ backgroundImage: `url('${posterPath}')` }}
        className="block w-full aspect-[2/3] bg-cover bg-center bg-gray-800 rounded-sm p-1 cursor-pointer flex flex-col justify-between"
      >
        {/* Title and year banner at top */}
        <div className="w-full mx-auto bg-gray-900 text-white text-[14px] text-center py-[0.3em] px-[0.6em] rounded-sm font-bold">
          {tvShowTitle} {year && `(${year})`}
        </div>

        {/* Rating and favorite button at bottom */}
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

      {/* Season information below the card - matching MovieInfo.jsx style */}
      <div className="mt-2">
        <p className="text-sm font-semibold text-white truncate">
          {tvShowTitle}
        </p>
        <p className="text-xs text-gray-400">
          {loading ? (
            // Show loading state while fetching season count
            <span className="animate-pulse">Loading...</span>
          ) : seasonCount !== null && seasonCount > 0 ? (
            // Show season count when available
            <>
              {seasonCount} Season{seasonCount !== 1 ? 's' : ''}
              {year && ` • ${year}`}
            </>
          ) : (
            // Fallback to just showing the year if no season data
            year && year
          )}
        </p>
      </div>
    </div>
  );
}

export default TVShowCard;