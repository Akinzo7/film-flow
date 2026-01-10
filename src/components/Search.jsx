import { IoIosSearch } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";

function Search({search, setSearch, onSearchSubmit}) {
  // Get navigate function to programmatically navigate
  const navigate = useNavigate();
  // Get current location to check which page we're on
  const location = useLocation();

 // src/components/Search.jsx
const handleSubmit = (e) => {
  e.preventDefault();
  
  if(search.trim()){
    onSearchSubmit(search.trim());
    
    if (location.pathname !== '/') {
      // Pass search query as state during navigation
      navigate('/', { state: { searchQuery: search.trim() } });
    }
  } 
}

  return (
    <form role="search" className="max-w-2xl w-full px-4 md:px-0" onSubmit={handleSubmit}>
      <label htmlFor="movie" className="sr-only">Search for movies</label>
      <div className="relative w-full">
        <input 
          type="search" 
          placeholder="Search for a movie or TV show"
          name="movie" 
          id="movie" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
          className="focus:shadow-[0_0_14px_rgba(245,158,11,0.25)]  pl-4 pr-10 py-2 border border-gray-300 rounded-lg w-full focus:outline-none
    focus:border-amber-500"
        />
        <IoIosSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
    </form>
  )
}

export default Search