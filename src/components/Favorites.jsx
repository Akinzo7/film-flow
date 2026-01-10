import { useState, useEffect } from "react";
import { useFavorites } from "../contexts/FavoritesContext";
import MovieCard from "./Movie/MovieCard";

function Favorites() {
  const { favorites } = useFavorites();
  const [filter, setFilter] = useState("all"); // 'all', 'movie', 'tv'
  const [filteredFavorites, setFilteredFavorites] = useState([]);

  // Apply filter whenever favorites or filter changes
  useEffect(() => {
    if (!favorites || favorites.length === 0) {
      setFilteredFavorites([]);
      return;
    }

    switch (filter) {
      case "movie":
        // Filter for movies using the type property
        setFilteredFavorites(favorites.filter(item => item.type === 'movie'));
        break;
      case "tv":
        // Filter for TV shows using the type property
        setFilteredFavorites(favorites.filter(item => item.type === 'tv'));
        break;
      default:
        // Show all
        setFilteredFavorites([...favorites]);
    }
  }, [favorites, filter]);


  // Determine which list to display based on filter
  const displayList = filter === "all" ? favorites : filteredFavorites;
  const resultsCount = displayList.length || 0;

  // If no favorites, show empty state
  if (!favorites || favorites.length === 0) {
    return (
      <div className="w-full md:mx-auto md:max-w-[1300px] mt-10 px-2 px-4">
        <h1 className="text-4xl my-5 font-medium">My Favorites</h1>
        <div className="text-center py-20">
          <p className="text-2xl text-gray-400 mb-4">No favorites yet</p>
          <p className="text-gray-500">Add movies and TV shows to your favorites by clicking the heart icon!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:mx-auto md:max-w-[1300px] mt-10 px-2 px-4">
      {/* Title and count */}
      <p className="text-4xl my-5 font-medium">
        My Favorites{" "}
        <small className="text-2xl text-neutral-500">
          {resultsCount} {resultsCount === 1 ? 'item' : 'items'}
        </small>
      </p>
      
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === "all" 
              ? "bg-amber-500 text-gray-900" 
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("movie")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === "movie" 
              ? "bg-amber-500 text-gray-900" 
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          Movies
        </button>
        <button
          onClick={() => setFilter("tv")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === "tv" 
              ? "bg-amber-500 text-gray-900" 
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          TV Shows
        </button>
      </div>

      {/* Show which filter is active */}
      <h2 className="mt-2.5 mb-4">
        {filter === "all" && "Movies & TV Shows"}
        {filter === "movie" && "Movies"}
        {filter === "tv" && "TV Shows"}
      </h2>

      {/* Show filtered results */}
      {resultsCount > 0 ? (
        <div className="mt-6 grid movie_grid w-full overflow-hidden">
          {/* ✅ FIX: Map over displayList and pass each item individually */}
          {displayList.map((item) => (
            <MovieCard key={item.id} movie={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-400 mb-4">
            No {filter === "movie" ? "movies" : "TV shows"} in favorites
          </p>
          <p className="text-gray-500">
            Add some {filter === "movie" ? "movies" : "TV shows"} to your favorites!
          </p>
        </div>
      )}
    </div>
  );
}

export default Favorites;