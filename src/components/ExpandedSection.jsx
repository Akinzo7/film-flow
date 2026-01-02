import MovieCard from "./Movie/MovieCard";

function ExpandedSection({ movies, title, onBack }) {
  if (!movies || movies.length === 0) {
    return (
      <div className="w-full px-4 md:px-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-amber-500 hover:text-amber-400 mb-6"
        >
          <span className="text-2xl">←</span>
          <span>Back to Home</span>
        </button>
        <p className="text-center py-20">No movies found</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 md:px-8">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-amber-500 hover:text-amber-400 mb-6"
      >
        <span className="text-2xl">←</span>
        <span>Back to Home</span>
      </button>
      
      {/* Section title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-8">{title}</h1>

      {/* Movie grid */}
      <div className="mt-6 grid movie_grid w-full overflow-hidden">
        <MovieCard movies={movies} />
      </div>
    </div>
  );
}

export default ExpandedSection;