import React from 'react';
import useGetKey from '../hooks/useGetKey';
import { useSelector } from 'react-redux';

const VideoBg = ({movie_id}) => {

  const keyData = useSelector(store=>store.movies);
  
  const mainKey = keyData?.nowTrailer;
  console.log(mainKey);

  useGetKey(movie_id);
  
   
  return (
   <div clasName="w-screen relative t-0">

   <iframe 
   className='w-screen aspect-video'
   src={`https://www.youtube.com/embed/${mainKey}?&autoplay=1&mute=1`} 
   title="YouTube video player" 
   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
   referrerPolicy="strict-origin-when-cross-origin" >

   </iframe>
   
   </div>
  )
}

export default VideoBg;

