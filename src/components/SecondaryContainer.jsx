import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux';

const SecondaryContainer = () => {

  
  

  const data_movies = useSelector(store=>store.movies?.nowPlayingMovies);

  const trend_movies = useSelector(store=>store.movies?.nowTrending);

  const str = useSelector(store=>store.movies);

  console.log(str);


  console.log(data_movies);
  console.log(trend_movies);

 

  return (
    <div className='bg-black'>

      <div className=' z-20 relative mt-0 md:-mt-96 pt-20 '>
      <MovieList title="Now Playing Movies" data={ data_movies }  />
      <MovieList title="Trending" data={ trend_movies }  />
      <MovieList title="Popular" data={ data_movies }  />
      <MovieList title="Horror Movies" data={ data_movies }  />
      </div>

    </div>
  )
}

export default SecondaryContainer
