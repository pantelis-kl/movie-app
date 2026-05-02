// import hooks
import useFetch from "../hooks/useFetch";
import { useState } from "react";

//import components
import LoadingSkeleton from "./LoadingSkeleton";

//import loading skeleton theme
import { SkeletonTheme } from "react-loading-skeleton";

//import iconsimport
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft,faArrowRight} from '@fortawesome/free-solid-svg-icons'

//export api key
export const apiKey=import.meta.env.VITE_TMDB_API_KEY;

export default function TrendingComp(){

    const [data,loading,error]=useFetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`);
    const [lowEnd,setLowEnd]=useState(0)
    const [upperEnd,setUpperEnd]=useState(8);
    const [rightButton,setRightButton]=useState(true)
    const [leftButton,setLeftButton]=useState(false);

    const getNextMovies=()=>{
        const count=upperEnd+7;
        setLowEnd(l=>l+7);
        setUpperEnd(count);
        setLeftButton(true)
        if(count>20){
            setRightButton(false);
        }
    }

    const getPreviousMovies=()=>{
        const count=lowEnd-7;
        setLowEnd(count)
        setUpperEnd(u=>u-7)
        setRightButton(true)
        if(count===0)
            setLeftButton(false);
    }

    return(
        <div className="mt-7 w-full ml-5">
            <h1 className="text-[white] text-[35px]">Trending this week</h1>
            <div className="flex flex-row items-center justify-center">
                {leftButton?<FontAwesomeIcon icon={faArrowLeft} onClick={getPreviousMovies} className="right-left-buttons translate-x-10"/>
                :null}
                <div className="grid grid-cols-20 w-full mt-5 gap-x-60 ml-5">
                    {loading ? (
                        <SkeletonTheme baseColor="#202020" highlightColor="#444">
                            <div className="grid grid-cols-10 w-80 gap-x-55">
                                {Array.from({ length: 10 }).map((_, index) => (
                                    <LoadingSkeleton width="200px" height="200px" key={index} />
                                ))}
                            </div>
                        </SkeletonTheme>
                    ) : (
                        data &&
                        data.results.slice(lowEnd,upperEnd).map((movie) => (
                            <div
                                className="flex flex-col w-55 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shadow-black/30 rounded-xl overflow-hidden z-10
                                cursor-pointer hover:border-3 hover:border-white transition-border duration-200"
                                key={movie.id}
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                                    className="w-full h-60"
                                />
                                <h2 className="text-[white] text-[20px]">{movie.title}</h2>
                            </div>
                        ))
                    )}
                </div>
                {rightButton?<FontAwesomeIcon icon={faArrowRight} className="right-left-buttons -translate-x-23" onClick={getNextMovies}/>
                :null}
            </div>
        </div>
    )
}