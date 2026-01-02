import { Logo } from "./Logo";
import { Navlinks } from "./Navlinks";
import HamburgerMenu from "./HamburgerMenu";
const Navbar = () => {
  return (
    <nav className="flex justify-between  items-center  ">
      {/* This is for the logo */}
      <Logo />
      
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
