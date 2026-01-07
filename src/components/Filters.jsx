// components/Filters.jsx
import { useState, useEffect, useRef } from "react";
import { IoChevronDown, IoChevronUp, IoClose } from "react-icons/io5";

function Filters({
  onFilterChange,
  mediaType = "movie",
  showSortOptions = [],
}) {
  const [filters, setFilters] = useState({
    genres: [],
    minYear: 1900,
    maxYear: 2026,
    language: "",
    sortBy: mediaType === "movie" ? "popularity.desc" : "popularity.desc",
  });

  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false); // NEW: State for sort dropdown
  const [availableGenres, setAvailableGenres] = useState([]);
  const [availableLanguages, setAvailableLanguages] = useState([]);
  

  // Refs for dropdowns to handle click outside
  const genreRef = useRef(null);
  const yearRef = useRef(null);
  const languageRef = useRef(null);
  const sortRef = useRef(null); // NEW: Ref for sort dropdown

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (genreRef.current && !genreRef.current.contains(event.target)) {
        setIsGenreOpen(false);
      }
      if (yearRef.current && !yearRef.current.contains(event.target)) {
        setIsYearOpen(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setIsLanguageOpen(false);
      }
      // NEW: Close sort dropdown when clicking outside
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Default sort options if not provided
  const sortOptions =
    showSortOptions.length > 0
      ? showSortOptions
      : mediaType === "movie"
      ? [
          { value: "popularity.desc", label: "Most Popular" },
          { value: "vote_average.desc", label: "Top Rated" },
          { value: "release_date.desc", label: "Newest" },
          { value: "release_date.asc", label: "Oldest" },
          { value: "revenue.desc", label: "Highest Revenue" },
        ]
      : [
          { value: "popularity.desc", label: "Most Popular" },
          { value: "vote_average.desc", label: "Top Rated" },
          { value: "first_air_date.desc", label: "Newest" },
          { value: "first_air_date.asc", label: "Oldest" },
          { value: "vote_count.desc", label: "Most Votes" },
        ];

  // Fetch genres based on media type (movie or TV)
  useEffect(() => {
    const fetchGenres = async () => {
      const type = mediaType === "movie" ? "movie" : "tv";
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/${type}/list?api_key=${
            import.meta.env.VITE_TMDB_KEY
          }&language=en-US`
        );
        const data = await response.json();
        setAvailableGenres(data.genres || []);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, [mediaType]);

  // Fetch available languages
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/configuration/languages?api_key=${
            import.meta.env.VITE_TMDB_KEY
          }`
        );
        const data = await response.json();
        const uniqueLanguages = Array.from(
          new Map(data.map((lang) => [lang.iso_639_1, lang])).values()
        ).sort((a, b) => a.english_name.localeCompare(b.english_name));

        setAvailableLanguages(uniqueLanguages);
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };

    fetchLanguages();
  }, []);

  // Handle genre selection
  const handleGenreToggle = (genreId) => {
    setFilters((prev) => {
      const newGenres = prev.genres.includes(genreId)
        ? prev.genres.filter((id) => id !== genreId)
        : [...prev.genres, genreId];

      const newFilters = { ...prev, genres: newGenres };
      onFilterChange(newFilters);
      return newFilters;
    });
    setIsGenreOpen(false);
  };

  // FIXED: Handle min year change with proper validation
  // This function is called when the user moves the minimum year slider
const handleMinYearChange = (e) => {
  const newMin = Number(e.target.value);
  setFilters((prev) => {
    if (newMin > prev.maxYear) {
      // swap so min <= max
      const newFilters = { ...prev, minYear: prev.maxYear, maxYear: newMin };
      onFilterChange(newFilters);
      return newFilters;
    }
    const newFilters = { ...prev, minYear: newMin };
    onFilterChange(newFilters);
    return newFilters;
  });
};

  // FIXED: Handle max year change with proper validation
  // This function is called when the user moves the maximum year slider
