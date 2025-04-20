import { createSlice } from "@reduxjs/toolkit";

const gptSlice=createSlice({

name:"gpt",
initialState:{

IsGptSlice:false

},

reducers:{

toggleGPT:(state,action)=>{

 state.IsGptSlice = !state.IsGptSlice;

}

}

});


export const { toggleGPT } =  gptSlice.actions;

export default gptSlice.reducer;