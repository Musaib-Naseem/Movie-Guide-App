import React from 'react'

const VideoTitle = ({ title,overview }) => {
  
  return (
    <div className='absolute bg-gradient-to-r from-black-400 w-screen aspect-video '>

<div className='pt-[60%] hidden pl-24 md:pt-[14%] md:block'>

<h1 className='text-3xl font-bold pb-4 text-white'> { title }</h1>
<p className='text-lg w-1/3 pb-4 text-white'> { overview }</p>

<div> 

<button className='p-4 px-12 text-black bg-white rounded-lg mr-4 font-bold hover:bg-opacity-80'> Play </button>
<button className='p-4 px-12 text-white bg-gray-400 rounded-lg mr-4'> More Info </button>
</div>
  
</div>
      
    </div>
  )
}

export default VideoTitle
