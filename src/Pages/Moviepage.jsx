// pages/MoviePage.jsx
import { useState, useEffect } from "react";
import Filters from "../components/Filters";
import MovieCard from "../components/Movie/MovieCard";
import { IoSearch } from "react-icons/io5";

function MoviePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    genres: [],
    year: "",
    language: "",
    sortBy: "popularity.desc"
  });

  // Fetch movies with filters
  const fetchMovies = async (filtersToUse = filters, pageNum = 1) => {
    setLoading(true);
    try {
      // Build query parameters
      const params = new URLSearchParams({
        api_key: import.meta.env.VITE_TMDB_KEY,
        language: "en-US",
        page: pageNum,
        sort_by: filtersToUse.sortBy,
        include_adult: false,
        include_video: false,
      });

      // Add genre filter
      if (filtersToUse.genres.length > 0) {
        params.append("with_genres", filtersToUse.genres.join(","));
      }

      // Add year filter (for movies)
      if (filtersToUse.year) {
        params.append("primary_release_year", filtersToUse.year);
      }

      // Add language filter
      if (filtersToUse.language) {
        params.append("with_original_language", filtersToUse.language);
      }

      // Determine API endpoint
      let url;
      if (searchQuery) {
        // Search endpoint
        url = `https://api.themoviedb.org/3/search/movie?${params}&query=${encodeURIComponent(searchQuery)}`;
      } else {
        // Discover endpoint with filters
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
  }, []);

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    fetchMovies(newFilters, 1);
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(filters, 1);
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchMovies(filters, newPage);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e17] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Movies</h1>
          <p className="text-gray-400">Discover and filter thousands of movies</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

        {/* Filters */}
        <div className="mb-8">
          <Filters 
            onFilterChange={handleFilterChange} 
            mediaType="movie" 
            showSortOptions={[
              { value: "popularity.desc", label: "Most Popular" },
              { value: "vote_average.desc", label: "Top Rated" },
              { value: "release_date.desc", label: "Newest Releases" },
              { value: "release_date.asc", label: "Oldest Releases" },
              { value: "revenue.desc", label: "Highest Revenue" },
              { value: "vote_count.desc", label: "Most Votes" }
            ]}
          />
        </div>

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
              <p className="text-gray-400 text-xl">No movies found</p>
              <p className="text-gray-500 mt-2">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MoviePage;