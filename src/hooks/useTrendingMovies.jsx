import { useEffect } from "react";
import { API_OPTIONS } from "../utils/Constants";
import { addTrendingMovies } from "../utils/moviesSlice";
import { useDispatch, useSelector } from "react-redux";

const useTrendingMovies = () => {

  const selectr = useSelector(store=>store.movies.nowTrending);

  const dispatch = useDispatch();

  const getTrendingMovies = async () => {
    const data1 = await fetch('https://api.themoviedb.org/3/movie/popular?page=1', API_OPTIONS);
    const json1 = await data1.json();
    console.log(json1);
    dispatch(addTrendingMovies(json1.results));
  };

  useEffect(() => {
   !selectr && getTrendingMovies();
  }, []);


};

export default useTrendingMovies;
