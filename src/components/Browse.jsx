import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useTrendingMovies from "../hooks/useTrendingMovies";
import { useSelector } from "react-redux";
import GPTSearch from "./GPTSearch";

const Browse = () => {


  useNowPlayingMovies();
  useTrendingMovies();

  const gptData = useSelector(store=>store.gpt);
  const showTogData = gptData.IsGptSlice
  // console.log(gptData.IsGptSlice);


  return (
    <div>

<Header />

   {

showTogData ? <GPTSearch /> :  ( <div>  <MainContainer />
     <SecondaryContainer /></div>)

   }  
   
     
    

    </div>
  );
};

export default Browse;
