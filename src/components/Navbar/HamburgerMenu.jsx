import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

function HamburgerMenu({ clearSearch }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleHomeClick = () => {
    if (clearSearch) {
      clearSearch(); // Clear search when Home is clicked
    }
    setIsOpen(false);
  };

  const handleLinkClick = () => {
  setIsOpen(false);
};
  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="text-white p-2 focus:outline-none"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <FaTimes className="w-6 h-6" />
        ) : (
          <FaBars className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-gray-900 border-t border-gray-700 shadow-lg z-50">
          <ul className="flex flex-col p-4 space-y-4">
            <li>
              <Link
                to="/"
                className="block text-white hover:text-amber-500 py-2"
               onClick={handleHomeClick} 
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/movies"
                className="block text-white hover:text-amber-500 py-2"
                 onClick={handleLinkClick}
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                to="/series"
                className="block text-white hover:text-amber-500 py-2"
                 onClick={handleLinkClick}
              >
                Series
              </Link>
            </li>
            <li>
              <Link
                to="/favorites"
                className="block text-white hover:text-amber-500 py-2"
                 onClick={handleLinkClick}
              >
                Favorites
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default HamburgerMenu;