import { useEffect } from "react";
import { API_OPTIONS } from "../utils/Constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useDispatch, useSelector } from "react-redux";

const useNowPlayingMovies = () => {
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (nowPlayingMovies) return;

    const getNowPlayingMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/now_playing?page=1",
          API_OPTIONS,
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch now playing movies: ${response.status}`,
          );
        }

        const json = await response.json();

        console.log("Now Playing Movies:", json);

        dispatch(addNowPlayingMovies(json.results));
      } catch (error) {
        console.error("Error fetching now playing movies:", error);
      }
    };

    getNowPlayingMovies();
  }, [nowPlayingMovies, dispatch]);

  return null;
};

export default useNowPlayingMovies;
