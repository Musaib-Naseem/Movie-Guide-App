import { useEffect } from "react";
import { API_OPTIONS } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { addTrailer } from "../utils/moviesSlice";

const useGetKey = (movieId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!movieId) return;

    const getMovieTrailer = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
          API_OPTIONS,
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch movie videos: ${response.status}`);
        }

        const data = await response.json();

        const videos = data?.results || [];

        // Find the first official trailer
        const trailer = videos.find(
          (video) => video.type === "Trailer" && video.site === "YouTube",
        );

        // If no trailer exists, use the first available video
        const finalVideo = trailer || videos[0];

        if (!finalVideo?.key) {
          console.warn("No trailer found for movie:", movieId);
          return;
        }

        dispatch(addTrailer(finalVideo.key));
      } catch (error) {
        console.error("Error fetching movie trailer:", error);
      }
    };

    getMovieTrailer();
  }, [movieId, dispatch]);

  return null;
};

export default useGetKey;
