//import hooks
import useFetch from "../hooks/useFetch";
import {useState} from 'react'

//import api key
import { apiKey } from "../constants/constants";

//import navigation link
import { Link } from "react-router-dom";

//import functions
import getReleaseDate from "../utils/getReleaseDate";
import getGenres from "../utils/getGenres";

//import components
import WatchlistIcons from "./WatchlistIcons";

export default function UpcomingComp(){
    const todaysDate = new Date().toISOString().split('T')[0];
    const [data,loading,error]=useFetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_date.gte=${todaysDate}`);
    const [genresData]=useFetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
    const [lowerEnd,setLowerEnd]=useState(0);
    const [upperEnd,setUpperEnd]=useState(8);
    console.log(data)

    return(
        error?
          <div className="flex items-center justify-center w-full">
                <p className="text-red-600 text-[30px]">{error}</p>
            </div>:

            <div className="mt-10 ml-5 w-full pb-2">
                <div className="flex flex-row">
                    <h1 className="text-white text-[22px] sm:text-[28px] lg:text-[35px]">Upcoming Movies</h1>
                    <Link to='upcoming' className="self-end absolute right-10 text-white text-[19px] sm:-translate-x-10 sm:text-[20px] lg:text-[22px]
                 hover:text-[#e7e7e7] hover:underline transition-all duration-200">
                        View All
                    </Link>
                </div>
                <div className="flex w-full flex-row mt-5 gap-y-4 flex-wrap  gap-x-5 lg:gap-x-3
                sm:gap-x-5 sm:ml-5 lg:flex-row lg:ml-5 lg:flex-nowrap">
                    {loading?
                        <div></div>    
                     :
                        data && data.results.slice(lowerEnd,upperEnd).map((movie=>
                            <div className="flex w-45 bg-white/10 flex-col backdrop-blur-md border border-white/20 shadow-lg shadow-black/30 rounded-xl overflow-hidden z-10 pb-2
                            group cursor-pointer transition-all duration-200 animate-fadeIn
                            sm:w-50 lg:w-55" key={movie.id}>
                                <img 
                                src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} alt="movie-poster"
                                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                                <h2 className="text-white text-[17px] mt-2 leading-tight sm:text-[19px] lg:text-[20px]">{movie.title}</h2>
                                <p className="text-white/50 text-[12px] sm:text-[13px] mt-1 font-medium italic">{getReleaseDate(movie.release_date)}</p>
                                    <div>{getGenres(movie.genre_ids,genresData).map((genre,index)=>
                                        <div className="inline-flex items-center justify-center mt-2 ml-2 px-2 py-1 rounded-full 
                                            bg-white/10 backdrop-blur-md border border-white/30 shadow-[0_4px_15px_rgba(255,255,255,0.1)] cursor-default
                                            lg:px-4 sm:px-3"  
                                            key={index}>
                                            <h3 className="text-white/90 text-[12px] font-medium tracking-wide sm:text-[14px] lg:text-sm">{genre}</h3>
                                        </div>)}  
                                </div>
                                <WatchlistIcons movie={movie}/>
                            </div>
                        ))
                     }
                </div>
            </div>
    )

    return
}