import MovieCard from "./MovieCard";

function MovieResults({ movies, isLoading, isError, searchQuery }) {
  if (isLoading) return <p className="mt-10">Loading...</p>;

  if (isError) return <p className="mt-10">Error loading movies </p>;
  if (!movies) return null;

  if (movies.results && movies.results.length === 0) {
    return <p className="mt-10">No movies found</p>;
  }
  if (!movies.results) return null;
  const resultsCount = movies.results.length || 0;

  return (
    <div className="w-full md:mx-auto md:max-w-[1300px] mt-10 px-2 px-4">
      <p className="text-4xl my-5 font-medium">
        Search results for <span className="text-amber-500">{searchQuery}</span>{" "}
        <small className="text-2xl text-neutral-500">
          {resultsCount} results found
        </small>
      </p>
      <h2 className="mt-2.5">Movies</h2>
      <div className="mt-6 grid movie_grid w-full overflow-hidden">
        {movies?.results?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
export default MovieResults;
