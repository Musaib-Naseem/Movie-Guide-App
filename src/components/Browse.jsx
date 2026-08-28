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

  const showTogData = useSelector((store) => store.gpt.IsGptSlice);

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Header />

      <main className="w-full overflow-x-hidden">
        {showTogData ? (
          <section className="min-h-screen pt-24">
            <GPTSearch />
          </section>
        ) : (
          <>
            <section className="w-full">
              <MainContainer />
            </section>

            <section className="w-full px-0 md:px-4 pb-10">
              <SecondaryContainer />
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Browse;
