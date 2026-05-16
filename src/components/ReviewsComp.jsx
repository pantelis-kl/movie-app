//import hooks
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";

//import api key
import { apiKey } from "../constants/constants";

//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

//import functions
import getStars from '../utils/getStars.jsx';

//import loading skeleton
import Skeleton,{SkeletonTheme} from "react-loading-skeleton";

export default function ReviewsComp({id,loading}){
    const [data]=useFetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${apiKey}`);
    const [lowerEnd,setLowerEnd]=useState(0);
    const [upperEnd,setUpperEnd]=useState(2);
    const [moreButton,setMoreButton]=useState(true);
    
    useEffect(()=>{
        if(data && (upperEnd>=data.results.length)){
            setMoreButton(false)
        }
    },[upperEnd])

    const loadComments=()=>{
        setUpperEnd(u=>u+2)
    }

    const hideComments=()=>{
        setUpperEnd(2);
        setMoreButton(true);
    }

    return(
        <>
        {loading?
        <div className="flex flex-col items-center justify-center gap-y-2 mt-7 mb-6">
            <SkeletonTheme baseColor="#333" highlightColor="#444">
                <div className="flex items-center gap-5">
            <span className="px-4 w-40 text-3xl lg:w-40 lg:px-3 py-1 lg:py-2 rounded-full lg:text-2xl">
                <Skeleton/>
            </span>
            <h2 className="text-xl w-20 lg:w-40 lg:text-2xl">
                <Skeleton/>
            </h2>
            </div>
            <div className="flex flex-col gap-y-5">
                {Array.from({length:2}).map((_,index)=>
                   <div className="flex flex-col items-start p-5 gap-4 rounded-2xl bg-zinc-950/20 backdrop-blur-xl border border-white/10 relative overflow-hidden" key={index}>
                    <div className="flex flex-row items-center lg:justify-center gap-x-3">
                        <span className="w-15 text-5xl lg:w-20 lg:text-6xl">
                            <Skeleton circle/>
                        </span>
                        <div className="flex flex-col gap-y-2">
                    <h4 className=" w-30 lg:text-2xl">
                        <Skeleton/>
                    </h4>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/40 backdrop-blur-md border border-white/5 shadow-inner select-none">
                            <h5 className="w-20 text-2xl">
                                <Skeleton/>
                            </h5>
                        </div>
                    </div>
                    </div>
                    <p className="w-40 sm:w-120 lg:w-200 text-xl">
                     <Skeleton count={4}/>
                  </p>
                  <h4 className="text-[17px] lg:text-[20px] w-20"><Skeleton/></h4>
                </div>
                )}
            </div>
            </SkeletonTheme>
        </div>
        :
        <div className="flex flex-col items-center justify-center gap-y-2 mt-7 mb-6">
  {data && (
            <div className="flex items-center gap-5">
            <span className="px-4 text-center lg:px-3 py-1 lg:py-2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-sans font-black text-[11px] lg:text-xs uppercase tracking-widest">
                {data.results.length} Comments
            </span>
            <h2 className="text-[17px] lg:text-2xl font-serif font-bold text-white italic tracking-tight">
                Community Activity
            </h2>
            </div>
        )}
        <p className="text-xs font-sans font-medium text-white/40 tracking-wide pl-1">
            Verified feedback from audience members and critics.
        </p>
        <div className="flex flex-col gap-y-5">
            {(data && data.results.length>0)?(
              data.results.slice(lowerEnd,upperEnd).map(review=>
                <div className="flex flex-col items-start p-5 gap-4 rounded-2xl bg-zinc-950/20 backdrop-blur-xl border border-white/10 
             hover:bg-zinc-950/40 hover:border-white/20 transition-all duration-500 group shadow-2xl relative overflow-hidden animate-fadeIn" key={review.id}>
                 <div className="flex flex-row items-center lg:justify-center gap-x-3">
                    {review.author_details.avatar_path?
                      <img src={`https://image.tmdb.org/t/p/w185/${review.author_details.avatar_path}`} alt={`${review.author}'s avatar`}
                      className="w-15 h-15 lg:w-17 lg:h-17 rounded-full object-cover p-1 border-2 border-white/10"/> 
                   :<div
                  className="w-13 h-13 lg:w-15 lg:h-15 rounded-full flex flex-col items-center justify-center 
                  bg-white/3 backdrop-blur-md border border-white/10 shadow-inner group"
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-white/20 text-2xl lg:text-3xl mb-1"
                  />
                </div>}
                <div className="flex flex-col gap-y-2">
                    <h4 className="text-white font-serif font-bold italic text-base lg:text-lg tracking-tight leading-none group-hover:text-emerald-400 transition-colors duration-300">
                        {review.author}
                    </h4>
                    {review.author_details.rating?
                       <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/40 backdrop-blur-md border border-white/5 shadow-inner select-none">
                            <h5 className="flex items-center gap-0.5 text-amber-400 text-xs lg:text-sm">
                                {getStars(review.author_details.rating)}
                            </h5>
                            <span className="w-px h-3 bg-white/10 mx-0.5" />
                            <span className="font-sans font-black text-sm lg:text-xl text-white/90 tracking-wide">
                                {review.author_details.rating}
                                <span className="text-[10px] lg:text-[13px] text-white/30 font-medium tracking-normal">/10</span>
                            </span>
                        </div>
                     :
                       <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/40 backdrop-blur-md border border-white/5 shadow-inner select-none">
                          <p className="text-white text-[18px]">Unrated</p>
                       </div>
                     }
                </div>
                 </div>
                  <p className="max-w-[95%] font-sans font-normal text-sm lg:text-base text-white leading-relaxed tracking-wide line-clamp-5 selection:bg-emerald-500/30">
                     {review.content}
                  </p>
                  <h4 className="text-white/60 font-mono text-[15px]">{review.created_at.slice(0,review.created_at.indexOf('T'))}</h4>
                </div>
              )
        ):''}
        {(data && data.results.length>2) ?
           moreButton?(
              <button className="group self-center mt-8 px-8 py-3 rounded-full bg-white/5  cursor-pointer
          backdrop-blur-md border border-white/10 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all duration-500 shadow-xl"
          onClick={loadComments}>
            <span className="text-xs font-sans font-black uppercase tracking-[0.2em] text-white/50 group-hover:text-emerald-400 transition-colors duration-300">
                View More
            </span>
            </button>
           ):(
              <button className="group self-center mt-8 px-8 py-3 rounded-full bg-white/5  cursor-pointer
          backdrop-blur-md border border-white/10 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all duration-500 shadow-xl"
          onClick={hideComments}>
            <span className="text-xs font-sans font-black uppercase tracking-[0.2em] text-white/50 group-hover:text-emerald-400 transition-colors duration-300">
                View Less
            </span>
            </button>
           )
        :''}
        </div>
        
        </div>
    }</>
    )
}