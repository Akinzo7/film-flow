import useFetch from "./hooks/useFetch";

function App() {
  const title = "Avengers";
  const API_KEY = import.meta.env.VITE_OMDB_KEY;
  const BASE_URL = import.meta.env.VITE_MOVIE_BASE_URL;
  const url = `${BASE_URL}?t=${title}&apikey=${API_KEY}`;
// http://www.omdbapi.com/?i=tt3896198&apikey=76d75171
  const { data: movie, isLoading, isError } = useFetch(url);
  console.log(movie);
  return <div className="min-h-screen bg-gray-900 text-white">
    <header>
      <nav>
        <p>FILM<span>FLOW</span></p>
      </nav>
    </header>
  </div>;
}

export default App;
