export function Navlinks() {
  return (
    <div>
      <ul className="flex gap-2 ">
        <li className="hover:text-amber-500">
          <a href="#home">Home</a>
        </li>
        <li className="hover:text-amber-500">
          <a href="#movies">Movies</a>
        </li>
        <li className="hover:text-amber-500">
          {" "}
          <a href="#series">Series</a>
        </li>
        <li className="hover:text-amber-500">
          <a href="#favorites"> Favorites</a>
        </li>
      </ul>
    </div>
  );
}
