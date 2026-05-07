//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart,faBookmark } from "@fortawesome/free-solid-svg-icons";

//import hooks
import useApp from '../AppContext.jsx';
import { appContext } from "../AppContext.jsx";
import { useContext,useState } from "react";

export default function WatchlistIcons({ movie }) {
    const { addToFavourites, addToWatchlist, message, setMessage } = useContext(appContext);

    const triggerFeedback = () => {
        setTimeout(() => setMessage(""), 1000);
    };

    return (
        <div className="relative flex flex-row items-center gap-x-1 mt-3 pb-2 lg:opacity-0 group-hover:opacity-100 transition-all duration-300">
            {message && (
                <div className="absolute -top-10 left-0 bg-blue-600 text-white text-[12px] font-bold px-3 py-2 rounded-full shadow-lg z-50">
                    {message}
                </div>
            )}
            <button 
                onClick={() => {
                    addToFavourites(movie);
                    triggerFeedback();
                }}
                className="hover:scale-125 transition-transform active:scale-90"
            >
                <FontAwesomeIcon 
                    icon={faHeart} 
                    className="text-red-600 cursor-pointer text-[18px] lg:text-[20px] hover:text-red-500" 
                />
            </button>
            <button 
                onClick={() => {
                    addToWatchlist(movie);
                    triggerFeedback();
                }}
                className="hover:scale-125 transition-transform active:scale-90"
            >
                <FontAwesomeIcon 
                    icon={faBookmark} 
                    className="text-blue-500 cursor-pointer text-[18px] lg:text-[20px] hover:text-blue-400" 
                />
            </button>
        </div>
    );
}