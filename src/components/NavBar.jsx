// import Routes
import { NavLink } from "react-router-dom";

//import icons 
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeart,faBookmark} from '@fortawesome/free-solid-svg-icons'

export default function NavBar(){
    return(
        <nav className="relative flex flex-row justify-center items-center self-center w-full text-[white]
        lg:text-[25px] ">
            <NavLink to='/'>Home</NavLink>
            <NavLink to='top-rated'>Top Rated</NavLink>
            <NavLink to='trending'>Trending</NavLink>
            <NavLink to='series'>Series</NavLink>
            <div className=" flex flex-row absolute right-20">
                <NavLink to='favourites'><FontAwesomeIcon icon={faHeart} className="cursor-pointer "/>
                   <h4 className="user-container bg-red-600">0</h4>
                </NavLink>
                <NavLink to='watchlist'><FontAwesomeIcon icon={faBookmark} className="cursor-pointer -ml-1"/>
                   <h4 className="user-container bg-blue-600">0</h4>
                </NavLink>
            </div>
        </nav>
    )
}