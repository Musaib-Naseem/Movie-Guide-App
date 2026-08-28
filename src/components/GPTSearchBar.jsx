import React, { useEffect, useRef, useState } from "react";
import languageConstant from "../utils/languageConstant";
import { useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { addSearchedMovies } from "../utils/moviesSlice";

const GPTSearchBar = () => {
  const [setAllResult] = useState(null);
  const langSel = useSelector((store) => store.preferredLanguage.lang);
  const inputRef = useRef(null);
  const [allSearchedData, setAllData] = useState(null);

  // Load the Puter AI script dynamically

  const dispatch = useDispatch();

  const handleGptSearch = async () => {
    const val_one = inputRef.current.value;

    // if (!isPuterReady || !window.puter) {
    //   console.warn('⏳ Puter is not ready yet.');
    //   return;
    // }

    console.log("User Prompt:", val_one);

    const response = await window.puter.ai.chat(
      `Act as a movie recommendation system, and give only the name of 5 movies in array format like ["movie1","movie2","movie3","movie4","movie5"]. Based on: ${val_one}`,
    );

    const result = response.message?.content;
    console.log("GPT result:", result);

    setAllResult(result);
    // searchMovieName(result);

    console.log("🎬 Movie List:", result);

    searchMovieName(result);
  };

  // const searchMovieName = async (gptMovieArrayText) => {
  //   const results = await Promise.all(
  //     gptMovieArrayText.map(async (movie) => {
  //       const res = await fetch(
  //         `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movie)}&include_adult=false&language=en-US&page=1`,
  //         API_OPTIONS
  //       );
  //       const data = await res.json();
  //       console.log('🎥 TMDB result for:', movie, data);
  //       return data;
  //     })
  //   );

  //   return results;
  // };

  const searchMovieName = async (gptMovieArrayText) => {
    let movieArray1 = [];

    try {
      // Try parsing the GPT string as a JSON array
      movieArray1 = JSON.parse(gptMovieArrayText);
    } catch {
      // Fallback: remove brackets/quotes, split by comma
      movieArray1 = gptMovieArrayText
        .replace(/[\[\]"]/g, "")
        .split(",")
        .map((m) => m.trim());
    }

    const uniqueMovies = [...new Set(movieArray1)].map((movie) =>
      movie.replace(/^"|"$/g, "").trim(),
    );

    // const movieArray = Array.isArray(uniqueMovies)
    // ? gptMovieArrayText
    // : uniqueMovies.split(',').map(m => m.trim());

    const results = await Promise.all(
      uniqueMovies.map(async (movie) => {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
          API_OPTIONS,
        );

        const data = await res.json();
        console.log("🎥 TMDB result for:", movie, data);

        return data;
      }),
    );

    setAllData(results);
    dispatch(addSearchedMovies(results));
  };

  useEffect(() => {
    if (allSearchedData) {
      console.log(allSearchedData);
    }
  }, [allSearchedData]);

  return (
    <div className="pt-64 md:pt-36 m-8 ">
      <form
        className="p-6 bg-black w-full flex flex-col rounded-lg  md:w-1/2 m-auto "
        onSubmit={(e) => {
          e.preventDefault();
          handleGptSearch();
        }}
      >
        <input
          type="text"
          placeholder={
            languageConstant[langSel]?.Placeholder ||
            "Enter your movie preferences"
          }
          className="mr-4 p-4 rounded-lg w-full flex"
          ref={inputRef}
        />

        <button className="bg-red-700 text-white px-8 py-4 rounded-lg m-auto w-1/2 mt-4">
          {languageConstant[langSel]?.Search || "Search"}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
