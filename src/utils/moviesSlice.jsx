import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({

name:"movies",
initialState:{
    nowPlayingMovies:null,
    nowTrailer:null,
    nowTrending:null,
    searchedMovies:null
},
reducers:{

addNowPlayingMovies:(state,action)=>{

state.nowPlayingMovies = action.payload;

},

addTrendingMovies:(state,action)=>{

state.nowTrending = action.payload;

},

addTrailer:(state,action)=>{

state.nowTrailer= action.payload;

},

addSearchedMovies:(state,action)=>{

state.searchedMovies=action.payload;

}

}

})

export const { addNowPlayingMovies, addTrailer, addTrendingMovies, addSearchedMovies} = moviesSlice.actions;

export default moviesSlice.reducer;

