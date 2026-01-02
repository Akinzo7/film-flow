import { Logo } from "./Logo";
import { Navlinks } from "./Navlinks";
import HamburgerMenu from "./HamburgerMenu";
import Search from "../Search";

const Navbar = ({ searchInput, setSearchInput, setSearchQuery}) => {
  return (
    <nav className="flex justify-between  items-center  ">
      {/* This is for the logo */}
      <Logo />
      <div className="max-w-lg w-full mx-4 md:mx-0 flex-1">
        <Search 
          search={searchInput}          
          setSearch={setSearchInput}    
          onSearchSubmit={setSearchQuery} 
        />
      </div>
      
      {/* This handles the links */}
       <div className="hidden md:block">
        <Navlinks />
        
      </div>
       <div className="md:hidden">
        <HamburgerMenu />
      </div>
       
    </nav>
  );
};
export default Navbar;
