  import { IoIosSearch } from "react-icons/io";

function Search({search, setSearch}) {
const handleSubmit = (e) => {
  e.preventDefault();
  console.log(search);
  setSearch("");
}

  return (
   
      <form action="./search" role="search" className="pt-12 max-w-3xl w-full px-14" onSubmit={handleSubmit}>
        <label htmlFor="movie" className="sr-only"></label>
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