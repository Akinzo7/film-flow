import { IoStar,IoAddOutline } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import { useFavorites } from "../../contexts/FavoritesContext";

function MovieInfo() {
  const { id } = useParams(); // Gets the :id from URL
  const { isFavorite, toggleFavorite } = useFavorites();
  console.log("Movie ID:", id);
  const movieUrl = id
    ? `https://api.themoviedb.org/3/movie/${id}?api_key=${
        import.meta.env.VITE_TMDB_KEY
      }&language=en-US`
    : null;
  const creditsUrl = id
    ? `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${
        import.meta.env.VITE_TMDB_KEY
      }&language=en-US`
    : null;
  const releaseUrl = id
    ? `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${
        import.meta.env.VITE_TMDB_KEY
      }`
    : null;
  const similarUrl = id
    ? `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${
        import.meta.env.VITE_TMDB_KEY
      }&language=en-US&page=1`
    : null;
  const videosUrl = id
    ? `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${
        import.meta.env.VITE_TMDB_KEY
      }&language=en-US`
    : null;

  const { data: videosData } = useFetch(videosUrl);
  const trailers =
    videosData?.results
      ?.filter((video) => video.site === "YouTube" && video.type === "Trailer")
      .slice(0, 3) || [];

  const { data: similarData, isLoading: similarLoading } = useFetch(similarUrl);
  const similarMovies = similarData?.results || [];
  const { data: releaseData } = useFetch(releaseUrl);
  const { data: movie, isLoading, isError } = useFetch(movieUrl);
  const { data: credits, isLoading: creditsLoading } = useFetch(creditsUrl);
  const directors = credits?.crew?.filter(
    (person) => person.job === "Director"
  );
  const directorNames = directors?.map((d) => d.name).join(", ") || "Unknown";
  const topCast = credits?.cast?.slice(0, 5) || [];
  const usReleases = releaseData?.results?.find((r) => r.iso_3166_1 === "US");
  const usCertification = usReleases?.release_dates?.[0]?.certification || "";
  const scrollContainerRef = useRef(null);
  // Function to scroll left
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300, 
        behavior: "smooth",
      });
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300, 
        behavior: "smooth",
      });
    }
  };

  // Movie object for favorites
    const movieForFavorites = movie ? {
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average
  } : null;

  if (isLoading)
    return <div className="text-center py-20">Loading movie...</div>;
  if (isError)
    return <div className="text-center py-20">Error loading movie</div>;
  if (!movie) return <div className="text-center py-20">Movie not found</div>;
  return (
    <>
      {" "}
      <div
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
        }}
        className="relative bg-cover bg-center min-h-[300px] max-h-[400px] md:min-h-[600px] md:max-h-[800px] bg-no-repeat "
      >
        <div className="absolute w-full h-full md:flex items-end gap-8 md:px-16 bg-linear-1 from-[#101828] from-10% to-[rgba(0,0,0,0.21)] to-57% md:pb-20">
          <div className="hidden md:block w-57 h-auto shadow-lg">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
          <div className="md:flex hidden flex-col gap-2 md:justify-end text-[#cfdce7]">
            <h1 className="text-4xl font-semibold">{movie.title}</h1>
            <p>Directed by {directorNames}</p>
            <div className="flex gap-1 items-end flex-wrap">
              {movie.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="py-1 px-2 rounded-sm  font-bold text-[#bed0de] bg-[#35436799]"
                >
                  {genre.name}
                </span>
              ))}
              <span>
                {usCertification?.length > 0 ? `${usCertification}, ` : ""}{movie.release_date?.split("-")[0]} |{" "}
                {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
              </span>
            </div>
            <div className="mt-1 max-w-[500px]">
              <div>{movie.overview}</div>
            </div>
            <div>
              <div>
                Country:{" "}
                {movie.production_countries?.map((c) => c.name).join(", ") ||
                  "Unknown"}
              </div>
              <div className="flex gap-2 items-center">
                <span className="flex gap-1 items-center text-[1rem]">
                  <img src="/tmdb.png" alt="tmdb" className="w-8" />
                  <IoStar className="text-yellow-400" /> {movie.vote_average?.toFixed(1)}
                </span>
              </div>
            </div>
             <button 
    onClick={() => movieForFavorites && toggleFavorite(movieForFavorites)}
    className="mt-4 bg-transparent border-[#354367] border text-white py-2 px-4 rounded-md hover:border-[#7785aa] hover:bg-[#35436799] transition duration-300"
  >
    <IoAddOutline className="inline mr-2" /> 
    {isFavorite(movie?.id) ? 'Remove from favorites' : 'Add to favorites'}
  </button>
          </div>
        </div>
      </div>
       <div className="md:hidden flex flex-col gap-2 md:justify-end text-[#cfdce7] px-8 ">
            <h1 className="text-4xl font-semibold">{movie.title}</h1>
            <p>Directed by {directorNames}</p>
            <div className="flex gap-1 items-end flex-wrap">
              {movie.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="py-1 px-2 rounded-sm  font-bold text-[#bed0de] bg-[#35436799]"
                >
                  {genre.name}
                </span>
              ))}
              <span>
                {usCertification?.length > 0 ? `${usCertification}, ` : ""}{movie.release_date?.split("-")[0]} |{" "}
                {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
              </span>
            </div>
            <div className="mt-1 max-w-[500px]">
              <div>{movie.overview}</div>
            </div>
            <div>
              <div>
                Country:{" "}
                {movie.production_countries?.map((c) => c.name).join(", ") ||
                  "Unknown"}
              </div>
              <div className="flex gap-2 items-center">
                <span className="flex gap-1 items-center text-[1rem]">
                  <img src="/tmdb.png" alt="tmdb" className="w-8" />
                  <IoStar className="text-yellow-400" /> {movie.vote_average?.toFixed(1)}
                </span>
              </div>
            </div>
             <button 
    onClick={() => movieForFavorites && toggleFavorite(movieForFavorites)}
    className="mt-4 bg-transparent border-[#354367] border text-white py-2 px-4 rounded-md hover:border-[#7785aa] hover:bg-[#35436799] transition duration-300"
  >
    <IoAddOutline className="inline mr-2" /> 
    {isFavorite(movie?.id) ? 'Remove from favorites' : 'Add to favorites'}
  </button>
          </div>
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
                  className="w-full h-[260px]  bg-cover bg-center bg-gray-800 rounded-sm p-1 cursor-pointer relative"
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
      <div className="md:px-16 px-4 pb-20">
        <h2 className="text-2xl font-bold mt-6 mb-6">Watch {movie.title} Trailers</h2>

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
          <p className="text-gray-400">No trailers available for this movie.</p>
        )}
      </div>
      <div className="md:px-16 px-4 pb-20">
        {/* Similar Movies */}
        <h2 className="text-2xl font-bold mt-6 mb-4">Similar Movies</h2>
        {similarLoading && (
          <p className="text-white">Loading similar movies...</p>
        )}
        {!similarLoading && similarMovies.length > 0 ? (
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
              {similarMovies.map((similarMovie) => (
                <div key={similarMovie.id} className="md:w-[180px] w-[173px] max-[420px]:w-[155px]   flex-shrink-0">
                  <div
                    style={{
                      backgroundImage: `url(${
                        similarMovie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${similarMovie.poster_path}`
                          : "/background.jpg"
                      })`,
                    }}
                    className="w-full h-60 md:h-[260px] bg-cover bg-center bg-gray-800 rounded-sm p-1 cursor-pointer flex flex-col justify-between"
                  >
                    <div className="w-full mx-auto bg-gray-900 text-white text-[14px] text-center py-[0.3em] px-[0.6em] rounded-sm font-bold">
                      {similarMovie.title}{" "}
                      {similarMovie.release_date?.split("-")[0]}
                    </div>

                    <div className="flex items-center bg-gray-900 text-white gap-1 self-start p-1 rounded-sm">
                      <IoStar className="text-yellow-500 w-4 h-4 mb-0.5" />
                      <span className="font-bold text-sm sm:text-base">
                        {similarMovie.vote_average?.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-400">No similar movies found.</p>
        )}
      </div>
    </>
  );
}

export default MovieInfo;