const handleMaxYearChange = (e) => {
  const newMax = Number(e.target.value);
  setFilters((prev) => {
    if (newMax < prev.minYear) {
      // swap so min <= max
      const newFilters = { ...prev, minYear: newMax, maxYear: prev.minYear };
      onFilterChange(newFilters);
      return newFilters;
    }
    const newFilters = { ...prev, maxYear: newMax };
    onFilterChange(newFilters);
    return newFilters;
  });
};
  // Clear year range (reset to defaults)
 const clearYearRange = () => {
  const newFilters = {
    ...filters,
    minYear: 1900,
    maxYear: 2026,
  };
  setFilters(newFilters);
  onFilterChange(newFilters);
};

  // Handle language selection
  const handleLanguageChange = (languageCode) => {
    setFilters((prev) => {
      const newFilters = {
        ...prev,
        language: languageCode === prev.language ? "" : languageCode,
      };
      onFilterChange(newFilters);
      return newFilters;
    });
    setIsLanguageOpen(false);
  };

  // NEW: Handle sort change from dropdown
  // This function is called when user selects a sort option
  const handleSortChange = (sortValue) => {
    setFilters((prev) => {
      const newFilters = { ...prev, sortBy: sortValue };
      onFilterChange(newFilters);
      return newFilters;
    });
    setIsSortOpen(false); // Close dropdown after selection
  };

  // Clear all filters
