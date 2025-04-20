import React from 'react';
import { useSelector } from 'react-redux';
import { IMAGE_CDN_URL } from '../utils/Constants';


const GPTMovieSuggestions = () => {

  const SelMovie = useSelector(store=>store.movies.searchedMovies);

  console.log(SelMovie);

  return (
    <div className='flex-col flex p-4 md:flex-row'>
      
      { SelMovie && SelMovie.map((movie_data)=>{

      return(

     <div className='wd-[90%] mx-auto md:w-1/3 m-4 border p-5 hover:bg-gray-100 curser-pointer'>

     <img src={`${IMAGE_CDN_URL}${movie_data.results[0].poster_path}`} className='rounded-lg' />
     <h1 className='text-2xl font-bold text-blue-500 mt-4 mb-4'> {movie_data.results[0].title} </h1>
     <p className='text-sm text-gray-500 '>  {movie_data.results[0].overview} </p>


     </div>

      )

      })}

    </div>
  )
}

export default GPTMovieSuggestions
