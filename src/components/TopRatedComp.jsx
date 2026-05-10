//import routes
import { Link } from "react-router-dom";

//import api key
import { apiKey } from "../constants/constants";

//import hooks
import useFetch from "../hooks/useFetch";
import { useState, useRef, useEffect } from "react";

//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

//import loading skeleton theme
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import LoadingSkeleton from "./LoadingSkeleton";

//import functions
import getStars from "../utils/getStars";
import getGenres from "../utils/getGenres";
import getRating from "../utils/getRating";

//import components
import WatchlistIcons from "./WatchlistIcons";
import ArrowLeft from "./ArrowLeft";
import ArrowRight from "./ArrowRight";

export default function TopRatedComp() {
  const [data, loading, error] = useFetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=1`,
  );
  const [genresData] = useFetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`,
  );
  const [lowerEnd, setLowerEnd] = useState(0);
  const [upperEnd, setUpperEnd] = useState(8);
  const [leftButton, setLeftButton] = useState(false);
  const [rightButton, setRightButton] = useState(true);

  return error ? (
    <div className="flex items-center justify-center w-full">
      <p className="text-red-600 text-[30px]">{error}</p>
    </div>
  ) : (
    <div className="mt-10 ml-5 w-full pb-2">
      <div className="flex flex-row">
        <h1 className="text-white text-[22px] sm:text-[28px] lg:text-[35px]">
          Top Rated of all time
        </h1>
        <Link
          to="top-rated"
          className="self-end absolute right-10 text-white text-[19px] sm:-translate-x-10 sm:text-[20px] lg:text-[22px]
                 hover:text-[#e7e7e7] hover:underline transition-all duration-200"
        >
          View All
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center">
        <ArrowLeft
          leftButton={leftButton}
          lowerEnd={lowerEnd}
          setUpperEnd={setUpperEnd}
          setLowerEnd={setLowerEnd}
          setLeftButton={setLeftButton}
          setRightButton={setRightButton}
        />
        <div
          className="flex w-full flex-row mt-5 gap-y-4 flex-wrap  gap-x-5 lg:gap-x-3
                sm:gap-x-5 sm:ml-5 lg:flex-row lg:ml-5 lg:flex-nowrap"
        >
          {loading ? (
            <div className="flex flex-row flex-wrap gap-x-5 gap-y-4 lg:gap-x-3">
              <SkeletonTheme baseColor="#202020" highlightColor="#444">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    className="flex flex-col bg-white/10 w-45 backdrop-blur-md border border-white/20 shadow-lg overflow-hidden rounded-xl sm:w-50 lg:w-55"
                    key={index}
                  >
                    <Skeleton className="w-30 h-30 lg:w-50 lg:h-50"/>
                    <LoadingSkeleton width="100px" height="20px" />
                    <LoadingSkeleton
                      width="70px"
                      height="18px"
                      className="mb-2"
                    />
                    <div className="flex flex-row flex-wrap">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton
                          width="70px"
                          height="25px"
                          className="rounded-full ml-2 mt-3"
                          key={i}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </SkeletonTheme>
            </div>
          ) : (
            data &&
            data.results.slice(lowerEnd, upperEnd).map((movie, index) => (
              <div
                className="flex w-45 bg-white/10 flex-col backdrop-blur-md border max-h-200 border-white/20 shadow-lg shadow-black/30 rounded-xl overflow-hidden z-10 pb-2
                   group cursor-pointer transition-all duration-200 animate-fadeIn
                   sm:w-50 lg:w-55"
                key={movie.id}
              >
                <div className="relative">
                  <img
                    src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                    alt="movie-poster"
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <span
                  className="absolute -top-2 -left-2 bg-linear-to-br from-pink-500 to-rose-600 text-white font-black text-lg w-10 h-10 flex items-center justify-center rounded-full shadow-lg border-2 
                      border-white group-hover:rotate-12 group-hover:scale-110 transition-all duration-200"
                >
                  {lowerEnd + index + 1}
                </span>
                <h2 className="text-white px-2 mt-2 text-[17px] sm:text-[19px] lg:text-[20px]">
                  {movie.title}
                </h2>
                <h3 className="text-white/60 text-[13px] mt-0.1 sm:text-[15px] lg:text-[16px] px-2">
                  {getStars(movie.vote_average)}(
                  {getRating(movie.vote_average.toFixed(1))})
                </h3>
                <div>
                  {getGenres(movie.genre_ids, genresData).map(
                    (genre, index) => (
                      <div
                        className="inline-flex items-center justify-center mt-2 ml-2 px-2 py-1 rounded-full max-h-10
                                     bg-white/10 backdrop-blur-md border border-white/30 shadow-[0_4px_15px_rgba(255,255,255,0.1)] cursor-default
                                     lg:px-4 sm:px-3"
                        key={index}
                      >
                        <h3 className="text-white/90 text-[12px] font-medium tracking-wide sm:text-[14px] lg:text-sm">
                          {genre}
                        </h3>
                      </div>
                    ),
                  )}
                </div>
                <WatchlistIcons movie={movie} />
              </div>
            ))
          )}
        </div>
        <ArrowRight
          rightButton={rightButton}
          upperEnd={upperEnd}
          setLowerEnd={setLowerEnd}
          setUpperEnd={setUpperEnd}
          setLeftButton={setLeftButton}
          setRightButton={setRightButton}
        />
      </div>
    </div>
  );
}
