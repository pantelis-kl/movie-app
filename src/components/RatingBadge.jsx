//import functions
import getRating from "../utils/getRating";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUser } from "@fortawesome/free-solid-svg-icons";

//import loading skeleton
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function RatingBadge({ data, classname, loading }) {
  return (
    <>
      {loading ? (
        <div
          className={` group ${classname} italic w-full flex-col gap-y-5 items-baseline gap-1 px-4 lg:px-8 py-4 lg:w-fit rounded-2xl bg-zinc-950/40 backdrop-blur-md border border-white/5 shadow-2x
               sm:translate-y-0 sm:translate-x-0 sm:px-6`}
        >
          <SkeletonTheme baseColor="#333" highlightColor="#444">
            <h3 className="w-20 lg:w-30 text-[22px] lg:text-3xl sm:text-[27px]">
              <Skeleton />
            </h3>
            <div className="flex flex-col items-start ">
              <h4 className="text-[23px] w-20 lg:w-30 sm:text-[27px] lg:text-3xl">
                <Skeleton />
              </h4>
              <span className="text-[10px] self-center w-10">
                <Skeleton />
              </span>
            </div>
          </SkeletonTheme>
        </div>
      ) : (
        <div
          className={` group ${classname} italic w-full flex-col gap-y-3 items-baseline gap-1 px-4 lg:px-8 py-4 lg:w-fit rounded-2xl bg-zinc-950/40 backdrop-blur-md border border-white/5 shadow-2x
               sm:translate-y-0 sm:translate-x-0 sm:px-6`}
        >
          {getRating(data.vote_average) !== "No rating found" ? (
            <span className="flex flex-row items-end justify-end">
              <h3
                className="text-[22px] font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-br from-white to-zinc-500 [font-variant-numeric:tabular-nums]
                    lg:text-3xl sm:text-[27px]"
              >
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-400 text-[20px] sm:text-[22px] lg:text-[23px]"
                />
                {getRating(data.vote_average).toFixed(1)}
              </h3>
              <span className="text-[10px] sm:text-[12px] lg:text-[12px] font-bold text-zinc-500 uppercase tracking-widest ml-0.5">
                /10
              </span>
            </span>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-zinc-900/20 border border-dashed border-white/10 opacity-60">
              <div className="w-2 h-2 rounded-full bg-zinc-600 animate-pulse" />
              <p className="text-[10px] font-bold text-white/80 uppercase tracking-[0.2em]">
                Unrated
              </p>
            </div>
          )}
          <div className="flex items-center gap-2 lg:gap-4 py-2 group transition-all duration-300">
            <div className="opacity-30 group-hover:opacity-60 transition-opacity duration-500">
              <FontAwesomeIcon
                icon={faUser}
                className="text-white/60 group-hover:text-white"
              />
            </div>
            <div className="flex flex-col items-start">
              <h4 className="text-[23px] sm:text-[27px] lg:text-3xl font-bold text-white">
                {data.vote_count.toLocaleString()}
              </h4>
              <span className="text-[10px] font-sans font-black uppercase text-white/30 tracking-[0.3em] mt-2 flex items-center gap-2">
                Votes
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
