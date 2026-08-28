import { useEffect } from "react";
import { API_OPTIONS } from "../utils/Constants";
import { addTrendingMovies } from "../utils/moviesSlice";
import { useDispatch, useSelector } from "react-redux";

const useTrendingMovies = () => {
  const trendingMovies = useSelector((store) => store.movies.nowTrending);

  const dispatch = useDispatch();

  useEffect(() => {
    if (trendingMovies) return;

    const getTrendingMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?page=1",
          API_OPTIONS,
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch trending movies: ${response.status}`,
          );
        }

        const json = await response.json();

        console.log("Trending Movies:", json);

        dispatch(addTrendingMovies(json.results));
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    getTrendingMovies();
  }, [trendingMovies, dispatch]);
};

export default useTrendingMovies;
