// import Routes
import { NavLink } from "react-router-dom";

// import states 
import {useState,useEffect} from 'react'

//import icons 
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeart,faBookmark,faBars} from '@fortawesome/free-solid-svg-icons'

export default function NavBar(){

    const [width,setWidth]=useState(window.innerWidth);
    const [hamMenu,setHamMenu]=useState(false)

    useEffect(()=>{
        const handleResize=()=>{
            const currentWidth=window.innerWidth;
            setWidth(currentWidth);
            if(width>768) setHamMenu(false)
        }
        window.addEventListener("resize",handleResize)
        return()=>window.removeEventListener("resize",handleResize)
    },[])

    return(
        <nav className="relative flex flex-row justify-center items-center self-center w-full text-[white]
        lg:text-[25px] ">
            <FontAwesomeIcon icon={faBars} 
            className={width<=768?'text-[25px] mr-20':'hide-bars'}
            onClick={()=>setHamMenu(!hamMenu)}/>
            {hamMenu?<div className={width<=768?
                "flex flex-col absolute top-6 mr-20 bg-[#000000c9] p-4 rounded-xl text-[20px] animate-slideDown":'hidden'
            }>
                   <NavLink to='/' onClick={()=>setHamMenu(false)}>Home</NavLink>
                   <NavLink to='top-rated' onClick={()=>setHamMenu(false)}>Top Rated</NavLink>
                   <NavLink to='trending' onClick={()=>setHamMenu(false)}>Trending</NavLink>
                   <NavLink to='series' onClick={()=>setHamMenu(false)}>Series</NavLink>
            </div>:''}
                <div className={width<=768?'hide-bars':''}>
                   <NavLink to='/'>Home</NavLink>
                   <NavLink to='top-rated'>Top Rated</NavLink>
                   <NavLink to='trending' >Trending</NavLink>
                   <NavLink to='series'>Series</NavLink>
                </div>
            <div className=" flex flex-row absolute right-10
            lg:right-20">
                <NavLink to='favourites'><FontAwesomeIcon icon={faHeart} className="cursor-pointer text-[25px]"/>
                   <h4 className="user-container bg-red-600">0</h4>
                </NavLink>
                <NavLink to='watchlist'><FontAwesomeIcon icon={faBookmark} className="cursor-pointer -ml-1 text-[25px]"/>
                   <h4 className="user-container bg-blue-600">0</h4>
                </NavLink>
            </div>
        </nav>
    )
}