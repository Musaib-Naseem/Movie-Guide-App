import React from 'react'
import { useSelector } from 'react-redux'
import VideoBg from './VideoBg';
import VideoTitle from './VideoTitle';

const MainContainer = () => {

    const movieData = useSelector(store=>store.movies?.nowPlayingMovies);

    if (!movieData) return ;

    const Main_Movie = movieData[0];

    console.log(Main_Movie);

    const { original_title, overview, id } = Main_Movie;

  return (
    <div>
 <VideoTitle title={original_title} overview={overview} />
      
      <VideoBg  movie_id={id}/>
     
    </div>
  )
}

export default MainContainer