const clearAllFilters = () => {
  const clearedFilters = {
    genres: [],
    minYear: 1900,
    maxYear: 2026,
    language: "",
    sortBy: sortOptions[0].value,
  };
  setFilters(clearedFilters);
  onFilterChange(clearedFilters);
};

  // Get selected language name
  const getSelectedLanguageName = () => {
    if (!filters.language) return "Any Language";
    const lang = availableLanguages.find(
      (l) => l.iso_639_1 === filters.language
    );
    return lang ? lang.english_name : filters.language;
  };

  // NEW: Get selected sort option label
  // This function finds and returns the label for the currently selected sort option
  const getSelectedSortLabel = () => {
    const selectedOption = sortOptions.find(
      (option) => option.value === filters.sortBy
    );
    return selectedOption ? selectedOption.label : "Sort By";
  };

  // Get year display text
  const getYearDisplay = () => {
    if (filters.minYear === 1900 && filters.maxYear === 2026) {
      return "Any Year";
    }
    return `${filters.minYear} - ${filters.maxYear}`;
  };

  // Calculate slider positions for visual track
  const minPercent = ((filters.minYear - 1900) / (2026 - 1900)) * 100;
  const maxPercent = ((filters.maxYear - 1900) / (2026 - 1900)) * 100;

  return (
    <div className="filters-container bg-[#0f172a] p-6 rounded-lg shadow-lg">
      {/* Filter Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Filters</h2>
        {(filters.genres.length > 0 ||
          filters.language ||
          filters.minYear !== 1900 ||
          filters.maxYear !== 2026) && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
          >
            <IoClose /> Clear All
          </button>
        )}
      </div>

      {/* Filter Grid */}
      <div className="flex flex-wrap gap-4">
        {/* Genre Filter */}
        <div className="relative" ref={genreRef}>
          <button
            onClick={() => setIsGenreOpen(!isGenreOpen)}
            className="w-full bg-gray-800 text-left p-3 rounded-lg flex justify-between items-center hover:bg-gray-700 transition-colors"
          >
            <div className="min-w-0">
              <div className="text-sm text-gray-400 truncate">Genre</div>
              <div className="text-white truncate">
                {filters.genres.length > 0
                  ? `${filters.genres.length} selected`
                  : "All"}
              </div>
            </div>
            {isGenreOpen ? (
              <IoChevronUp className="text-gray-400 flex-shrink-0 ml-2" />
            ) : (
              <IoChevronDown className="text-gray-400 flex-shrink-0 ml-2" />
            )}
          </button>

          {isGenreOpen && (
            <div className="absolute min-w-[150px] z-10 mt-2 w-full bg-gray-800 rounded-lg shadow-xl max-h-60 overflow-y-auto">
              <div className="p-2">
                {availableGenres.map((genre) => (
                  <div
                    key={genre.id}
                    onClick={() => handleGenreToggle(genre.id)}
                    className={`flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-700 ${
                      filters.genres.includes(genre.id) ? "bg-blue-900/30" : ""
                    }`}
                  >
                    <span className="text-white text-sm truncate">
                      {genre.name}
                    </span>
                    {filters.genres.includes(genre.id) && (
                      <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0 ml-2"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* FIXED: Year Filter with improved slider logic */}
        <div className="relative" ref={yearRef}>
          <button
            onClick={() => setIsYearOpen(!isYearOpen)}
            className="w-full bg-gray-800 text-left p-3 rounded-lg flex justify-between items-center hover:bg-gray-700 transition-colors"
          >
            <div className="min-w-0">
              <div className="text-sm text-gray-400 truncate">
                {mediaType === "movie" ? "Release Year" : "First Air Year"}
              </div>
              <div className="text-white truncate">{getYearDisplay()}</div>
            </div>
            {isYearOpen ? (
              <IoChevronUp className="text-gray-400 flex-shrink-0 ml-2" />
            ) : (
              <IoChevronDown className="text-gray-400 flex-shrink-0 ml-2" />
            )}
          </button>

          {isYearOpen && (
            <div className="absolute min-w-[320px] z-10 mt-2 w-full bg-gray-800 rounded-lg shadow-xl p-4">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white text-sm">Year Range</span>
                  <button
                    onClick={clearYearRange}
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    Reset
                  </button>
                </div>

                {/* FIXED Range Slider with better logic */}
                <div className="space-y-6">
                  {/* Year range display */}
                  <div className="flex justify-between">
                    <div className="text-center">
                      <div className="text-gray-300 text-sm font-medium">
                        {filters.minYear}
                      </div>
                      <div className="text-gray-400 text-xs">Min</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-300 text-sm font-medium">
                        {filters.maxYear}
                      </div>
                      <div className="text-gray-400 text-xs">Max</div>
                    </div>
                  </div>

                  {/* IMPROVED: Range slider container with pointer-events control */}
                  <div className="relative py-4">
                    {/* Background track (visual) — must not block pointer events */}
                    <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-gray-700 rounded-full -translate-y-1/2 pointer-events-none"></div>

                    {/* Active track showing selected range (visual) */}
                    <div
                      className="absolute top-1/2 h-1.5 bg-amber-500 rounded-full -translate-y-1/2 pointer-events-none"
                      style={{
                        left: `${minPercent}%`,
                        right: `${100 - maxPercent}%`,
                      }}
                    ></div>

                    {/* IMPROVED: Min year slider - styled to be more visible */}
                   {/* Min slider input (ON TOP) */}
<input
  type="range"
  min="1900"
  max="2026"
  step="1"
  value={filters.minYear}
  onChange={handleMinYearChange}
  className="absolute top-1/2 left-0 right-0 w-full h-1.5 
             -translate-y-1/2 appearance-none bg-transparent 
             cursor-pointer z-40"
/>

                    {/* Max slider input (UNDER min) */}
<input
  type="range"
  min="1900"
  max="2026"
  step="1"
  value={filters.maxYear}
  onChange={handleMaxYearChange}
  className="absolute top-1/2 left-0 right-0 w-full h-1.5 
             -translate-y-1/2 appearance-none bg-transparent 
             cursor-pointer z-30"
/>

                    {/* Custom slider thumbs for visual feedback */}
                    <div
                      className="absolute top-1/2 w-4 h-4 bg-amber-500 rounded-full border-2 border-white shadow-lg -translate-x-1/2 -translate-y-1/2 pointer-events-none z-40"
                      style={{ left: `${minPercent}%` }}
                    ></div>
                    <div
                      className="absolute top-1/2 w-4 h-4 bg-amber-500 rounded-full border-2 border-white shadow-lg -translate-x-1/2 -translate-y-1/2 pointer-events-none z-40"
                      style={{ left: `${maxPercent}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Language Filter */}
        <div className="relative" ref={languageRef}>
          <button
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            className="w-full bg-gray-800 text-left p-3 rounded-lg flex justify-between items-center hover:bg-gray-700 transition-colors"
          >
            <div className="min-w-0">
              <div className="text-sm text-gray-400 truncate">Language</div>
              <div className="text-white truncate">
                {getSelectedLanguageName()}
              </div>
            </div>
            {isLanguageOpen ? (
              <IoChevronUp className="text-gray-400 flex-shrink-0 ml-2" />
            ) : (
              <IoChevronDown className="text-gray-400 flex-shrink-0 ml-2" />
            )}
          </button>

          {isLanguageOpen && (
            <div className="absolute z-10 mt-2 w-full bg-gray-800 rounded-lg shadow-xl max-h-60 overflow-y-auto">
              <div className="p-2">
                <div
                  onClick={() => handleLanguageChange("")}
                  className={`p-2 rounded cursor-pointer hover:bg-gray-700 ${
                    !filters.language ? "bg-blue-900/30" : ""
                  }`}
                >
                  <span className="text-white text-sm">Any Language</span>
                </div>
                {availableLanguages.map((language) => (
                  <div
                    key={language.iso_639_1}
                    onClick={() => handleLanguageChange(language.iso_639_1)}
                    className={`p-2 rounded cursor-pointer hover:bg-gray-700 ${
                      filters.language === language.iso_639_1
                        ? "bg-blue-900/30"
                        : ""
                    }`}
                  >
                    <span className="text-white text-sm truncate">
                      {language.english_name}
                    </span>
                    <span className="text-gray-400 text-xs ml-2 flex-shrink-0">
                      ({language.iso_639_1})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* NEW: Sort By Dropdown (instead of buttons) */}
        <div className="relative" ref={sortRef}>
          <div className="relative">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="w-full bg-gray-800 text-left p-3 rounded-lg flex justify-between items-center hover:bg-gray-700 transition-colors"
            >
              <div className="min-w-0">
                <div className="text-sm text-gray-400 truncate">Sort By</div>
                <div className="text-white truncate">
                  {getSelectedSortLabel()}
                </div>
              </div>

              {isSortOpen ? (
                <IoChevronUp className="text-gray-400 flex-shrink-0 ml-2" />
              ) : (
                <IoChevronDown className="text-gray-400 flex-shrink-0 ml-2" />
              )}
            </button>

            {/* Sort Dropdown Menu */}
            {isSortOpen && (
              <div className="absolute min-w-[150px]  z-10 mt-2 w-full bg-gray-800 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                <div className="p-2">
                  {sortOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => handleSortChange(option.value)}
                      className={`flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-700 ${
                        filters.sortBy === option.value ? "bg-blue-900/30" : ""
                      }`}
                    >
                      <span className="text-white text-sm truncate">
                        {option.label}
                      </span>
                      {filters.sortBy === option.value && (
                        <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0 ml-2"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {(filters.genres.length > 0 ||
        filters.language ||
        filters.minYear !== 1900 ||
        filters.maxYear !== 2026) && (
        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="text-sm text-gray-400 mb-3">Active Filters:</div>
          <div className="flex flex-wrap gap-2">
            {filters.genres.map((genreId) => {
              const genre = availableGenres.find((g) => g.id === genreId);
              return genre ? (
                <div
                  key={genre.id}
                  className="bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  <span className="truncate max-w-[100px]">{genre.name}</span>
                  <button
                    onClick={() => handleGenreToggle(genre.id)}
                    className="hover:text-white flex-shrink-0"
                  >
                    <IoClose size={14} />
                  </button>
                </div>
              ) : null;
            })}

            {(filters.minYear !== 1900 || filters.maxYear !== 2026) && (
              <div className="bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                Years: {filters.minYear} - {filters.maxYear}
                <button
                  onClick={clearYearRange}
                  className="hover:text-white flex-shrink-0 ml-1"
                >
                  <IoClose size={14} />
                </button>
              </div>
            )}

            {filters.language && (
              <div className="bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                <span className="truncate max-w-[100px]">
                  {getSelectedLanguageName()}
                </span>
                <button
                  onClick={() => handleLanguageChange("")}
                  className="hover:text-white flex-shrink-0 ml-1"
                >
                  <IoClose size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Filters;
