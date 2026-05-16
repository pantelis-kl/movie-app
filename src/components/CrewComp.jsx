//import hooks
import useFetch from "../hooks/useFetch";

//import apiKey
import { apiKey } from "../constants/constants";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function CrewComp({ id, loading }) {
  const [data] = useFetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`,
  );
  const [producers, setProducers] = useState([]);
  const [writers, setWriters] = useState([]);
  const [directors, setDirectors] = useState([]);

  useEffect(() => {
    let prod = [];
    let wri = [];
    let dir = [];
    if (data && !loading) {
      prod = data.crew.filter((d) => d.job === "Producer");
      wri = data.crew.filter((d) => d.department === "Writing");
      dir = data.crew.filter((d) => d.department === "Directing");
      setProducers(prod);
      setWriters(wri);
      setDirectors(dir);
    }
  }, [data]);

  return (
    <>
      {loading ? (
        <div className="flex flex-col gap-y-4 mt-7 w-full">
          <SkeletonTheme baseColor="#333" highlightColor="#444">
            <div className="flex items-center gap-4">
              <h3 className="text-2xl lg:text-3xl w-25">
                <Skeleton />
              </h3>
              <div className="h-px flex-1 bg-linear-to-r from-white/20 to-transparent" />
            </div>
            <div className="flex flex-row overflow-x-auto snap-x no-scrollbar gap-2 lg:gap-x-5">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  className="flex flex-col p-2 gap-3 min-w-30 sm:min-w-35 lg:min-w-40 rounded-2xl items-center justify-center bg-white/3 border border-white/10"
                  key={index}
                >
                  <div className="w-24 h-24 text-7xl sm:w-28 sm:h-28 lg:w-32 lg:text-8xl">
                    <Skeleton circle />
                  </div>
                  <div className="flex flex-col  text-center">
                    <h3 className="text-base -translate-y-5 w-20 lg:w-30 lg:translate-y-0 lg:text-lg">
                      <Skeleton />
                    </h3>
                    <h4 className="font-medium text-[10px] -translate-y-5 lg:translate-y-0 w-15 lg:w-24 lg:text-xs">
                      <Skeleton />
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </SkeletonTheme>
        </div>
      ) : (
        <div className="flex flex-col gap-y-4 mt-7 w-full">
          <div className="flex items-center gap-4">
            <h3 className="text-2xl lg:text-3xl font-serif font-bold text-white italic tracking-tight">
              Crew
            </h3>
            <div className="h-px flex-1 bg-linear-to-r from-white/20 to-transparent" />
          </div>
          {data && (
            <div className="flex flex-row overflow-x-auto snap-x no-scrollbar gap-2 lg:gap-x-5">
              {producers.map((p) => (
                <div
                  className="flex flex-col p-2 gap-3 min-w-30 sm:min-w-35 lg:min-w-40 rounded-2xl items-center justify-center bg-white/3 backdrop-blur-xl border border-white/10 
             hover:bg-white/8 hover:border-white/20 transition-all duration-500 group shadow-2xl"
                  key={p.id}
                >
                  {p.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w185/${p.profile_path}`}
                      className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full object-cover border-2 border-white/10 p-1 shadow-2xl transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="w-24 h-24 lg:w-30 lg:h-30 rounded-full flex flex-col items-center justify-center 
                  bg-white/3 backdrop-blur-md border border-white/10 shadow-inner group"
                    >
                      <FontAwesomeIcon
                        icon={faUser}
                        className="text-white/20 text-2xl lg:text-3xl mb-1"
                      />
                    </div>
                  )}
                  <div className="flex flex-col  text-center">
                    <h3 className="text-white font-serif font-bold italic text-base lg:text-lg tracking-tight leading-tight ">
                      {p.original_name}
                    </h3>
                    <h4 className="text-white/40 font-sans font-medium text-[10px] lg:text-xs uppercase tracking-[0.15em] mt-1 line-clamp-1">
                      {p.job}
                    </h4>
                  </div>
                </div>
              ))}
              {writers.map((w) => (
                <div
                  className="flex flex-col p-2 gap-3 min-w-30 sm:min-w-35 lg:min-w-40 rounded-2xl items-center justify-center bg-white/3 backdrop-blur-xl border border-white/10 
             hover:bg-white/8 hover:border-white/20 transition-all duration-500 group shadow-2xl"
                  key={w.id}
                >
                  {w.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w185/${w.profile_path}`}
                      className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full object-cover border-2 border-white/10 p-1 shadow-2xl transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="w-24 h-24 lg:w-30 lg:h-30 rounded-full flex flex-col items-center justify-center 
                  bg-white/3 backdrop-blur-md border border-white/10 shadow-inner group"
                    >
                      <FontAwesomeIcon
                        icon={faUser}
                        className="text-white/20 text-2xl lg:text-3xl mb-1"
                      />
                    </div>
                  )}
                  <div className="flex flex-col  text-center">
                    <h3 className="text-white font-serif font-bold italic text-base lg:text-lg tracking-tight leading-tight ">
                      {w.original_name}
                    </h3>
                    <h4 className="text-white/40 font-sans font-medium text-[10px] lg:text-xs uppercase tracking-[0.15em] mt-1 line-clamp-1">
                      {w.job}
                    </h4>
                  </div>
                </div>
              ))}
              {directors.map((d) => (
                <div
                  className="flex flex-col p-2 gap-3 min-w-30 sm:min-w-35 lg:min-w-40 rounded-2xl items-center justify-center bg-white/3 backdrop-blur-xl border border-white/10 
             hover:bg-white/8 hover:border-white/20 transition-all duration-500 group shadow-2xl"
                  key={d.id}
                >
                  {d.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w185/${d.profile_path}`}
                      className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full object-cover border-2 border-white/10 p-1 shadow-2xl transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="w-24 h-24 lg:w-30 lg:h-30 rounded-full flex flex-col items-center justify-center 
                  bg-white/3 backdrop-blur-md border border-white/10 shadow-inner group"
                    >
                      <FontAwesomeIcon
                        icon={faUser}
                        className="text-white/20 text-2xl lg:text-3xl mb-1"
                      />
                    </div>
                  )}
                  <div className="flex flex-col  text-center">
                    <h3 className="text-white font-serif font-bold italic text-base lg:text-lg tracking-tight leading-tight ">
                      {d.original_name}
                    </h3>
                    <h4 className="text-white/40 font-sans font-medium text-[10px] lg:text-xs uppercase tracking-[0.15em] mt-1">
                      {d.job}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
