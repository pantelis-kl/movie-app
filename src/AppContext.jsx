//import hooks
import useLocalStorage from "./hooks/useLocalStorage";
import { createContext,useContext, useState } from "react";
export const appContext=createContext();

export default function AppContext({children}){
    const [favourites,setFavourites]=useLocalStorage('favourites',[]);
    const [watchlist,setWatchlist]=useLocalStorage('watchlist',[]);
    const [message,setMessage]=useState('');

    const addToFavourites=(movie)=>{
        setFavourites(f => {
            if (f.some(item=>item.id===movie.id)){
                setMessage("Already in favourites")
                return f;
            }
            setMessage("Added in favourites")
            return [...f, {
                id:movie.id,
                title:movie.original_title,
                rating:movie.vote_average,
                genres:movie.genre_ids
            }];
        })
    }

    const addToWatchlist=(movie)=>{
        setWatchlist(w=>{
            if(w.some(item=>item.id===movie.id)){
                setMessage("Already in watchlist")
                return w;
            }
            setMessage("Added to watchlist")
            return[...w,{
                id:movie.id,
                title:movie.title,
                rating:movie.vote_average,
                genres:movie.genre_ids
            }];
        })
    }

    return(
        <appContext.Provider value={{favourites,addToFavourites,watchlist,addToWatchlist,message,setMessage}}>
            {children}
        </appContext.Provider>
    )
}