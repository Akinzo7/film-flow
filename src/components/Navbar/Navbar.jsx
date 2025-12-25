import { Logo } from "./Logo";
import { Navlinks } from "./Navlinks";

const Navbar = () => {
  return (
    <nav className="flex justify-between  items-center  ">
      {/* This is for the logo */}
      <Logo />
      {/* This handles the links */}
      <Navlinks />
    </nav>
  );
};
export default Navbar;
