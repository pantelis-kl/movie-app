//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"

export default function ArrowRight({rightButton,upperEnd,setLowerEnd,setUpperEnd,setLeftButton,setRightButton}){

    const getNextMovies=()=>{
        const count=upperEnd+7;
        setLowerEnd(l=>l+7)
        setUpperEnd(count)
        setLeftButton(true)
        if(count>20)
            setRightButton(false);
    }

    return(
        rightButton?
        <FontAwesomeIcon icon={faArrowRight} className="hidden! text-white p-4 text-[20px] bg-blue-600 rounded-full z-40 cursor-pointer shadow-[17px_17px_20px_black] hover:bg-blue-700
                transition-all duration-200 absolute right-0.5 -translate-x-1 lg:block!"
                onClick={getNextMovies}/>
        :null
    )
}