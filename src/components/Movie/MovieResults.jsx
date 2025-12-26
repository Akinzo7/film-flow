import MovieCard from "./MovieCard";

function MovieResults() {
  return (
    <div className="w-full md:mx-auto md:max-w-[1200px] mt-10 px-2 px-4">
      <p className="text-4xl my-5 font-medium">Search results for Guardians of the Galaxy <small className="text-2xl text-neutral-500">7 results found</small></p>
      <h2 className="mt-2.5">Movies</h2>
      <div className="mt-6 grid movie_grid w-full overflow-hidden">
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </div>
    </div>
  );
}
export default MovieResults;
