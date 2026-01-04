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
    year: "",
    minYear: 1900,
    maxYear: 2026,
    language: "",
    sortBy: mediaType === "movie" ? "popularity.desc" : "popularity.desc",
  });

  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [availableGenres, setAvailableGenres] = useState([]);
  const [availableLanguages, setAvailableLanguages] = useState([]);

  // Refs for dropdowns to handle click outside
  const genreRef = useRef(null);
  const yearRef = useRef(null);
  const languageRef = useRef(null);

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

  // Handle min year change
  const handleMinYearChange = (e) => {
    const value = Math.min(parseInt(e.target.value), filters.maxYear - 1);
    setFilters((prev) => {
      const newFilters = { 
        ...prev, 
        minYear: value,
        year: "" // Clear single year filter
      };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  // Handle max year change
  const handleMaxYearChange = (e) => {
    const value = Math.max(parseInt(e.target.value), filters.minYear + 1);
    setFilters((prev) => {
      const newFilters = { 
        ...prev, 
        maxYear: value,
        year: "" // Clear single year filter
      };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  // Clear year range (reset to defaults)
  const clearYearRange = () => {
    setFilters((prev) => {
      const newFilters = { 
        ...prev, 
        minYear: 1900,
        maxYear: 2026,
        year: ""
      };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  // Handle single year selection
  const handleYearChange = (year) => {
    setFilters((prev) => {
      const newFilters = { 
        ...prev, 
        year: year === prev.year ? "" : year
      };
      onFilterChange(newFilters);
      return newFilters;
    });
    setIsYearOpen(false);
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

  // Handle sort change
  const handleSortChange = (sortBy) => {
    setFilters((prev) => {
      const newFilters = { ...prev, sortBy };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  // Clear all filters
  const clearAllFilters = () => {
    const clearedFilters = {
      genres: [],
      year: "",
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

  // Get year display text
  const getYearDisplay = () => {
    if (filters.year) {
      return filters.year;
    } else if (filters.minYear === 1900 && filters.maxYear === 2026) {
      return "Any Year";
    } else {
      return `${filters.minYear} - ${filters.maxYear}`;
    }
  };

  // Calculate slider positions for visual track
  const minPercent = ((filters.minYear - 1900) / (2026 - 1900)) * 100;
  const maxPercent = ((filters.maxYear - 1900) / (2026 - 1900)) * 100;

  return (
    <div className="filters-container bg-[#0f172a] p-6 rounded-lg shadow-lg">
      {/* Filter Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Filters</h2>
        {(filters.genres.length > 0 || filters.year || filters.language || 
          filters.minYear !== 1900 || filters.maxYear !== 2026) && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
          >
            <IoClose /> Clear All
          </button>
        )}
      </div>

      {/* Sort By */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Sort By
        </label>
        <div className="flex flex-wrap gap-2">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                filters.sortBy === option.value
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:shadow-sm"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <div className="absolute z-10 mt-2 w-full bg-gray-800 rounded-lg shadow-xl max-h-60 overflow-y-auto">
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
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Year Filter - Fixed slider */}
        <div className="relative" ref={yearRef}>
          <button
            onClick={() => setIsYearOpen(!isYearOpen)}
            className="w-full bg-gray-800 text-left p-3 rounded-lg flex justify-between items-center hover:bg-gray-700 transition-colors"
          >
            <div className="min-w-0">
              <div className="text-sm text-gray-400 truncate">
                {mediaType === "movie" ? "Release Year" : "First Air Year"}
              </div>
              <div className="text-white truncate">
                {getYearDisplay()}
              </div>
            </div>
            {isYearOpen ? (
              <IoChevronUp className="text-gray-400 flex-shrink-0 ml-2" />
            ) : (
              <IoChevronDown className="text-gray-400 flex-shrink-0 ml-2" />
            )}
          </button>

          {isYearOpen && (
            <div className="absolute z-10 mt-2 w-full bg-gray-800 rounded-lg shadow-xl p-4">
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
                
                {/* Fixed Range Slider */}
                <div className="space-y-6">
                  {/* Year range display */}
                  <div className="flex justify-between">
                    <div className="text-center">
                      <div className="text-gray-300 text-sm font-medium">{filters.minYear}</div>
                      <div className="text-gray-400 text-xs">Min</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-300 text-sm font-medium">{filters.maxYear}</div>
                      <div className="text-gray-400 text-xs">Max</div>
                    </div>
                  </div>
                  
                  {/* Range slider container */}
                  <div className="relative py-4">
                    {/* Background track */}
                    <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-gray-700 rounded-full -translate-y-1/2"></div>
                    
                    {/* Active track */}
                    <div 
                      className="absolute top-1/2 h-1.5 bg-blue-500 rounded-full -translate-y-1/2"
                      style={{
                        left: `${minPercent}%`,
                        right: `${100 - maxPercent}%`
                      }}
                    ></div>
                    
                    {/* Min slider */}
                    <input
                      type="range"
                      min="1900"
                      max="2026"
                      value={filters.minYear}
                      onChange={handleMinYearChange}
                      className="absolute top-1/2 left-0 right-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    
                    {/* Max slider */}
                    <input
                      type="range"
                      min="1900"
                      max="2026"
                      value={filters.maxYear}
                      onChange={handleMaxYearChange}
                      className="absolute top-1/2 left-0 right-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    
                    {/* Custom slider thumbs */}
                    <div 
                      className="absolute top-1/2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg -translate-x-1/2 -translate-y-1/2 z-20"
                      style={{ left: `${minPercent}%` }}
                    ></div>
                    <div 
                      className="absolute top-1/2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg -translate-x-1/2 -translate-y-1/2 z-20"
                      style={{ left: `${maxPercent}%` }}
                    ></div>
                  </div>
                  
                  {/* Quick select buttons */}
                  <div className="pt-4 border-t border-gray-700">
                    <div className="text-xs text-gray-400 mb-2">Quick Select:</div>
                    <div className="flex flex-wrap gap-1">
                      {[2026, 2025, 2024, 2023, 2022, 2020, 2019, 2015, 2010, 2000].map((year) => (
                        <button
                          key={year}
                          onClick={() => handleYearChange(year)}
                          className={`px-2 py-1 text-xs rounded ${
                            filters.year === year
                              ? "bg-blue-600 text-white"
                              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                          }`}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
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
      </div>

      {/* Active Filters Display */}
      {(filters.genres.length > 0 || filters.year || filters.language || 
        filters.minYear !== 1900 || filters.maxYear !== 2026) && (
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

            {filters.year ? (
              <div className="bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                Year: {filters.year}
                <button
                  onClick={() => handleYearChange("")}
                  className="hover:text-white flex-shrink-0 ml-1"
                >
                  <IoClose size={14} />
                </button>
              </div>
            ) : (filters.minYear !== 1900 || filters.maxYear !== 2026) && (
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