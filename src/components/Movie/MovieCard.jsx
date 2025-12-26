import { IoStar } from "react-icons/io5";

function MovieCard() {
  return (
    <div className="md:w-[200px] w-[173px]  max-[420px]:w-[155px]">
      <a
        style={{ backgroundImage: "url('/poster.jpg')" }}
        className="w-full aspect-[2/3] flex flex-col justify-between bg-cover bg-center bg-gray-800 rounded-sm p-1"
      >
        <div className="w-full mx-auto bg-gray-900 text-white text-[14px] text-center py-[0.3em] px-[0.6em] rounded-sm font-bold ">
          Guardians of the Galaxy Vol. 2 2017
        </div>

        <div className="flex items-center bg-gray-900 text-white gap-1 self-start p-1  rounded-sm">
  <IoStar className="text-yellow-500 w-4 h-4 mb-0.5" />
  <span className="font-bold text-sm sm:text-base">8.3</span>
</div>
      </a>
    </div>
  );
}
export default MovieCard;
