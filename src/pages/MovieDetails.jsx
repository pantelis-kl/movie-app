//import hooks
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

//import api key
import { apiKey } from "../constants/constants";

//import functions
import getGenres from "../utils/getGenres";

//import components
import RatingBadge from "../components/RatingBadge";

export default function MovieDetails(){
    const {id}=useParams();
    const [data,loading,error]=useFetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
    const [genresData] = useFetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
    console.log(data)

    return(
        error?
          (
        <div className="flex items-center justify-center w-full">
            <p className="text-red-600 text-[30px]">{error}</p>
        </div>)
        :
        loading?

         <div></div>
         :

         <div className="w-full relative overflow-hidden flex items-center justify-center flex-col">
            {data && 
            <div className="min-h-screen w-full xl:w-[75%] pb-20">
  <div className="w-full lg:w-[90%] xl:w-[85%] relative h-[65vh] xl:h-[75vh] rounded-4xl overflow-hidden mx-auto mt-8 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.8)] border border-white/5 bg-[#050505]">
    {data.backdrop_path ? (
      <img 
        src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`} 
        className="w-full h-full object-cover object-top xl:object-center opacity-80"
        alt={data.title}
      />
    ) : (
      <div className="w-full h-full bg-neutral-900" />
    )}
    <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/30 to-transparent" />
    <div className="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-transparent" />
    
    <div className="absolute inset-0 flex flex-col justify-center items-start px-12 sm:px-24">
      <h1 className="text-4xl sm:text-5xl xl:text-7xl font-serif font-bold mb-6 tracking-tight text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] leading-[0.9]">
        {data.title}
      </h1>
      <div className="flex flex-col gap-3 border-l-2 border-white/20 pl-6">
        {data.tagline ? (
          <h3 className="text-white/70 text-lg sm:text-xl font-light italic tracking-wide max-w-xl leading-snug">
            {data.tagline}
          </h3>
        ):
        <h3 className="text-white text-lg sm:text-xl font-bold tracking-wide max-w-xl leading-snug">No tagline found</h3>}
        <h3 className="text-white/40 font-sans text-xs sm:text-sm tracking-[0.3em] uppercase font-bold flex items-center gap-4">
          <span className="w-8 h-px bg-white/20"></span>
          {data.release_date.split('-')[0]}
        </h3>
      </div>
    </div>
  </div>
  <div className="w-full lg:w-[90%] xl:w-[85%] mx-auto -mt-10 relative z-20">
    <div className="bg-black/60 backdrop-blur-2xl border border-white/5 rounded-3xl p-8 xl:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
      <div className="flex flex-row w-full sm:gap-x-4 xl:gap-x-6">
        <img src={`https://image.tmdb.org/t/p/original${data.poster_path}`} className=" w-40 h-70 -translate-x-5 xl:translate-x-0 -mt-20 xl:w-[30%]
        sm:w-[30%] sm:h-full sm:translate-x-0
        xl:-mt-50 xl:h-full"/>
          <div className="flex flex-col gap-10">
            <div className="flex flex-row gap-2 -translate-y-5 flex-wrap xl:gap-x-5 xl:translate-y-0">
            {data.genres.map(genre=>
                <div key={genre.id} className="flex items-center justify-center py-5 max-h-5 px-3
                 bg-white/3 backdrop-blur-md border border-white/10 rounded-full transition-all duration-300 cursor-default
                 sm:max-h-12 sm:px-5  
                 xl:max-h-15 xl:px-5">
                  <h3 className="text-white/80 text-[14px] sm:text-[16px] xl:text-[18px] font-medium tracking-wide group-hover:text-white transition-colors">{genre.name}</h3>
                </div>
            )}
          </div>
          <div className="flex flex-row mt-7 lg:mt-0">
           <RatingBadge data={data} classname={"hidden lg:flex lg:translate-x-0"}/>
           </div>
          </div>
      </div>
      <RatingBadge data={data} classname={"flex -translate-x-5 lg:hidden"}/>
    </div>
  </div>
</div>
   }
        </div>
    )
}