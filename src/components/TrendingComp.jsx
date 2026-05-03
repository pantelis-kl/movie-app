// import hooks
import useFetch from "../hooks/useFetch";
import { useState,useEffect,useRef } from "react";

//import components
import LoadingSkeleton from "./LoadingSkeleton";

//import loading skeleton theme
import { SkeletonTheme } from "react-loading-skeleton";

//import icons
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft,faArrowRight} from '@fortawesome/free-solid-svg-icons';

//import routes
import { Link } from "react-router-dom";

//import api key
import { apiKey } from "../constants/constants";

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
            <div className="flex flex-row">
                <h1 className="text-[white] text-[22px] sm:text-[28px] lg:text-[35px]">Trending this week</h1>
                <Link to='trending'
                className="self-end absolute right-10 text-white text-[17px] sm:text-[19px] lg:text-[20px] hover:text-[#e7e7e7] hover:underline transition-all duration-200">
                View All</Link>
            </div>
            <div className="flex flex-row items-center justify-center">
                {leftButton?<FontAwesomeIcon icon={faArrowLeft} onClick={getPreviousMovies} 
                className="hidden! text-white p-4 text-[20px] bg-blue-600 rounded-full z-40 cursor-pointer shadow-[17px_17px_20px_black] hover:bg-blue-700
                transition-all duration-200 relative bottom-80 translate-x-10 lg:block!"/>
                :null}
                <div className="grid grid-cols-2 grid-rows-3 w-full mt-5 gap-y-4
                sm:grid-cols-3
                lg:grid-cols-20 lg:gap-x-60 lg:ml-5">
                    {loading ? (
                        <SkeletonTheme baseColor="#202020" highlightColor="#444">
                            <div className="grid grid-cols-2 gap-y-3 gap-x-55 md:grid-cols-3 lg:grid-cols-10">
                                {Array.from({ length: 10 }).map((_, index) => (
                                    <div className="flex flex-col bg-white/10 h-60 w-50 backdrop-blur-md border border-white/20 shadow-lg overflow-hidden rounded-xl" 
                                    key={index}>
                                        <LoadingSkeleton width="200px" height="200px"/>
                                        <h1><LoadingSkeleton width='100px' height='20px'/></h1>
                                    </div>
                                ))}
                            </div>
                        </SkeletonTheme>
                    ) : (
                        data &&
                        data.results.slice(lowEnd,upperEnd).map((movie) => (
                            <div
                                className="flex flex-col w-45 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shadow-black/30 rounded-xl overflow-hidden z-10
                                cursor-pointer hover:border-3 hover:border-white transition-all duration-200 animate-fadeIn
                                sm:w-50 lg:w-55"
                                key={movie.id}
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                                    className="w-full h-60 object-cover"
                                />
                                <h2 className="text-[white] text-[17px] sm:text-[19px] lg:text-[20px]">{movie.original_title}</h2>
                                
                            </div>
                        ))
                    )}
                </div>
                {rightButton?<FontAwesomeIcon icon={faArrowRight} 
                className="hidden! text-white p-4 text-[20px] bg-blue-600 rounded-full z-40 cursor-pointer shadow-[17px_17px_20px_black] hover:bg-blue-700
                transition-all duration-200 relative bottom-80 -translate-x-23 lg:block!" onClick={getNextMovies}/>
                :null}
            </div>
        </div>
    )
}