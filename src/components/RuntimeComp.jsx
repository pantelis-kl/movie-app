//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

export default function RuntimeComp({ data, classname }) {
  return (
    <div
      className={` group ${classname} flex-col w-full lg:w-fit items-center px-4 lg:px-8 py-4 rounded-2xl bg-zinc-950/40 backdrop-blur-md border border-white/5 shadow-2x
               sm:translate-y-0 sm:translate-x-0 sm:px-6`}
    >
      <h3 className="text-[18px] flex flex-row lg:text-2xl font-serif font-bold text-white tracking-tight leading-none italic">
        <FontAwesomeIcon icon={faClock} />
        Runtime
      </h3>

      <div className="flex items-baseline xl:py-5 translate-y-10 lg:translate-y-0 2xl:translate-y-6 gap-2">
        <span className="text-[23px] sm:text-[27px] lg:text-3xl font-sans font-black text-white tracking-tighter [font-variant-numeric:tabular-nums]">
          {data.runtime}
        </span>
        <span className="text-xs lg:text-sm font-sans font-bold uppercase tracking-[0.2em] text-white/40">
          min
        </span>
      </div>
    </div>
  );
}
