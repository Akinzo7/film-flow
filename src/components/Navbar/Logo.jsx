import { Link } from "react-router-dom";
export function Logo({ clearSearch }) {
  const handleClick = () => {
    if (clearSearch) {
      clearSearch(); // Clear search when logo is clicked
    }
  };
  return (
    <div>
      <Link onClick={handleClick} to="/" className="font-extrabold text-xl md:text-2xl cursor-pointer">
        Film<span className="text-amber-500">Flow</span>
      </Link>
    </div>
  );
}

export default Logo;
