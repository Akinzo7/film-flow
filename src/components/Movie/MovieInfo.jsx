import { IoStar } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function MovieInfo() {
  return (
    <>
      {" "}
      <div
        style={{ backgroundImage: `url('/background.jpg')` }}
        className="mt-9 bg-[length:100%] h-[75vh] bg-no-repeat  "
      >
        <div className="w-full h-full flex items-end gap-8 px-16 bg-linear-1 from-[#101828] from-10% to-[rgba(0,0,0,0.21)] to-57% pb-20">
          <div className="w-57 h-auto shadow-lg">
            <img src="/movieinfo.webp" alt="poster" />
          </div>
          <div className="flex flex-col gap-2 justify-end text-[#cfdce7]">
            <h1 className="text-4xl font-semibold">Inception</h1>
            <p>Directed by Christopher Nolan</p>
            <div className="flex gap-1 items-end">
              <span className="py-1 px-2 font-bold text-[#bed0de] bg-[#35436799]">
                Action
              </span>{" "}
              <span className="py-1 px-2 font-bold text-[#bed0de] bg-[#35436799]">
                Sci-Fi
              </span>
              <span className="py-1 px-2 font-bold text-[#bed0de] bg-[#35436799]">
                Adventure
              </span>{" "}
              <span>PG-13, 2010 | 2h 28m</span>
            </div>
            <div className="mt-1 max-w-[500px]">
              <div>
                Cobb, a skilled thief who commits corporate espionage by
                infiltrating the subconscious of his targets is offered a chance
                to regain his old life as payment for a task considered to be
                impossible: "inception", the implantation of another person's
                idea into a target's subconscious.
              </div>
            </div>
            <div>
              <div>Country: United States, United kingdom</div>
              <div className="flex gap-2 items-center">
                <span className="flex gap-1 items-center text-[1rem]">
                  <img src="/imdb.png" alt="IMDB" className="w-8" /> 8.8
                </span>{" "}
                <span className="flex gap-1 items-center text-[1rem]">
                  <img
                    src="/tomato.png"
                    alt="rotten tomatoes"
                    className="w-8"
                  />{" "}
                  8.8
                </span>
                <span className="flex gap-1 items-center text-[1rem]">
                  <img src="/tmdb.png" alt="tmdb" className="w-8" /> 8.8
                </span>
              </div>
            </div>
            <button className="mt-4 bg-transparent border-[#354367] border text-white py-2 px-4 rounded-md hover:border-[#7785aa] hover:bg-[#35436799] transition duration-300">
              {" "}
              ➕ Add to favorites
            </button>
          </div>
        </div>
      </div>
      <div className="px-16 pb-20">
        <h2 className="text-2xl font-bold mt-6 mb-4">Top Billed Cast</h2>
        <div className="flex gap-4">
          <div className="w-[173px]">
            <div
              style={{ backgroundImage: `url("/actor.jpg")` }}
              className="w-full aspect-[2/3] bg-cover bg-center bg-gray-800 rounded-sm p-1 cursor-pointer relative"
            >
              <div className=" absolute left-0.5 bottom-0.5 right-0.5 bg-gray-900 text-white text-[14px] text-center py-[0.3em]  rounded-sm font-bold  ">
                Tom Hardy
              </div>
            </div>
          </div>
          <div className="w-[173px] ">
            <div
              style={{ backgroundImage: `url("/actor.jpg")` }}
              className="w-full aspect-[2/3] bg-cover bg-center bg-gray-800 rounded-sm p-1 cursor-pointer relative"
            >
              <div className=" absolute left-0.5 bottom-0.5 right-0.5 bg-gray-900 text-white text-[14px] text-center py-[0.3em]  rounded-sm font-bold  ">
                Tom Hardy
              </div>
            </div>
          </div>
          <div className="w-[173px]">
            <div
              style={{ backgroundImage: `url("/actor.jpg")` }}
              className="w-full aspect-[2/3] bg-cover bg-center bg-gray-800 rounded-sm p-1 cursor-pointer relative"
            >
              <div className=" absolute left-0.5 bottom-0.5 right-0.5 bg-gray-900 text-white text-[14px] text-center py-[0.3em]  rounded-sm font-bold  ">
                Tom Hardy
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-16 pb-20">
        {/* Movie Trailer */}
        <h2 className="text-2xl font-bold mt-6 mb-4">
          Watch Inception Trailers
        </h2>
      </div>
      <div className="px-16 pb-20">
        {/* Similar Movies */}
        <h2 className="text-2xl font-bold mt-6 mb-4">Similar Movies</h2>
        <div className="relative">
          <button className="absolute  left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 
      bg-[#233257] hover:bg-[#41527c] p-2 rounded-full cursor-pointer">
            <FaChevronLeft className="text-white w-6 h-6" />
          </button>

           <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 
      bg-[#233257] hover:bg-[#41527c] p-2 rounded-full cursor-pointer">
                <FaChevronRight className="text-white w-6 h-6" />
              </button>
        <div className="flex gap-4 w-full snap-x overflow-x-auto scroll-smoth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          
          <div className="w-54 flex-shrink-0">
            <div
              style={{ backgroundImage: `url('/background.jpg')` }}
              className="w-full aspect-[2/3] bg-cover bg-center bg-gray-800 rounded-sm p-1 cursor-pointer flex flex-col justify-between"
            >
              <div className="w-full mx-auto bg-gray-900 text-white text-[14px] text-center py-[0.3em] px-[0.6em] rounded-sm font-bold ">
                Inception 2010
              </div>

              <div className="flex items-center bg-gray-900 text-white gap-1 self-start p-1  rounded-sm">
                <IoStar className="text-yellow-500 w-4 h-4 mb-0.5" />
                <span className="font-bold text-sm sm:text-base">8.8</span>
              </div>
            </div>
          </div>
          <div className="w-54 flex-shrink-0">
            <div
              style={{ backgroundImage: `url('/background.jpg')` }}
              className="w-full aspect-[2/3] bg-cover bg-center bg-gray-800 rounded-sm p-1 cursor-pointer flex flex-col justify-between"
            >
              <div className="w-full mx-auto bg-gray-900 text-white text-[14px] text-center py-[0.3em] px-[0.6em] rounded-sm font-bold ">
                Inception 2010
              </div>

              <div className="flex items-center bg-gray-900 text-white gap-1 self-start p-1  rounded-sm">
                <IoStar className="text-yellow-500 w-4 h-4 mb-0.5" />
                <span className="font-bold text-sm sm:text-base">8.8</span>
              </div>
            </div>
          </div>
          <div className="w-54 flex-shrink-0">
            <div
              style={{ backgroundImage: `url('/background.jpg')` }}
              className="w-full aspect-[2/3] bg-cover bg-center bg-gray-800 rounded-sm p-1 cursor-pointer flex flex-col justify-between"
            >
              <div className="w-full mx-auto bg-gray-900 text-white text-[14px] text-center py-[0.3em] px-[0.6em] rounded-sm font-bold ">
                Inception 2010
              </div>

              <div className="flex items-center bg-gray-900 text-white gap-1 self-start p-1  rounded-sm">
                <IoStar className="text-yellow-500 w-4 h-4 mb-0.5" />
                <span className="font-bold text-sm sm:text-base">8.8</span>
              </div>
            </div>
          </div>
          <div className="w-54 flex-shrink-0">
            <div
              style={{ backgroundImage: `url('/background.jpg')` }}
              className="w-full aspect-[2/3] bg-cover bg-center bg-gray-800 rounded-sm p-1 cursor-pointer flex flex-col justify-between"
            >
              <div className="w-full mx-auto bg-gray-900 text-white text-[14px] text-center py-[0.3em] px-[0.6em] rounded-sm font-bold ">
                Inception 2010
              </div>

              <div className="flex items-center bg-gray-900 text-white gap-1 self-start p-1  rounded-sm">
                <IoStar className="text-yellow-500 w-4 h-4 mb-0.5" />
                <span className="font-bold text-sm sm:text-base">8.8</span>
              </div>
            </div>
          </div>
          <div className="w-54 flex-shrink-0">
            <div
              style={{ backgroundImage: `url('/background.jpg')` }}
              className="w-full aspect-[2/3] bg-cover bg-center bg-gray-800 rounded-sm p-1 cursor-pointer flex flex-col justify-between"
            >
              <div className="w-full mx-auto bg-gray-900 text-white text-[14px] text-center py-[0.3em] px-[0.6em] rounded-sm font-bold ">
                Inception 2010
              </div>

              <div className="flex items-center bg-gray-900 text-white gap-1 self-start p-1  rounded-sm">
                <IoStar className="text-yellow-500 w-4 h-4 mb-0.5" />
                <span className="font-bold text-sm sm:text-base">8.8</span>
              </div>
            </div>
          </div>
          <div className="w-54 flex-shrink-0">
            <div
              style={{ backgroundImage: `url('/background.jpg')` }}
              className="w-full aspect-[2/3] bg-cover bg-center bg-gray-800 rounded-sm p-1 cursor-pointer flex flex-col justify-between"
            >
              <div className="w-full mx-auto bg-gray-900 text-white text-[14px] text-center py-[0.3em] px-[0.6em] rounded-sm font-bold ">
                Inception 2010
              </div>

              <div className="flex items-center bg-gray-900 text-white gap-1 self-start p-1  rounded-sm">
                <IoStar className="text-yellow-500 w-4 h-4 mb-0.5" />
                <span className="font-bold text-sm sm:text-base">8.8</span>
              </div>
            </div>
          </div>
          <div className="w-54 flex-shrink-0">
            <div
              style={{ backgroundImage: `url('/background.jpg')` }}
              className="w-full aspect-[2/3] bg-cover bg-center bg-gray-800 rounded-sm p-1 cursor-pointer flex flex-col justify-between"
            >
              <div className="w-full mx-auto bg-gray-900 text-white text-[14px] text-center py-[0.3em] px-[0.6em] rounded-sm font-bold ">
                Inception 2010
              </div>

              <div className="flex items-center bg-gray-900 text-white gap-1 self-start p-1  rounded-sm">
                <IoStar className="text-yellow-500 w-4 h-4 mb-0.5" />
                <span className="font-bold text-sm sm:text-base">8.8</span>
              </div>
            </div>
          </div>
          <div className="w-54 flex-shrink-0">
            <div
              style={{ backgroundImage: `url('/background.jpg')` }}
              className="w-full aspect-[2/3] bg-cover bg-center bg-gray-800 rounded-sm p-1 cursor-pointer flex flex-col justify-between"
            >
              <div className="w-full mx-auto bg-gray-900 text-white text-[14px] text-center py-[0.3em] px-[0.6em] rounded-sm font-bold ">
                Inception 2010
              </div>

              <div className="flex items-center bg-gray-900 text-white gap-1 self-start p-1  rounded-sm">
                <IoStar className="text-yellow-500 w-4 h-4 mb-0.5" />
                <span className="font-bold text-sm sm:text-base">8.8</span>
              </div>
            </div>
          </div>
          <div className="w-54 flex-shrink-0">
            <div
              style={{ backgroundImage: `url('/background.jpg')` }}
              className="w-full aspect-[2/3] bg-cover bg-center bg-gray-800 rounded-sm p-1 cursor-pointer flex flex-col justify-between"
            >
              <div className="w-full mx-auto bg-gray-900 text-white text-[14px] text-center py-[0.3em] px-[0.6em] rounded-sm font-bold ">
                Inception 2010
              </div>

              <div className="flex items-center bg-gray-900 text-white gap-1 self-start p-1  rounded-sm">
                <IoStar className="text-yellow-500 w-4 h-4 mb-0.5" />
                <span className="font-bold text-sm sm:text-base">8.8</span>
              </div>
            </div>
          </div>
          <div className="w-54 flex-shrink-0">
            <div
              style={{ backgroundImage: `url('/background.jpg')` }}
              className="w-full aspect-[2/3] bg-cover bg-center bg-gray-800 rounded-sm p-1 cursor-pointer flex flex-col justify-between"
            >
              <div className="w-full mx-auto bg-gray-900 text-white text-[14px] text-center py-[0.3em] px-[0.6em] rounded-sm font-bold ">
                Inception 2010
              </div>

              <div className="flex items-center bg-gray-900 text-white gap-1 self-start p-1  rounded-sm">
                <IoStar className="text-yellow-500 w-4 h-4 mb-0.5" />
                <span className="font-bold text-sm sm:text-base">8.8</span>
              </div>
            </div>
          </div>
             
        </div>
        </div>
      </div>
    </>
  );
}

export default MovieInfo;
