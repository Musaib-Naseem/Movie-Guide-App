import { useEffect } from "react";
import { API_OPTIONS } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { addTrailer } from "../utils/moviesSlice";

const useGetKey = (movieId) => {
  const dispatch = useDispatch();

  console.log(movieId);

  const movieData = async () => {
    const data_one = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      API_OPTIONS,
    );

    const json = await data_one.json();

    // console.log(json.results[11]);

    const filterTrailer = json.results.filter(
      (videos) => videos.type === "Trailer",
    );

    const finalData = filterTrailer.length ? filterTrailer[0] : json.results[0];

    // console.log(finalData.key);

    var trailer_ky = finalData.key;

    dispatch(addTrailer(trailer_ky));
  };

  useEffect(() => {
    movieData();
  }, [movieData]);

  return <div></div>;
};

export default useGetKey;
