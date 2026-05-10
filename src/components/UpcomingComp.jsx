//import hooks
import useFetch from "../hooks/useFetch";
import { useState, useContext, useRef } from "react";
import { appContext } from "../AppContext";

//import api key
import { apiKey } from "../constants/constants";

//import navigation link
import { Link } from "react-router-dom";

//import functions
import getReleaseDate from "../utils/getReleaseDate";
import getGenres from "../utils/getGenres";

//import components
import WatchlistIcons from "./WatchlistIcons";
import ArrowLeft from "./ArrowLeft";
import ArrowRight from "./ArrowRight";

//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

//import loading skeleton
import LoadingSkeleton from "./LoadingSkeleton";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function UpcomingComp() {
  const todaysDate = new Date().toISOString().split("T")[0];
  const [data, loading, error] = useFetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_date.gte=${todaysDate}`,
  );
  const [genresData] = useFetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`,
  );
  const [lowerEnd, setLowerEnd] = useState(0);
  const [upperEnd, setUpperEnd] = useState(8);
  const [leftButton, setLeftButton] = useState(false);
  const [rightButton, setRightButton] = useState(true);
  const { addToWatchlist } = useContext(appContext);
  const timeRef = useRef(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackId, setFeedbackId] = useState(null);

  const triggerFeedback = (message, movie) => {
    const currentMessage = message(movie);
    setFeedback(currentMessage);
    setFeedbackId(movie.id);
    clearTimeout(timeRef.current);
    timeRef.current = setTimeout(() => {
      setFeedback("");
      setFeedbackId(null);
    }, 1300);
  };

  return error ? (
    <div className="flex items-center justify-center w-full">
      <p className="text-red-600 text-[30px]">{error}</p>
    </div>
  ) : (
    <div className="mt-10 ml-5 w-full pb-2">
      <div className="flex flex-row">
        <h1 className="text-white text-[22px] sm:text-[28px] lg:text-[35px]">
          Upcoming Movies
        </h1>
        <Link
          to="upcoming"
          className="self-end absolute right-10 text-white text-[19px] sm:-translate-x-10 sm:text-[20px] lg:text-[22px]
                hover:text-[#e7e7e7] hover:underline transition-all duration-200"
        >
          View All
        </Link>
      </div>
      <div className="flex flex-row items-center justify-center">
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
                    <Skeleton className="w-30 h-30 lg:w-50 lg:h-50" />
                    <LoadingSkeleton width="100px" height="20px" />
                    <LoadingSkeleton width="80px" height="12px" />
                    <div className="flex flex-row flex-wrap">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton
                          width="70px"
                          height="25px"
                          className="rounded-full mt-3 ml-2"
                          key={i}
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-center">
                      <Skeleton
                        width="120px"
                        height="30px"
                        className="mt-3 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </SkeletonTheme>
            </div>
          ) : (
            data &&
            data.results.slice(lowerEnd, upperEnd).map((movie) => (
              <div
                className="flex w-45 bg-white/10 flex-col backdrop-blur-md max-h-200 border border-white/20 shadow-lg shadow-black/30 rounded-xl overflow-hidden z-10 pb-2
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
                <h2 className="text-white text-[17px] px-2 mt-2 leading-tight sm:text-[19px] lg:text-[20px]">
                  {movie.title}
                </h2>
                <p className="text-white/50 text-[12px] px-2 sm:text-[13px] mt-1 font-medium italic">
                  Release Date: {getReleaseDate(movie.release_date)}
                </p>
                <div className="mb-3">
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
                <div className="relative flex items-center mt-auto justify-center ">
                  {feedbackId === movie.id && feedback && (
                    <div
                      className="absolute left-1/2 -translate-x-1/2 -top-10 bg-blue-600 text-white text-[12px] font-bold px-3 py-2 rounded-full shadow-lg z-50 line-clamp-1
                                w-35"
                    >
                      {feedback}
                    </div>
                  )}

                  <button
                    className="w-30 py-3 bg-blue-600 hover:bg-blue-500 self-center text-white font-bold text-[14px] uppercase tracking-wider 
                                    flex items-center justify-center gap-2  rounded-full transition-all cursor-pointer
                                    duration-300 active:scale-[0.98] shadow-[0_-4px_10px_rgba(0,0,0,0.2)]"
                    onClick={() => triggerFeedback(addToWatchlist, movie)}
                  >
                    Pre Save
                    <FontAwesomeIcon
                      icon={faBookmark}
                      className="text-[12px]"
                    />
                  </button>
                </div>
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
