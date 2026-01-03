import {
  FaGithub,
  FaLinkedin,
  FaSquareXTwitter,
  FaSquareInstagram,
} from "react-icons/fa6";
import Logo from "./Navbar/Logo";
export function Footer({}) {
  return (
    <footer className="w-full  p-4 md:p-20 area-footer w-full bg-[#101426]">
      <div className="flex flex-col align-center gap-10 items-center">
        <Logo />
        <div className="flex w-full flex-wrap justify-center gap-10 md:gap-40">
          <div className="flex flex-col font-bold">
            Developed and Managed by
            <span className="text-amber-500"> Akinwumi Akinfemi</span>
          </div>
          <div className="font-bold">
            <span>Connect with me</span>
            <div className="flex gap-4 text-2xl mt-2">
              <a className="hover:text-amber-500" href="">
                <FaGithub />
              </a>
              <a className="hover:text-amber-500" href="">
                <FaLinkedin />
              </a>
              <a className="hover:text-amber-500" href="">
                <FaSquareInstagram />
              </a>
              <a className="hover:text-amber-500" href="">
                <FaSquareXTwitter />
              </a>
            </div>
          </div>
          <hr className="text-amber-300" />
        </div>
        <hr className="h-4 text-amber-300 w-full" />
        <p className="">Copyright &copy; 2026 All rights reserved. ️</p>
      </div>
    </footer>
  );
}
