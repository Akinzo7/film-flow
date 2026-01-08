// pages/MoviePage.jsx
import { useState, useEffect } from "react";
import Filters from "../components/Filters";
import MovieCard from "../components/Movie/MovieCard";
import { IoSearch } from "react-icons/io5";

// MoviePage.jsx - Updated version with better separation
function MoviePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [filters, setFilters] = useState({
    genres: [],
    minYear: 1900,
    maxYear: 2026,
    language: "",
    sortBy: "popularity.desc",
  });

  // Fetch movies with filters
  const fetchMovies = async (pageNum = 1) => {
    setLoading(true);
    try {
      let url;
      const params = new URLSearchParams({
        api_key: import.meta.env.VITE_TMDB_KEY,
        language: "en-US",
        page: pageNum,
        include_adult: false,
      });

      if (isSearchMode && searchQuery.trim() !== "") {
        // Search mode
        params.append("query", encodeURIComponent(searchQuery.trim()));
        url = `https://api.themoviedb.org/3/search/movie?${params}`;
      } else {
        // Filter mode
        params.append("sort_by", filters.sortBy);
        params.append("include_video", false);
        
        // Add genre filter
        if (filters.genres.length > 0) {
          params.append("with_genres", filters.genres.join(","));
        }

        // Add year range filter
        params.append("primary_release_date.gte", `${filters.minYear}-01-01`);
        params.append("primary_release_date.lte", `${filters.maxYear}-12-31`);

        // Add language filter
        if (filters.language) {
          params.append("with_original_language", filters.language);
        }

        url = `https://api.themoviedb.org/3/discover/movie?${params}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      setMovies(data.results || []);
      setTotalPages(data.total_pages || 1);
      setPage(pageNum);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchMovies();
  }, [isSearchMode, searchQuery, filters]); // Watch for mode changes

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      setIsSearchMode(true);
      setPage(1);
    } else {
      setIsSearchMode(false);
      setPage(1);
    }
    fetchMovies(1);
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setIsSearchMode(false); // Switch to filter mode
    setPage(1);
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      fetchMovies(newPage);
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setIsSearchMode(false);
    setPage(1);
  };

  // Update the input onChange to clear search mode when empty
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.trim() === "") {
      setIsSearchMode(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e17] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Movies</h1>
          <p className="text-gray-400">
            {isSearchMode ? `Search results for "${searchQuery}"` : "Discover and filter thousands of movies"}
          </p>
          {isSearchMode && (
            <button 
              onClick={clearSearch}
              className="mt-2 text-blue-400 hover:text-blue-300 text-sm"
            >
              ← Back to all movies
            </button>
          )}
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(e);
                }
              }}
              placeholder="Search movies by title..."
              className="w-full bg-gray-900 text-white p-4 pl-12 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
            />
            <IoSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
            >
              Search
            </button>
          </div>
        </form>

        {/* Only show filters when not in search mode */}
        {!isSearchMode && (
          <div className="mb-6">
            <Filters
              onFilterChange={handleFilterChange}
              mediaType="movie"
              showSortOptions={[
                { value: "popularity.desc", label: "Most Popular" },
                { value: "vote_average.desc", label: "Top Rated" },
                { value: "release_date.desc", label: "Newest Releases" },
                { value: "release_date.asc", label: "Oldest Releases" },
                { value: "revenue.desc", label: "Highest Revenue" },
                { value: "vote_count.desc", label: "Most Votes" },
              ]}
            />
          </div>
        )}

        {/* Results */}
        <div>
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-400">Loading movies...</p>
            </div>
          ) : movies.length > 0 ? (
            <>
              <div className="grid movie_grid w-full overflow-hidden">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8 gap-2">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-gray-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">
                {isSearchMode ? `No movies found for "${searchQuery}"` : "No movies found"}
              </p>
              <p className="text-gray-500 mt-2">
                {isSearchMode ? "Try a different search term" : "Try adjusting your filters"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
