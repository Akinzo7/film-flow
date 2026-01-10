import { useState, useEffect } from "react";
import MovieResults from "../components/Movie/MovieResults";
import useFetch from "../hooks/useFetch";
import HeroSection from "../components/HeroSection";
import PopularMoviesCarousel from "../components/PopularMoviesCarousel";
import PopularTVCarousel from "../components/PopularTVCarousel";
import UpcomingMoviesCarousel from "../components/UpcomingMoviesCarousel";
import FreeToWatchCarousel from "../components/FreeToWatchCarousel";
import AiringTodayTVCarousel from "../components/AiringTodayTVCarousel";
import ExpandedSection from "../components/ExpandedSection";
import { useLocation } from "react-router-dom";
function HomePage({ searchQuery }) {
   const location = useLocation();
 const effectiveSearchQuery = location.state?.searchQuery || searchQuery;

  const url = effectiveSearchQuery
    ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        effectiveSearchQuery
      )}&api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false`
    : null;

  // URLs for sections
  const nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${
    import.meta.env.VITE_TMDB_KEY
  }&page=1`;
  const popularMoviesWeekUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${
    import.meta.env.VITE_TMDB_KEY
  }`;
  const popularTVWeekUrl = `https://api.themoviedb.org/3/trending/tv/week?api_key=${
    import.meta.env.VITE_TMDB_KEY
  }`;
  const upcomingMoviesUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${
    import.meta.env.VITE_TMDB_KEY
  }&page=1`;
  const freeToWatchUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${
    import.meta.env.VITE_TMDB_KEY
  }&with_watch_monetization_types=free&page=1`;
  const airingTodayUrl = `https://api.themoviedb.org/3/tv/airing_today?api_key=${
    import.meta.env.VITE_TMDB_KEY
  }&page=1`;

  // State to track expanded view
  const [expandedMovies, setExpandedMovies] = useState([]);
  const [expandedTitle, setExpandedTitle] = useState("");

  // Fetch data
  const { data: movies, isLoading, isError } = useFetch(url);
  const { data: nowPlayingData } = useFetch(nowPlayingUrl);
  const { data: popularMoviesWeekData } = useFetch(popularMoviesWeekUrl);
  const { data: popularTVWeekData } = useFetch(popularTVWeekUrl);
  const { data: upcomingMoviesData } = useFetch(upcomingMoviesUrl);
  const { data: freeToWatchData } = useFetch(freeToWatchUrl);
  const { data: airingTodayData } = useFetch(airingTodayUrl);

  // Use navigation state if available, otherwise use prop
  

  // Check if user is searching
  const isSearching =
    effectiveSearchQuery && effectiveSearchQuery.trim() !== "";
  // Handle View All click
  const handleViewAll = (movies, title) => {
    setExpandedMovies(movies);
    setExpandedTitle(title);
  };

  // Handle back from expanded view
  const handleBack = () => {
    setExpandedMovies([]);
    setExpandedTitle("");
  };

  // If expanded view is active
  if (expandedMovies.length > 0) {
    return (
      <ExpandedSection
        movies={expandedMovies}
        title={expandedTitle}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="w-full">
      {/* If user is searching - ONLY show search results */}
      {isSearching ? (
        <MovieResults
          movies={movies}
          isLoading={isLoading}
          isError={isError}
          searchQuery={effectiveSearchQuery}
        />
      ) : (
        /* If user is NOT searching - show homepage with sections */
        <>
          {/* 1. Hero Slider */}
          {nowPlayingData?.results && (
            <HeroSection movies={nowPlayingData.results.slice(0, 5)} />
          )}

          {/* 2. Top 10 Popular Movies of the Week Carousel */}
          {popularMoviesWeekData?.results && (
            <div className="px-4 md:px-8 mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[clamp(1.125rem, 2vw, 1.75rem)] font-bold">
                  Top 10 Popular Movies This Week
                </h2>
                <button
                  onClick={() =>
                    handleViewAll(
                      popularMoviesWeekData.results,
                      "Popular Movies This Week"
                    )
                  }
                  className="text-amber-500 hover:text-amber-400 text-sm font-medium"
                >
                  View All →
                </button>
              </div>
              <PopularMoviesCarousel
                movies={popularMoviesWeekData.results.slice(0, 10)}
              />
            </div>
          )}

          {/* 3. Top 10 Popular TV Shows of the Week Carousel */}
          {popularTVWeekData?.results && (
            <div className="px-4 md:px-8 mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[clamp(1.125rem, 2vw, 1.75rem)] font-bold">
                  Top 10 Popular TV Shows This Week
                </h2>
                <button
                  onClick={() =>
                    handleViewAll(
                      popularTVWeekData.results,
                      "Popular TV Shows This Week"
                    )
                  }
                  className="text-amber-500 hover:text-amber-400 text-sm font-medium"
                >
                  View All →
                </button>
              </div>
              <PopularTVCarousel
                tvShows={popularTVWeekData.results.slice(0, 10)}
              />
            </div>
          )}

          {/* 4. Airing Today TV Shows Carousel */}
          {airingTodayData?.results && (
            <div className="px-4 md:px-8 mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[clamp(1.125rem, 2vw, 1.75rem)] font-bold">
                  TV Shows Airing Today
                </h2>
                <button
                  onClick={() =>
                    handleViewAll(
                      airingTodayData.results,
                      "TV Shows Airing Today"
                    )
                  }
                  className="text-amber-500 hover:text-amber-400 text-sm font-medium"
                >
                  View All →
                </button>
              </div>
              <AiringTodayTVCarousel
                tvShows={airingTodayData.results.slice(0, 10)}
              />
            </div>
          )}

          {/* 5. Upcoming Movies Carousel */}
          {upcomingMoviesData?.results && (
            <div className="px-4 md:px-8 mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[clamp(1.125rem, 2vw, 1.75rem)] font-bold">
                  Upcoming Movies
                </h2>
                <button
                  onClick={() =>
                    handleViewAll(upcomingMoviesData.results, "Upcoming Movies")
                  }
                  className="text-amber-500 hover:text-amber-400 text-sm font-medium"
                >
                  View All →
                </button>
              </div>
              <UpcomingMoviesCarousel
                movies={upcomingMoviesData.results.slice(0, 10)}
              />
            </div>
          )}

          {/* 6. Free to Watch Carousel */}
          {freeToWatchData?.results && (
            <div className="px-4 md:px-8 mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[clamp(1.125rem, 2vw, 1.75rem)] font-bold">
                  Free Movies to Watch
                </h2>
                <button
                  onClick={() =>
                    handleViewAll(
                      freeToWatchData.results,
                      "Free Movies to Watch"
                    )
                  }
                  className="text-amber-500 hover:text-amber-400 text-sm font-medium"
                >
                  View All →
                </button>
              </div>
              <FreeToWatchCarousel
                movies={freeToWatchData.results.slice(0, 10)}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default HomePage;
