// import hooks
import { useState } from "react";
import useFetch from "../hooks/useFetch";

//import functions
import getStars from "../utils/getStars";
import getGenres from "../utils/getGenres";
import getRating from "../utils/getRating";

//import components
import LoadingSkeleton from "./LoadingSkeleton";
import WatchlistIcons from "./WatchlistIcons";
import ArrowLeft from "./ArrowLeft";
import ArrowRight from "./ArrowRight";

//import loading skeleton theme
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

//import routes
import { Link } from "react-router-dom";

//import api key
import { apiKey } from "../constants/constants";

export default function TrendingComp() {
  const [data, loading, error] = useFetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`,
  );
  const [genresData] = useFetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`,
  );
  const [lowEnd, setLowEnd] = useState(0);
  const [upperEnd, setUpperEnd] = useState(8);
  const [rightButton, setRightButton] = useState(true);
  const [leftButton, setLeftButton] = useState(false);

  return error ? (
    <div className="flex items-center justify-center w-full">
      <p className="text-red-600 text-[30px]">{error}</p>
    </div>
  ) : (
    <div className="flex flex-col mt-7 w-full ml-5">
      <div className="flex flex-row">
        <h1 className="text-[white] text-[22px] sm:text-[28px] lg:text-[35px]">
          Trending this week
        </h1>
        <Link
          to="trending"
          className="self-end absolute right-10 text-white text-[17px] sm:-translate-x-10 sm:text-[19px] lg:text-[20px]
                 hover:text-[#e7e7e7] hover:underline transition-all duration-200"
        >
          View All
        </Link>
      </div>
      <div className="flex flex-row items-center justify-center">
        <ArrowLeft
          leftButton={leftButton}
          lowerEnd={lowEnd}
          setUpperEnd={setUpperEnd}
          setLowerEnd={setLowEnd}
          setLeftButton={setLeftButton}
          setRightButton={setRightButton}
        />
        <div
          className="flex w-full flex-row mt-5 gap-y-4 flex-wrap gap-x-5 lg:gap-x-3 sm:ml-5 lg:ml-5 lg:flex-nowrap"
        >
          {loading ? (
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
              <div className="flex flex-row flex-wrap gap-x-5 gap-y-4 lg:gap-x-3">
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
              </div>
            </SkeletonTheme>
          ) : (
            data &&
            data.results.slice(lowEnd, upperEnd).map((movie, index) => (
              <div
                className="flex flex-col shrink-0 w-45 bg-white/10 backdrop-blur-md max-h-200 border border-white/20 shadow-lg shadow-black/30 rounded-xl overflow-hidden z-10
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
                <h2 className="text-[white] px-2 mt-2 text-[17px] sm:text-[19px] lg:text-[20px]">
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
                <WatchlistIcons movie={movie} index={index} />
              </div>
            ))
          )}
        </div>
        <ArrowRight
          rightButton={rightButton}
          upperEnd={upperEnd}
          setLowerEnd={setLowEnd}
          setUpperEnd={setUpperEnd}
          setLeftButton={setLeftButton}
          setRightButton={setRightButton}
        />
      </div>
    </div>
  );
}
