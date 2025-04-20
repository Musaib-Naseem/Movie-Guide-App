import React from 'react';
import { IMAGE_CDN_URL } from '../utils/Constants';

const MovieCard = ({img_path}) => {
  return (
    <div>

        <img className="w-48" alt="Movie Poster" src={`${IMAGE_CDN_URL}${img_path}`}/>
       
      
    </div>
  )
}

export default MovieCard
