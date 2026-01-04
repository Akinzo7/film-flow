import { IoStar } from "react-icons/io5";
import { Link } from "react-router-dom";

function TVShowCard({ tvShow }) {
  const firstAirYear = tvShow.first_air_date
    ? new Date(tvShow.first_air_date).getFullYear()
    : "N/A";

  return (
    <Link to={`/tv/${tvShow.id}`} className="group">
      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        {/* TV Show Poster */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={
              tvShow.poster_path
                ? `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`
                : "/placeholder-poster.jpg"
            }
            alt={tvShow.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Rating Badge */}
          <div className="absolute top-2 right-2 bg-black/80 text-white px-2 py-1 rounded-full flex items-center gap-1 text-sm">
            <IoStar className="text-yellow-400" />
            {tvShow.vote_average?.toFixed(1)}
          </div>
          {/* TV Badge */}
          <div className="absolute top-2 left-2 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            TV
          </div>
        </div>

        {/* TV Show Info */}
        <div className="p-4">
          <h3 className="font-semibold text-white truncate group-hover:text-amber-400 transition-colors">
            {tvShow.name}
          </h3>
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-400 text-sm">{firstAirYear}</span>
            <div className="flex items-center gap-2">
              {tvShow.first_air_date && (
                <span className="text-gray-400 text-sm">
                  {tvShow.original_language?.toUpperCase()}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default TVShowCard;