//import hooks
import useFetch from "../hooks/useFetch";

//import api key
import { apiKey } from "../constants/constants";

//import functions
import getRating from "../utils/getRating";
import getStars from "../utils/getStars";

//import link
import {Link} from 'react-router-dom';

export default function SearchResults({debouncedValue}){
    const [data,loading,error]=useFetch(debouncedValue?
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${debouncedValue}&page=1`:'');

        if(debouncedValue.trim()==="" || !debouncedValue) return null;

    return(
        error?(
            <div className="flex items-center justify-center w-full">
                <p className="text-red-600 text-[30px]">{error}</p>
            </div>
  ):(
       <div className="absolute top-full left-0 w-full mt-3 max-h-112.5 overflow-y-auto z-50 
                    bg-[#000000c9] backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]
                    scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
           {loading?(
             <div></div>
           ):(
            <div className="flex flex-col p-2 gap-1">
             {(data && data.results.length>0) ? data.results.map(movie=>
             <Link to={`movie/${movie.id}`} key={movie.id}>
                <div className="group flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300
                 hover:bg-white/10 hover:shadow-inner border border-transparent hover:border-white/5">
                    <div className="w-10 h-14 bg-white/5 rounded-md border border-white/10 shrink-0 
                    shadow-inner flex flex-row items-center justify-center overflow-hidden">
                        {movie.poster_path?
                          <img src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`} alt={movie.title}
                          className="w-full h-full transition-all group-hover:scale-120"/>
                        :movie.backdrop_path?
                            <img src={`https://image.tmdb.org/t/p/w92${movie.backdrop_path}`} alt={movie.title}
                            className="w-full h-full transition-all group-hover:scale-120"/>
                    :''}
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-white text-[12px] sm:text-sm lg:text-sm font-semibold">{movie.title}</h3>
                        <div className="flex flex-row gap-x-2">
                            <h4 className="text-white/60 text-[12px] sm:text-[13px] lg:text-[13px]">{getStars(movie.vote_average)}({getRating(movie.vote_average.toFixed(1))})</h4>
                            <h4 className="text-white/60 self-center text-[12px]">{movie.release_date.slice(0,movie.release_date.indexOf('-'))}</h4>
                        </div>
                    </div>
                </div>
                </Link>
             ):(
                <div className="flex items-center justify-center">
                    <h3 className="text-white/40 text-[25px]">No results</h3>
                </div>
             )}
             </div>
           )}
       </div>
  )
    )
}