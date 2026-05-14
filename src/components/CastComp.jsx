//import hooks
import useFetch from "../hooks/useFetch";

//import api key
import { apiKey } from "../constants/constants";

//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function CastComp({id}){
    const [data]=useFetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`);

    return(
        <div className="flex flex-col mt-7">
            <div className="flex items-center gap-4">
                <h3 className="text-2xl lg:text-3xl font-serif font-bold text-white italic tracking-tight">
                Cast
                </h3>
          <div className="h-px flex-1 bg-linear-to-r from-white/20 to-transparent" />
          </div>
          <div className="flex flex-row overflow-x-auto snap-x no-scrollbar gap-2 lg:gap-x-5">
            {data && 
              data.cast.slice(0,15).map(c=>
                <div className="flex flex-col p-2 gap-3 min-w-30 sm:min-w-35 lg:min-w-40 rounded-2xl items-center justify-center bg-white/3 backdrop-blur-xl border border-white/10 
             hover:bg-white/8 hover:border-white/20 transition-all duration-500 group shadow-2xl" key={c.id}>
                    {c.profile_path?
                      <img src={`https://image.tmdb.org/t/p/w185/${c.profile_path}`} 
                      className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full object-cover border-2 border-white/10 p-1 shadow-2xl transition-transform duration-500 group-hover:scale-105"/>  
                    :
                    <div className="w-24 h-24 lg:w-30 lg:h-30 rounded-full flex flex-col items-center justify-center 
                  bg-white/3 backdrop-blur-md border border-white/10 shadow-inner group">
                        <FontAwesomeIcon 
                        icon={faUser} 
                        className="text-white/20 text-2xl lg:text-3xl mb-1" />
                    </div>
                    }
                    <div className="flex flex-col  text-center">
                        <h3 className="text-white font-serif font-bold italic text-base lg:text-lg tracking-tight leading-tight ">
                        {c.name}
                        </h3>
                        <h4 className="text-white/40 font-sans font-medium text-[10px] lg:text-xs uppercase tracking-[0.15em] mt-1 line-clamp-1">
                            {c.character}
                        </h4>
                    </div>
                </div>
              )
            }
          </div>
        </div>
    )

}