import React from 'react'
import MovieCard from "./MovieCard";

const MovieList = ({title,data}) => {
  return (
<div className=' pt-4 px-8 flex flex-col mx-auto x-overflow-scroll md:pt-8 px-16 mx-0'>
    <h1 className='text-3xl text-white font-bold pb-4 text-center'> {title} </h1>
    <div className='flex  x-overflow-scroll '>
     

      <div className='flex x-overflow-scroll flex-wrap'>


      {

data && data.map((data)=>{


    return(

  <div className='m-4 mx-auto md:mx-4 m-2'>

    <MovieCard   key={data.id} img_path={data.poster_path}/>

  </div>

    )

})
        
    }
      </div>
    </div>
    </div>
  )
}

export default MovieList
