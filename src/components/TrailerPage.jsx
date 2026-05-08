//import hooks
import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import {useState,useEffect} from 'react'

//import api key
import { apiKey } from "../constants/constants";

//import loading skeleton
import LoadingSkeleton from "./LoadingSkeleton";
import { SkeletonTheme } from "react-loading-skeleton";

export default function TrailerPage(){
    
    const {id}=useParams();
    const [data,loading,error]=useFetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`);
    const [trailer,setTrailer]=useState('');

    useEffect(()=>{
        if(data){
            const officialTrailer=data.results.find(r=>r.type==="Trailer" && r.site==="YouTube")
            if(officialTrailer){
                setTrailer(officialTrailer.key)
            }
       
        }
    },[data])

    return(
        error?
          <div className="flex items-center justify-center w-full">
            <p className="text-red-600 text-[30px]">{error}</p>
        </div>
          : 

          loading?
        <div className="flex items-center justify-center">
            <SkeletonTheme  baseColor="#202020" highlightColor="#444">
                <LoadingSkeleton width='1500px' height='700px'/>
            </SkeletonTheme>
        </div>
        :

        trailer?
          <div className="flex items-center justify-center mt-5">
            <iframe allowFullScreen src={`https://www.youtube.com/embed/${trailer}`}
            className="w-full h-100
            sm:h-150
            lg:w-[80%] lg:h-[80vh]"
            title="Movie Trailer">
            </iframe>
        </div>
        :

          <div className="flex items-center justify-center mt-5 flex-col
          lg:flex-row">
            <h1 className="text-red-600 text-[30px] sm:text-[40px] lg:text-[50px]">Couldn't find the trailer.</h1>
            <h1 className="text-red-600 text-[30px] sm:text-[40px] lg:text-[50px] ">  Go back to
                 <Link to='/' className="underline text-blue-400">Home</Link></h1>
          </div>
    )
}