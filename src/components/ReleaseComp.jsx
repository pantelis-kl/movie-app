//import functions
import getReleaseDate from "../utils/getReleaseDate"


export default function ReleaseComp({data,classname}){
    return(
        <div
      className={` group ${classname} w-full flex-col items-center px-4 lg:px-8 py-4 lg:w-fit rounded-2xl bg-zinc-950/40 backdrop-blur-md border border-white/5 shadow-2x
               sm:translate-y-0 sm:translate-x-0 sm:px-6`}>
                <span className="text-[10px] font-black uppercase text-white/20 tracking-[0.3em] leading-none mb-3">
        Availability
    </span>
    {data.status === 'Released' ? (
        <div className="flex items-center gap-2.5">
            <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-20"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            </div>
            
            <h3 className="text-xl font-serif font-bold text-emerald-400/90 tracking-tight italic">
                Released
            </h3>
        </div>
    ) : (
        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2.5">
                <div className="h-2 w-2 rounded-full bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
                <h3 className="text-xl font-serif font-bold text-amber-200/80 tracking-tight italic">
                    In Production
                </h3>
            </div>
    </div>)}
    <h3 className="text-white text-[23px] sm:text-[26px] lg:text-3xl translate-y-5 font-mono">{getReleaseDate(data.release_date)}</h3>
    </div>
    )
}