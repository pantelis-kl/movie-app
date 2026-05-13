//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay,faHeart,faBookmark } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

//import hooks
import { useContext, useRef, useState } from "react";
import { appContext } from "../AppContext";

export default function DetailButtons({data,classname}){

    const {addToFavourites,addToWatchlist}=useContext(appContext);
    const [feedback,setFeedback]=useState('');  
    const timeRef=useRef(null)

    const triggerFeedback=(action)=>{
        const currentMessage=action(data);
        setFeedback(currentMessage)
        clearInterval(timeRef.current);
        timeRef.current=setInterval(()=>setFeedback(''),1300);
    }

    return(
        <div className={`${classname} flex flex-wrap gap-3 justify-center w-full mt-10 px-2`}>
  <Link 
    to={`/trailer/${data.id}`}
    className="flex-1 min-w-35 sm:flex-none flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-3.5 rounded-xl font-bold text-sm lg:text-lg transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] active:scale-95"
  >
    <span>TRAILER</span>
    <FontAwesomeIcon icon={faPlay} className="text-[10px] sm:text-[15px] opacity-80" />
  </Link>
  <div className="flex gap-2 w-full sm:w-auto relative">
    
    {feedback && (
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-2xl animate-in fade-in zoom-in duration-300">
        {feedback}
      </div>
    )}
    <button 
      onClick={() => triggerFeedback(addToWatchlist)}
      className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md text-white px-5 py-3.5 rounded-xl font-bold text-xs lg:text-base transition-all duration-300 active:scale-95 group"
    >
      <FontAwesomeIcon icon={faBookmark} className="text-blue-400 text-[10px] sm:text-[15px]" />
      <span className="uppercase tracking-wider">Watchlist</span>
    </button>
    <button 
      onClick={() => triggerFeedback(addToFavourites)}
      className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md text-white px-5 py-3.5 rounded-xl font-bold text-xs lg:text-base transition-all duration-300 active:scale-95 group"
    >
      <FontAwesomeIcon icon={faHeart} className="text-red-500 text-[10px] sm:text-[15px]" />
      <span className="uppercase tracking-wider">Favourite</span>
    </button>
  </div>
</div>
    )
}