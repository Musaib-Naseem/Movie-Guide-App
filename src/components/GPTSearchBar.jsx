import React, { useRef, useState } from "react";
import languageConstant from "../utils/languageConstant";
import { useSelector, useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/Constants";
import { addSearchedMovies } from "../utils/moviesSlice";

const GPTSearchBar = () => {
  const dispatch = useDispatch();

  const langSel = useSelector((store) => store.preferredLanguage.lang);

  const inputRef = useRef(null);

  const [setAllData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleGptSearch = async () => {
    const value = inputRef.current?.value?.trim();

    if (!value) {
      setErrorMessage("Please enter what kind of movies you want to watch.");
      return;
    }

    setErrorMessage("");

    try {
      // Ask Puter AI for movie recommendations
      const response = await window.puter.ai.chat(
        `Act as a movie recommendation system. 
        Give only the names of 5 movies in valid JSON array format.
        Example: ["movie1","movie2","movie3","movie4","movie5"].
        Do not include any explanation.
        Recommend movies based on: ${value}`,
      );

      const result = response?.message?.content;

      if (!result) {
        throw new Error("No recommendations received from AI.");
      }

      console.log("GPT result:", result);

      // Search recommended movies in TMDB
      await searchMovieName(result);
    } catch (error) {
      console.error("GPT Search Error:", error);
      setErrorMessage("Unable to get movie recommendations. Please try again.");
    }
  };

  const searchMovieName = async (gptMovieArrayText) => {
    let movieArray = [];

    try {
      // Try parsing AI response as JSON
      movieArray = JSON.parse(gptMovieArrayText);

      if (!Array.isArray(movieArray)) {
        throw new Error("Invalid movie array");
      }
    } catch (error) {
      // Fallback if AI response isn't valid JSON
      movieArray = gptMovieArrayText
        .replaceAll("[", "")
        .replaceAll("]", "")
        .replaceAll('"', "")
        .split(",")
        .map((movie) => movie.trim())
        .filter(Boolean);
    }

    // Remove duplicate movies
    const uniqueMovies = [
      ...new Set(
        movieArray.map((movie) => String(movie).trim()).filter(Boolean),
      ),
    ];

    if (!uniqueMovies.length) {
      setErrorMessage("No movies were found from the AI recommendation.");
      return;
    }

    try {
      const results = await Promise.all(
        uniqueMovies.map(async (movie) => {
          const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            movie,
          )}&include_adult=false&language=en-US&page=1`;

          const response = await fetch(url, API_OPTIONS);

          if (!response.ok) {
            throw new Error(
              `TMDB request failed with status ${response.status}`,
            );
          }

          const data = await response.json();

          console.log("TMDB result:", movie, data);

          return data;
        }),
      );

      setAllData(results);

      dispatch(addSearchedMovies(results));
    } catch (error) {
      console.error("TMDB Search Error:", error);

      setErrorMessage("Unable to fetch movie information. Please try again.");
    }
  };

  return (
    <div className="px-4 pt-32 pb-10 md:px-8 md:pt-36">
      <form
        className="
          mx-auto
          w-full
          max-w-2xl
          rounded-2xl
          border
          border-white/10
          bg-black/90
          p-5
          shadow-2xl
          backdrop-blur-md
          md:p-6
        "
        onSubmit={(e) => {
          e.preventDefault();
          handleGptSearch();
        }}
      >
        {/* Heading */}
        <div className="mb-5 text-center">
          <h1 className="text-2xl font-bold text-white md:text-3xl">
            AI Movie Recommendations
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Tell us what you want to watch and let AI find movies for you.
          </p>
        </div>

        {/* Search */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            ref={inputRef}
            type="text"
            placeholder={
              languageConstant[langSel]?.Placeholder ||
              "Enter your movie preferences"
            }
            aria-label="Enter your movie preferences"
            className="
              min-w-0
              flex-1
              rounded-lg
              border
              border-gray-700
              bg-gray-800
              px-4
              py-3
              text-white
              placeholder-gray-400
              outline-none
              transition
              focus:border-purple-500
              focus:ring-2
              focus:ring-purple-500/20
            "
          />

          <button
            type="submit"
            className="
              rounded-lg
              bg-red-600
              px-6
              py-3
              font-semibold
              text-white
              shadow-lg
              transition-all
              duration-200
              hover:bg-red-700
              active:scale-95
              sm:px-8
            "
          >
            {languageConstant[langSel]?.Search || "Search"}
          </button>
        </div>

        {/* Error */}
        {errorMessage && (
          <p
            className="
              mt-4
              text-center
              text-sm
              font-medium
              text-red-400
            "
          >
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default GPTSearchBar;
