import { Link } from "react-router-dom";

export function Navlinks({ clearSearch }) {
  const handleHomeClick = () => {
    if (clearSearch) {
      clearSearch(); // Clear search when Home is clicked
    }
  };
  return (
    <div>
      <ul className="flex gap-2 ">
        <li className="hover:text-amber-500">
          <Link to="/" onClick={() => clearSearch && clearSearch()}>
            Home
          </Link>
        </li>
        <li className="hover:text-amber-500">
          <Link to="/movies">Movies</Link>
        </li>
        <li className="hover:text-amber-500">
          <Link to="/series">Series</Link>
        </li>
        <li className="hover:text-amber-500">
          <Link to="/favorites">Favorites</Link>
        </li>
      </ul>
    </div>
  );
}
