// import hooks
import useFetch from "../hooks/useFetch";
import { useState,useEffect,useRef } from "react";

//import functions
import getStars from "../utils/getStars";

//import components
import LoadingSkeleton from "./LoadingSkeleton";

//import loading skeleton theme
import Skeleton,{ SkeletonTheme } from "react-loading-skeleton";

//import icons
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft,faArrowRight,faStar} from '@fortawesome/free-solid-svg-icons';

//import routes
import { Link } from "react-router-dom";

//import api key
import { apiKey } from "../constants/constants";

export default function TrendingComp(){

    const [data,loading,error]=useFetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`);
    const [genresData]=useFetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)
    const [lowEnd,setLowEnd]=useState(0);
    const [upperEnd,setUpperEnd]=useState(8);
    const [rightButton,setRightButton]=useState(true);
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

    const getRating=(rating)=>{
        rating=Number(rating)
        if(rating===0.0)
            return 'No rating found';
        return rating;
    }

    const getGenres=(genreId)=>{
        const genreLength=genresData.genres.length;
        let genresArr=[]
        for(let i=0;i<genreId.length;i++){
            for(let j=0;j<genreLength;j++){
                if(genreId[i]===genresData.genres[j].id)
                    genresArr.push(genresData.genres[j].name)
            }
        }
        return genresArr;
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
                transition-all duration-200 absolute left-0.5 translate-x-2 lg:block!"/>
                :null}
                <div className="grid grid-cols-2 w-full mt-5 gap-y-4
                sm:grid-cols-3
                lg:grid-cols-20 lg:gap-x-60 lg:ml-5">
                    {loading ? (
                        <SkeletonTheme baseColor="#202020" highlightColor="#444">
                            <div className="grid grid-cols-2 gap-y-3 gap-x-55 md:grid-cols-3 lg:grid-cols-10">
                                {Array.from({ length: 10 }).map((_, index) => (
                                    <div className="flex flex-col bg-white/10 w-50 backdrop-blur-md border border-white/20 shadow-lg overflow-hidden rounded-xl" 
                                    key={index}>
                                        <LoadingSkeleton width="200px" height="200px"/>
                                        <h1><LoadingSkeleton width='100px' height='20px'/></h1>
                                        <h3><LoadingSkeleton width='70px' height='18px' className="mb-2"/></h3>
                                        <div className="flex flex-row flex-wrap">
                                            {Array.from({length:3}).map((_,i)=>(
                                                <h3 key={i}><Skeleton width='70px' height='25px' className="rounded-full ml-2 mt-3"/></h3>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </SkeletonTheme>
                    ) : (
                        data &&
                        data.results.slice(lowEnd,upperEnd).map((movie) => (
                            <div
                                className="flex flex-col shrink-0 w-45 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shadow-black/30 rounded-xl overflow-hidden z-10
                                cursor-pointer hover:border-3 hover:border-white transition-all duration-200 animate-fadeIn
                                sm:w-50 lg:w-55"
                                key={movie.id}
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                                    className="w-full h-60 object-cover"
                                />
                                <h2 className="text-[white] text-[17px] sm:text-[19px] lg:text-[20px]">{movie.original_title}</h2>
                                <h3
                                className="text-white text-[13px] mt-0.1 sm:text-[15px] lg:text-[16px]">
                                    {getStars(movie.vote_average)}({getRating(movie.vote_average.toFixed(1))})
                                </h3>
                                <h3>{getGenres(movie.genre_ids).map((genre,index)=>
                                    <div className="inline-flex items-center justify-center mt-2 ml-2 px-2 py-1 rounded-full 
                                     bg-white/10 backdrop-blur-md border border-white/30 shadow-[0_4px_15px_rgba(255,255,255,0.1)] cursor-default
                                     lg:px-4 sm:px-3"  
                                     key={index}
                                      >
                                        <h3 className="text-white/90 text-[12px] font-medium tracking-wide sm:text-[14px] lg:text-sm">{genre}</h3>
                                   </div>
                                )}</h3>
                            </div>
                        ))
                    )}
                </div>
                {rightButton?<FontAwesomeIcon icon={faArrowRight} 
                className="hidden! text-white p-4 text-[20px] bg-blue-600 rounded-full z-40 cursor-pointer shadow-[17px_17px_20px_black] hover:bg-blue-700
                transition-all duration-200 absolute right-0.5 -translate-x-5 lg:block!" onClick={getNextMovies}/>
                :null}
            </div>
        </div>
    )
}