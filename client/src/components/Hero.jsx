import React from 'react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {

    const navigate = useNavigate();

  return (
  
    <div className='px-4 sm:px-20 xl:px-32 py-10 relative inline-flex flex-col 
    w-full justify-center bg-[url(/gradientBackground.png)] bg-fixed bg-cover bg-center bg-no-repeat min-h-screen'>

        <div className='text-center mb-6 text-black'>
            <h1 className='text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold
            mx-auto leading-[1.2] '> <span className='text-primary'>AI </span> That Works, <br /> While <span className='text-primary'> You </span> Dream .</h1>
            <p className='mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs
            text-black font-semibold'>From ideas <span className='text-primary'>to execution</span> —automate content, conversations,<span className='text-primary'> and strategy</span> with a <span className='text-primary'>single smart </span>platform.
                The Future of <span className='text-primary'>Work Is Here.</span> 
            </p>

        </div>
        <div className='flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs'>
          <button onClick={()=> navigate('/AI')} className='bg-primary text-white px-10 py-3 rounded-lg hover:scale-102 active:95
          transition cursor-pointer'>let's Start</button>
        </div>
      
    </div>


  )
}

export default Hero
