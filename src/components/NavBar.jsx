import { NavLink } from "react-router-dom";

export default function NavBar(){
    return(
        <nav className="flex flex-row justify-center items-center self-center w-full text-[white]
        lg: text-[25px] ">
            <NavLink to='/'>Home</NavLink>
            <NavLink to='top-rated'>Top Rated</NavLink>
            <NavLink to='trending'>Trending</NavLink>
            <NavLink to='similar'>Similar</NavLink>
        </nav>
    )
}