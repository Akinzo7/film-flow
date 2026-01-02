import React from "react";
import { Link } from "react-router-dom";
export function Logo() {
  return (
    <div>
      <Link to="/" className="font-extrabold text-xl md:text-2xl cursor-pointer">
        Film<span className="text-amber-500">Flow</span>
      </Link>
    </div>
  );
}

export default Logo;
