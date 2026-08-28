import { useEffect } from "react";
import { API_OPTIONS } from "../utils/Constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useDispatch, useSelector } from "react-redux";

const useNowPlayingMovies = () => {
  const slectr = useSelector((store) => store.movies.nowPlayingMovies);

  const dispatch = useDispatch();

  const getNowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      API_OPTIONS,
    );

    const json = await data.json();

    console.log(json);

    dispatch(addNowPlayingMovies(json.results));
  };

  useEffect(() => {
    !slectr && getNowPlayingMovies();
  }, [slectr]);

  return <></>;
};

export default useNowPlayingMovies;
