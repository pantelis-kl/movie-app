import tmdbLogo from '../assets/tmdb-logo-removebg-preview.png'
export default function RootLayout(){
    return(
        <header className="bg-[#161616] w-full">
            <div className='flex flex-col w-30 items-start justify-start
             lg:items-center lg:justify-center'>
                <h2 className='text-[white] text-[18px] font-extrabold
                 lg:text-[23px]'>Based On</h2>
                <img src={tmdbLogo} className='w-18 -mt-2
                 lg:w-25 lg:-mt-5'/>
            </div>
        </header>
    )
}