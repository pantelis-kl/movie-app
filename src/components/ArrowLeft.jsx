//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"

export default function ArrowLeft({leftButton,lowerEnd,setUpperEnd,setLowerEnd,setLeftButton,setRightButton}){

    const getPreviousMovies=()=>{
        const count=lowerEnd-7;
        setUpperEnd(u=>u-7)
        setLowerEnd(count)
        setRightButton(true);
        if(count===0)
            setLeftButton(false)
    }

    return(
        leftButton?
         <FontAwesomeIcon icon={faArrowLeft} className="hidden! text-white p-4 text-[20px] bg-blue-600 rounded-full z-40 cursor-pointer shadow-[17px_17px_20px_black] hover:bg-blue-700
               transition-all duration-200 absolute left-0.5 translate-x-2 lg:block!"
               onClick={getPreviousMovies}/>:null
    )
}