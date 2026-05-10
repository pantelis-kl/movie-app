//import hooks
import useFetch from "../hooks/useFetch";
import {useContext, useRef,useState,useEffect} from 'react'
import { appContext } from "../AppContext";

//import api key
import { apiKey } from "../constants/constants";

//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay,faBookmark} from "@fortawesome/free-solid-svg-icons";

//import link
import { Link } from "react-router-dom";

//import motion
import {motion,AnimatePresence} from 'framer-motion';

//import loading skeleton
import Skeleton,{SkeletonTheme} from "react-loading-skeleton";

export default function HeroSection(){
const[data,loading,error]=useFetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`);
const {addToWatchlist}=useContext(appContext);
const [feedbackMessage,setFeedbackMessage]=useState('');
const timeRef=useRef(null);
const intervalId=useRef(null);
const [activeIndex,setActiveIndex]=useState(0);

useEffect(()=>{
    intervalId.current=setInterval(()=>{
        let currentIndex=activeIndex+1;
        if(currentIndex===5)
            currentIndex=0;
        setActiveIndex(currentIndex)
    },8000);
    return ()=>{clearInterval(intervalId.current)}
},[activeIndex])

const triggerFeedback=(message)=>{
        const currentMessage=message(data.results[activeIndex]);
        setFeedbackMessage(currentMessage);
        clearTimeout(timeRef.current);
        timeRef.current = setTimeout(() => setFeedbackMessage(""), 1300);
    }

    const changeActiveIndex=(index)=>{
        const currentIndex=index;
        setActiveIndex(currentIndex)
    }

return(
    error?
        <div className="flex items-center justify-center w-full">
            <p className="text-red-600 text-[30px]">{error}</p>
        </div>:

        <div className="w-full flex flex-col mt-5">
            {loading?
            <div className="flex flex-col items-center justify-center">
                <div className="w-full h-[90vh] lg:h-[85vh]">
                <SkeletonTheme baseColor="#202020" highlightColor="#444">
                <div className="absolute inset-0">
                     <Skeleton height="100%" width="100%" containerClassName="h-full w-full" />
                </div>
                </SkeletonTheme>
                <SkeletonTheme baseColor="#333" highlightColor="#444">
                    <h1 className="w-60 text-[38px] absolute left-8 
                    sm:left-16 sm:w-80 top-[30%] sm:text-[45px]
                     lg:top-[35%] lg:text-[55px] lg:w-120"><Skeleton/></h1>
                    <h3 className="w-80 text-[20px] absolute top-[40%] self-start left-8
                    sm:left-16 sm:text-[25px] sm:w-100
                    lg:top-[45%] lg:text-[28px] lg:w-140">
                        <Skeleton count={3}/>
                    </h3>
                    <h2 className="absolute w-80 top-[60%] text-[50px] left-8
                    sm:left-16 sm:text-[57px] sm:w-110
                    lg:text-[65px] lg:top-[65%] lg:w-130">
                        <Skeleton/>
                    </h2>
                    <div className="flex flex-row gap-4 absolute left-8 
                    sm:left-16 bottom-[13%]">
                        <button className="w-35 text-[30px]
                        sm:w-40 sm:text-[40px]
                        lg:w-50 lg:text-[50px]">
                            <Skeleton/>
                        </button>
                        <button className="w-35 text-[30px]
                        sm:w-40 sm:text-[40px]
                        lg:w-50 lg:text-[50px]">
                            <Skeleton/>
                        </button>
                    </div>
                </SkeletonTheme>
            </div>
            </div>
            :
                data && 
            <div className="relative w-full h-[80vh] overflow-hidden lg:h-[85vh]">
                    <AnimatePresence mode="wait">
                        <motion.img key={activeIndex} src={`https://image.tmdb.org/t/p/original${data.results[activeIndex].backdrop_path}`}
                        alt={data.results[activeIndex].title}
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full object-cover object-top lg:object-center z-10"/>
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-black/20" />
                    <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a]/70 via-transparent to-transparent" />
                    <div className="z-20 relative w-full h-full">
                        <h1 className="absolute z-10 left-8 sm:left-16 text-white font-black leading-tight tracking-tighter drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] animate-fadeIn
                    top-[20%] text-[32px] max-w-[90%] 
                    sm:top-[25%] sm:text-[50px] sm:max-w-[70%]
                    lg:top-[15%] lg:text-[70px] lg:max-w-[50%]">
                        {data.results[activeIndex].title}
                    </h1>
                    <h3 className="absolute left-8 sm:left-16 text-white animate-fadeIn
                    top-[38%] text-[14px] max-w-[85%] line-clamp-5
                    sm:top-[42%] sm:text-[18px] sm:max-w-[60%]
                    lg:top-[35%] lg:text-[22px] lg:max-w-[45%]">
                        <span className="font-bold text-blue-500 mr-2">Overview:</span>
                            {data.results[activeIndex].overview}
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
                        <Link to={data.results[activeIndex].id.toString()}>
                            <button className="flex items-center gap-2 bg-green-600 hover:bg-green-500 
                        text-white px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg 
                            font-bold text-sm sm:text-base lg:text-lg cursor-pointer z-10
                            transition-all duration-300 active:scale-95 
                            shadow-[0_0_20px_rgba(37,99,235,0.4)]">Watch Trailer <FontAwesomeIcon icon={faPlay}/>
                            </button>
                        </Link>
                        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 
                        text-white px-6 py-5 sm:px-8 sm:py-3 rounded-lg 
                            font-bold text-sm sm:text-base lg:text-lg cursor-pointer z-10
                            transition-all duration-300 active:scale-95 
                            shadow-[0_0_20px_rgba(37,99,235,0.4)]" onClick={()=>triggerFeedback(addToWatchlist)}>
                            Add to Watchlist <FontAwesomeIcon icon={faBookmark}/>
                        </button>
                        {feedbackMessage && (
                        <div className="absolute -top-10 left-50 bg-blue-600 text-white text-[12px] font-bold px-3 py-2 rounded-full shadow-lg z-50
                        lg:left-70">
                            {feedbackMessage}
                        </div>
                    )}
                    </div>
                    </div>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30 px-4 py-2 rounded-full bg-black/30 backdrop-blur-md border border-white/10 shadow-2xl">
                        {[...Array(5)].map((_, index) => (
                            <div
                                key={index}
                                className={`transition-all duration-500 rounded-full cursor-pointer hover:w-8 ${
                                    index === activeIndex 
                                    ? "w-8 h-2 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" 
                                    : "w-2 h-2 bg-white/40"
                                }`}
                                onClick={()=>changeActiveIndex(index)}
                            />
                        ))}
                    </div>
            </div>
            }
        </div>
)
}