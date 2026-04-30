//import icons 
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'

export default function SearchMovie(){
    return(
        <div className="flex flex-col items-center justify-center w-full mt-7 lg:mt-15">
            <h3 className=" text-white text-[20px] lg:text-[30px] 
            overflow-hidden whitespace-nowrap animate-type">Search thousands of Movies and TV Shows</h3>
            <div className='flex flex-row justify-center items-center mt-2'>
                <form onSubmit={e=>e.preventDefault()}>
                <input type="search" placeholder='Type the name of a movie'
                className='text-white bg-white/10 backdrop-blur-md border border-white/20 
                               p-3 rounded-full w-80 text-[17px] outline-none
                               focus:bg-white/20 focus:border-[#0059ff] focus:ring-1 focus:ring-[#0059ff]
                               lg:text-[20px] lg:w-125 transition-all placeholder:text-gray-400'/>
                <FontAwesomeIcon icon={faSearch} className='ml-3 text-[25px] text-[#0059ff] cursor-pointer'/>
                </form>
            </div>
        </div>
    )
}