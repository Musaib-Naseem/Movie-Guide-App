import React from "react";
import GPTSearchBar from "./GPTSearchBar";
import GPTMovieSuggestions from "./GPTMovieSuggestions";

const GPTSearch = () => {
  return (
    <div>
      <div className="absolute -z-10 h-[100%]">
        <img
          alt=""
          className="h-screen w-screen object-cover wd-full"
          src="https://media.istockphoto.com/id/1412871535/photo/friends-watching-movies-together-at-home.jpg?s=612x612&w=0&k=20&c=ELSN7ZtKYDs7DeW9EG_Dh7i-aIBOR_9ktlvRpFaZnEM="
        />
      </div>

      <GPTSearchBar />
      <GPTMovieSuggestions />
    </div>
  );
};

export default GPTSearch;
