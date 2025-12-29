import { IoStar } from "react-icons/io5";

function MovieCard({ movies }) {
  if (movies === null) return;

  return (
    <>
      {movies.map((movie) => {
        const movieTitle = movie.title || movie.name || "Untitled";
        const year = movie.release_date?.split('-')[0] || movie.first_air_date?.split('-')[0] || "";
        const rating = movie.vote_average?.toFixed(1) || "N/A";
        const posterPath = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "/poster.jpg"; 
        
        return (
          <div className="md:w-[180px] w-[173px]  max-[420px]:w-[155px]"  key ={movie.id}>
            <a
             style={{ backgroundImage: `url('${posterPath}')` }}
              className="w-full aspect-[2/3] flex flex-col justify-between bg-cover bg-center bg-gray-800 rounded-sm p-1 cursor-pointer"
            >
              <div className="w-full mx-auto bg-gray-900 text-white text-[14px] text-center py-[0.3em] px-[0.6em] rounded-sm font-bold ">
                {movieTitle} {year && `(${year})`}
              </div>

              <div className="flex items-center bg-gray-900 text-white gap-1 self-start p-1  rounded-sm">
                <IoStar className="text-yellow-500 w-4 h-4 mb-0.5" />
                <span className="font-bold text-sm sm:text-base">{rating}</span>
              </div>
            </a>
          </div>
        );
      })}
    </>
  );
}
export default MovieCard;
