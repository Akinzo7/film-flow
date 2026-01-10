import { IoStar } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavorites } from "../../contexts/FavoritesContext";

function MovieCard({ movie }) {  // Change from "movies" to "movie"
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!movie) return null;  // Check if movie is undefined

  const movieTitle = movie.title || movie.name || "Untitled";
  const year =
    movie.release_date?.split("-")[0] ||
    movie.first_air_date?.split("-")[0] ||
    "";
  const rating = movie.vote_average?.toFixed(1) || "N/A";
  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/poster.jpg";

  // Movie object for favorites
  const movieForFavorites = {
    id: movie.id,
    title: movie.title || movie.name,
    poster_path: movie.poster_path,
    release_date: movie.release_date || movie.first_air_date,
    vote_average: movie.vote_average,
  };

  return (
    <div className="md:w-[180px] w-[173px] max-[420px]:w-[155px] relative">
      {/* Movie card link */}
      <Link
        to={movie.type === 'tv' ? `/tv/${movie.id}` : `/movie/${movie.id}`}
        style={{ backgroundImage: `url('${posterPath}')` }}
        className="w-full aspect-[2/3] flex flex-col justify-between bg-cover bg-center bg-gray-800 rounded-sm p-1 cursor-pointer"
      >
        <div className="w-full mx-auto bg-gray-900 text-white text-[14px] text-center py-[0.3em] px-[0.6em] rounded-sm font-bold">
          {movieTitle} {year && `(${year})`}
        </div>
        <div className="flex justify-between items-start">
          <div className="flex items-center bg-gray-900 text-white gap-1 self-start p-1 rounded-sm">
            <IoStar className="text-yellow-500 w-4 h-4 mb-0.5" />
            <span className="font-bold text-sm sm:text-base">
              {rating}
            </span>
          </div>
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
}

export default MovieCard;