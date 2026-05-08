//import hooks
import useFetch from "../hooks/useFetch";

//import api key
import { apiKey } from "../constants/constants";

//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay,faBookmark } from "@fortawesome/free-solid-svg-icons";

//import link
import { Link } from "react-router-dom";

//import components
import TrailerPage from "./TrailerPage";

export default function HeroSection(){
   const[data,loading,error]=useFetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`);

   return(
      error?
        <div className="flex items-center justify-center w-full">
            <p className="text-red-600 text-[30px]">{error}</p>
        </div>:

        <div className="w-full flex flex-col items-center justify-center mt-5">
            {loading?
               <div></div>
            :
                data && 
               <div className="relative w-full h-[80vh] overflow-hidden lg:h-[85vh]">
                    <img 
                    src={`https://image.tmdb.org/t/p/original${data.results[0].backdrop_path}`} 
                    alt={data.results[0].title}
                    className="w-full h-full object-cover object-top lg:object-center z-10"/>
                    <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-black/20" />
                    <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a]/70 via-transparent to-transparent" />
                    <h1 className="absolute z-50 left-8 sm:left-16 text-white font-black leading-tight tracking-tighter drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] animate-fadeIn
                    top-[20%] text-[32px] max-w-[90%] 
                    sm:top-[25%] sm:text-[50px] sm:max-w-[70%]
                    lg:top-[15%] lg:text-[70px] lg:max-w-[50%]">
                        {data.results[0].title}
                    </h1>
                    <h3 className="absolute left-8 sm:left-16 text-white animate-fadeIn
                    top-[38%] text-[14px] max-w-[85%] line-clamp-5
                    sm:top-[42%] sm:text-[18px] sm:max-w-[60%]
                    lg:top-[35%] lg:text-[22px] lg:max-w-[45%]">
                        <span className="font-bold text-blue-500 mr-2">Overview:</span>
                            {data.results[0].overview}
                    </h3>
                    <h2 className="text-white left-8 font-black absolute font-sans uppercase tracking-widest bg-red-600/20 backdrop-blur-md border border-red-500/40 shadow-[0_0_20px_rgba(220,38,38,0.3)]
                    text-[25px] top-[60%]
                    sm:top-[65%] sm:left-15 sm:text-[25px]
                    lg:top-[60%] lg:text-[60px] px-4 py-1 rounded-md">
                        Now In Cinemas
                    </h2>
                    <div className="flex flex-row gap-4 absolute left-8 sm:left-16 z-10
                    bottom-[10%] sm:bottom-auto
                    top-[85%] sm:top-[75%] lg:top-[80%]">
                        <Link to={data.results[0].id.toString()}>
                            <button className="flex items-center gap-2 bg-green-600 hover:bg-green-500 
                          text-white px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg 
                            font-bold text-sm sm:text-base lg:text-lg cursor-pointer z-10
                            transition-all duration-300 active:scale-95 
                            shadow-[0_0_20px_rgba(37,99,235,0.4)]">Watch Trailer <FontAwesomeIcon icon={faPlay} 
                            onClick={()=><TrailerPage id={data.results[0].id}/>}/>
                            </button>
                        </Link>
                        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 
                          text-white px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg 
                            font-bold text-sm sm:text-base lg:text-lg cursor-pointer z-10
                            transition-all duration-300 active:scale-95 
                            shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                            Add to Watchlist <FontAwesomeIcon icon={faBookmark}/>
                        </button>
                    </div>
               </div>
            }
        </div>
   )
}