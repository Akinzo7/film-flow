import { IoStar, IoAddOutline } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useFetch from "../../hooks/useFetch";
import { useParams, useLocation } from "react-router-dom";
import { useRef } from "react";
import { useFavorites } from "../../contexts/FavoritesContext";

function MovieInfo() {
  const { id } = useParams();
  const location = useLocation();
  const { isFavorite, toggleFavorite } = useFavorites();
  
  // Refs for scrolling
  const scrollContainerRef = useRef(null);
  const seasonsCarouselRef = useRef(null);
  
  // ✅ FIX: Determine media type from the URL path instead of guessing
  const isTVShow = location.pathname.startsWith('/tv/');
  
  // Build the correct URL based on media type
  const mediaUrl = id
    ? `https://api.themoviedb.org/3/${isTVShow ? 'tv' : 'movie'}/${id}?api_key=${
        import.meta.env.VITE_TMDB_KEY
      }&language=en-US`
    : null;

  // Fetch media data (movie or TV show)
  const { data: media, isLoading, isError } = useFetch(mediaUrl);
  
  // Fetch seasons data for TV shows
  const seasonsUrl = isTVShow && id
    ? `https://api.themoviedb.org/3/tv/${id}?api_key=${
        import.meta.env.VITE_TMDB_KEY
      }&language=en-US&append_to_response=seasons`
    : null;
    
  const { data: tvShowWithSeasons } = useFetch(seasonsUrl);
  const seasons = tvShowWithSeasons?.seasons || [];

  // Other URLs
  const creditsUrl = id
    ? `https://api.themoviedb.org/3/${isTVShow ? 'tv' : 'movie'}/${id}/credits?api_key=${
        import.meta.env.VITE_TMDB_KEY
      }&language=en-US`
    : null;
    
  const releaseUrl = id && !isTVShow
    ? `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${
        import.meta.env.VITE_TMDB_KEY
      }`
    : null;
    
  const similarUrl = id
    ? `https://api.themoviedb.org/3/${isTVShow ? 'tv' : 'movie'}/${id}/similar?api_key=${
        import.meta.env.VITE_TMDB_KEY
      }&language=en-US&page=1`
    : null;
    
  const videosUrl = id
    ? `https://api.themoviedb.org/3/${isTVShow ? 'tv' : 'movie'}/${id}/videos?api_key=${
        import.meta.env.VITE_TMDB_KEY
      }&language=en-US`
    : null;

  const { data: videosData } = useFetch(videosUrl);
  const trailers =
    videosData?.results
      ?.filter((video) => video.site === "YouTube" && video.type === "Trailer")
      .slice(0, 3) || [];

  const { data: similarData, isLoading: similarLoading } = useFetch(similarUrl);
  const similarItems = similarData?.results || [];
  
  const { data: releaseData } = useFetch(releaseUrl);
  const { data: credits, isLoading: creditsLoading } = useFetch(creditsUrl);
  
  const directors = credits?.crew?.filter(
    (person) => person.job === "Director"
  );
  const directorNames = directors?.map((d) => d.name).join(", ") || "Unknown";
  const topCast = credits?.cast?.slice(0, 6) || [];
  
  const usReleases = releaseData?.results?.find((r) => r.iso_3166_1 === "US");
  const usCertification = usReleases?.release_dates?.[0]?.certification || "";
  
  // Scroll functions for main similar items
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

  // Scroll functions for seasons carousel
  const scrollSeasonsLeft = () => {
    if (seasonsCarouselRef.current) {
      seasonsCarouselRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollSeasonsRight = () => {
    if (seasonsCarouselRef.current) {
      seasonsCarouselRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  // Media object for favorites
  const mediaForFavorites = media ? {
    id: media.id,
    title: isTVShow ? media.name : media.title,
    poster_path: media.poster_path,
    release_date: isTVShow ? media.first_air_date : media.release_date,
    first_air_date: isTVShow ? media.first_air_date : null,
    vote_average: media.vote_average,
    type: isTVShow ? 'tv' : 'movie', // ✅ Add explicit type
  } : null;

  if (isLoading)
    return <div className="text-center py-20">Loading...</div>;
  if (isError)
    return <div className="text-center py-20">Error loading {isTVShow ? 'TV show' : 'movie'}</div>;
  if (!media) return <div className="text-center py-20">{isTVShow ? 'TV show' : 'Movie'} not found</div>;
  
  // Filter out season 0 (specials) and get only regular seasons
  const regularSeasons = seasons.filter(season => season.season_number > 0);
  
  return (
    <>
      <div
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original${media.backdrop_path}')`,
        }}
        className="relative bg-cover bg-center min-h-[300px] max-h-[400px] md:min-h-[600px] md:max-h-[800px] bg-no-repeat "
      >
        <div className="absolute w-full h-full md:flex items-end gap-8 md:px-16 bg-linear-1 from-[#101828] from-10% to-[rgba(0,0,0,0.21)] to-93% md:pb-20">
          <div className="hidden md:block w-57 h-auto shadow-lg">
            <img
              src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
              alt={isTVShow ? media.name : media.title}
            />
          </div>
          <div className="md:flex hidden flex-col gap-2 md:justify-end text-[#cfdce7]">
            <h1 className="text-4xl font-semibold">{isTVShow ? media.name : media.title}</h1>
            <p>Directed by {directorNames}</p>
            <div className="flex gap-1 items-end flex-wrap">
              {media.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="py-1 px-2 rounded-sm font-bold text-[#bed0de] bg-[#35436799]"
                >
                  {genre.name}
                </span>
              ))}
              <span>
                {!isTVShow && usCertification?.length > 0 ? `${usCertification}, ` : ""}
                {isTVShow ? media.first_air_date?.split("-")[0] : media.release_date?.split("-")[0]} |{" "}
                {isTVShow 
                  ? `${media.number_of_seasons} season${media.number_of_seasons !== 1 ? 's' : ''}`
                  : `${Math.floor(media.runtime / 60)}h ${media.runtime % 60}m`
                }
              </span>
            </div>
            <div className="mt-1 max-w-[500px]">
              <div>{media.overview}</div>
            </div>
            <div>
              <div>
                Country:{" "}
                {media.production_countries?.map((c) => c.name).join(", ") ||
                  "Unknown"}
              </div>
              
              <div className="flex gap-2 items-center mt-2">
                <span className="flex gap-1 items-center text-[1rem]">
                  <img src="/tmdb.png" alt="tmdb" className="w-8" />
                  <IoStar className="text-yellow-400" /> {media.vote_average?.toFixed(1)}
                </span>
              </div>
            </div>
            <button 
              onClick={() => mediaForFavorites && toggleFavorite(mediaForFavorites)}
              className="mt-4 bg-transparent border-[#354367] border text-white py-2 px-4 rounded-md hover:border-[#7785aa] hover:bg-[#35436799] transition duration-300"
            >
              <IoAddOutline className="inline mr-2" /> 
              {isFavorite(media?.id) ? 'Remove from favorites' : 'Add to favorites'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile view */}
      <div className="md:hidden flex flex-col gap-2 md:justify-end text-[#cfdce7] px-8 ">
        <h1 className="text-4xl font-semibold">{isTVShow ? media.name : media.title}</h1>
        <p>Directed by {directorNames}</p>
        <div className="flex gap-1 items-end flex-wrap">
          {media.genres?.map((genre) => (
            <span
              key={genre.id}
              className="py-1 px-2 rounded-sm font-bold text-[#bed0de] bg-[#35436799]"
            >
              {genre.name}
            </span>
          ))}
          <span>
            {!isTVShow && usCertification?.length > 0 ? `${usCertification}, ` : ""}
            {isTVShow ? media.first_air_date?.split("-")[0] : media.release_date?.split("-")[0]} |{" "}
            {isTVShow 
              ? `${media.number_of_seasons} season${media.number_of_seasons !== 1 ? 's' : ''}`
              : `${Math.floor(media.runtime / 60)}h ${media.runtime % 60}m`
            }
          </span>
        </div>
        <div className="mt-1 max-w-[500px]">
          <div>{media.overview}</div>
        </div>
        <div>
          <div>
            Country:{" "}
            {media.production_countries?.map((c) => c.name).join(", ") ||
              "Unknown"}
          </div>
          
          <div className="flex gap-2 items-center mt-2">
            <span className="flex gap-1 items-center text-[1rem]">
              <img src="/tmdb.png" alt="tmdb" className="w-8" />
              <IoStar className="text-yellow-400" /> {media.vote_average?.toFixed(1)}
            </span>
          </div>
        </div>
        <button 
          onClick={() => mediaForFavorites && toggleFavorite(mediaForFavorites)}
          className="mt-4 bg-transparent border-[#354367] border text-white py-2 px-4 rounded-md hover:border-[#7785aa] hover:bg-[#35436799] transition duration-300"
        >
          <IoAddOutline className="inline mr-2" /> 
          {isFavorite(media?.id) ? 'Remove from favorites' : 'Add to favorites'}
        </button>
      </div>
      
      {/* TV Show Seasons Section - ONLY SHOWS FOR TV SHOWS */}
      {isTVShow && regularSeasons.length > 0 && (
        <div className="md:px-16 px-4 pb-20">
          <h2 className="text-2xl font-bold mt-6 mb-6">Seasons</h2>
          
          <div className="relative">
            {/* Show arrows if there are seasons */}
            {regularSeasons.length > 0 && (
              <>
                <button
                  onClick={scrollSeasonsLeft}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 bg-[#233257] hover:bg-[#41527c] p-2 rounded-full cursor-pointer"
                >
                  <FaChevronLeft className="text-white w-6 h-6" />
                </button>
                <button
                  onClick={scrollSeasonsRight}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 bg-[#233257] hover:bg-[#41527c] p-2 rounded-full cursor-pointer"
                >
                  <FaChevronRight className="text-white w-6 h-6" />
                </button>
              </>
            )}
            
            {/* ONE CAROUSEL CONTAINER FOR ALL SEASONS */}
            <div
              ref={seasonsCarouselRef}
              className="flex gap-4 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {regularSeasons.map((season) => (
                <div key={season.id} className="flex-shrink-0 w-[180px]">
                  <div
                    style={{
                      backgroundImage: `url(${
                        season.poster_path
                          ? `https://image.tmdb.org/t/p/w500${season.poster_path}`
                          : "/background.jpg"
                      })`,
                    }}
                    className="w-full aspect-[2/3] bg-cover bg-center bg-gray-800 rounded-sm p-1 cursor-pointer flex flex-col justify-between"
                  >
                    <div className="w-full mx-auto bg-gray-900 text-white text-[14px] text-center py-[0.3em] px-[0.6em] rounded-sm font-bold">
                      Season {season.season_number}
                    </div>
                    <div className="flex items-center bg-gray-900 text-white gap-1 self-start p-1 rounded-sm">
                      <span className="font-bold text-sm">
                        {season.episode_count} Ep
                      </span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-semibold truncate">{season.name}</p>
                    <p className="text-xs text-gray-400">
                      {season.episode_count} Episode{season.episode_count !== 1 ? 's' : ''}
                      {season.air_date && ` • ${season.air_date.split("-")[0]}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Top Billed Cast */}
      <div className="md:px-16 px-4 pb-20">
        <h2 className="text-2xl font-bold mt-6 mb-4">Top Billed Cast</h2>
        {creditsLoading ? (
          <p className="text-gray-400">Loading cast...</p>
        ) : topCast.length > 0 ? (
          <div className="flex flex-wrap md:justify-start justify-center gap-4">
            {topCast.map((actor) => (
              <div key={actor.id} className="md:w-[173px] w-[150px]">
                <div
                  style={{
                    backgroundImage: `url(${
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                        : "/poster.jpg"
                    })`,
                  }}
                  className="w-full h-[260px] bg-cover bg-center bg-gray-800 rounded-sm p-1 cursor-pointer relative"
                >
                  <div className="absolute left-0.5 bottom-0.5 right-0.5 bg-gray-900 text-white text-[14px] text-center py-[0.3em] rounded-sm font-bold">
                    {actor.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No cast information available.</p>
        )}
      </div>
      
      {/* Trailers */}
      <div className="md:px-16 px-4 pb-20">
        <h2 className="text-2xl font-bold mt-6 mb-6">Watch {isTVShow ? media.name : media.title} Trailers</h2>
        {trailers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trailers.map((trailer) => (
              <div
                key={trailer.id}
                className="relative w-full aspect-video rounded-lg overflow-hidden bg-black shadow-lg"
              >
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title={trailer.name}
                  className="absolute top-0 left-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No trailers available.</p>
        )}
      </div>
      
      {/* Similar Items */}
      <div className="md:px-16 px-4 pb-20">
        <h2 className="text-2xl font-bold mt-6 mb-4">
          Similar {isTVShow ? 'TV Shows' : 'Movies'}
        </h2>
        {similarLoading && (
          <p className="text-white">Loading similar {isTVShow ? 'TV shows' : 'movies'}...</p>
        )}
        {!similarLoading && similarItems.length > 0 ? (
          <div className="relative">
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 bg-[#233257] hover:bg-[#41527c] p-2 rounded-full cursor-pointer"
            >
              <FaChevronLeft className="text-white w-6 h-6" />
            </button>
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 bg-[#233257] hover:bg-[#41527c] p-2 rounded-full cursor-pointer"
            >
              <FaChevronRight className="text-white w-6 h-6" />
            </button>
            <div
              ref={scrollContainerRef}
              className="flex gap-4 w-full snap-x overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {similarItems.map((item) => (
                <div key={item.id} className="md:w-[180px] w-[173px] max-[420px]:w-[155px] flex-shrink-0">
                  <div
                    style={{
                      backgroundImage: `url(${
                        item.poster_path
                          ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                          : "/background.jpg"
                      })`,
                    }}
                    className="w-full h-60 md:h-[260px] bg-cover bg-center bg-gray-800 rounded-sm p-1 cursor-pointer flex flex-col justify-between"
                  >
                    <div className="w-full mx-auto bg-gray-900 text-white text-[14px] text-center py-[0.3em] px-[0.6em] rounded-sm font-bold">
                      {isTVShow ? item.name : item.title}{" "}
                      {(isTVShow ? item.first_air_date : item.release_date)?.split("-")[0]}
                    </div>
                    <div className="flex items-center bg-gray-900 text-white gap-1 self-start p-1 rounded-sm">
                      <IoStar className="text-yellow-500 w-4 h-4 mb-0.5" />
                      <span className="font-bold text-sm sm:text-base">
                        {item.vote_average?.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-400">No similar {isTVShow ? 'TV shows' : 'movies'} found.</p>
        )}
      </div>
    </>
  );
}

export default MovieInfo;