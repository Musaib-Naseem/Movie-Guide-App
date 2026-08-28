import React from "react";
import { useSelector } from "react-redux";
import { IMAGE_CDN_URL } from "../utils/Constants";

const GPTMovieSuggestions = () => {
  const SelMovie = useSelector((store) => store.movies.searchedMovies);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-black px-4 pb-16 pt-8 sm:px-6 md:px-10 lg:px-16">
      {/* Header */}
      <div className="mx-auto mb-10 max-w-7xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-purple-500" />
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                AI Powered
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              AI Movie Recommendations
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400 md:text-base">
              Discover movies selected by AI based on your search and
              preferences.
            </p>
          </div>

          {SelMovie?.length > 0 && (
            <div className="text-sm text-gray-500">
              {SelMovie.length}{" "}
              {SelMovie.length === 1 ? "recommendation" : "recommendations"}
            </div>
          )}
        </div>
      </div>

      {/* Movie Grid */}
      {SelMovie?.length > 0 ? (
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SelMovie.map((movie_data, index) => {
            const movie = movie_data?.results?.[0];

            if (!movie) return null;

            return (
              <div
                key={movie.id || index}
                className="group overflow-hidden rounded-2xl border border-gray-800 bg-[#111111] shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-gray-600 hover:shadow-2xl"
              >
                {/* Poster */}
                <div className="relative aspect-[2/3] overflow-hidden bg-gray-900">
                  {movie.poster_path ? (
                    <img
                      src={`${IMAGE_CDN_URL}${movie.poster_path}`}
                      alt={movie.title || "Movie poster"}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gray-900">
                      <span className="text-sm text-gray-500">
                        No poster available
                      </span>
                    </div>
                  )}

                  {/* Dark Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />

                  {/* AI Badge */}
                  <div className="absolute left-4 top-4">
                    <span className="rounded-full border border-purple-400/30 bg-purple-600/90 px-3 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-sm">
                      ✦ AI Pick
                    </span>
                  </div>

                  {/* Movie Info on Poster */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h2 className="line-clamp-2 text-xl font-bold leading-tight text-white">
                      {movie.title || "Untitled Movie"}
                    </h2>

                    <div className="mt-2 flex items-center gap-3 text-xs text-gray-300">
                      {movie.release_date && (
                        <span>{movie.release_date.substring(0, 4)}</span>
                      )}

                      {movie.vote_average > 0 && (
                        <>
                          <span className="text-gray-600">•</span>
                          <span className="flex items-center gap-1 text-yellow-400">
                            ★
                            <span className="text-gray-300">
                              {movie.vote_average.toFixed(1)}
                            </span>
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-md bg-red-600/10 px-2.5 py-1 text-xs font-semibold text-red-500">
                      Movie
                    </span>

                    {movie.original_language && (
                      <span className="text-xs uppercase tracking-wide text-gray-500">
                        {movie.original_language}
                      </span>
                    )}
                  </div>

                  <p className="line-clamp-3 min-h-[72px] text-sm leading-6 text-gray-400">
                    {movie.overview ||
                      "No description available for this movie."}
                  </p>

                  {/* Button */}
                  <button
                    type="button"
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-white py-3 text-sm font-semibold text-black transition-all duration-200 hover:bg-gray-200 active:scale-[0.98]"
                  >
                    View Movie
                    <span className="text-base">→</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="mx-auto flex min-h-[450px] max-w-2xl items-center justify-center">
          <div className="w-full rounded-2xl border border-gray-800 bg-[#111111] px-6 py-12 text-center shadow-xl">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10">
              <span className="text-3xl">✦</span>
            </div>

            <h2 className="text-xl font-semibold text-white">
              No recommendations yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              Search for a movie, actor, genre, or something you would like to
              watch and let AI find recommendations for you.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GPTMovieSuggestions;
