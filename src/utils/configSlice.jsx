import { createSlice } from "@reduxjs/toolkit";


const configSlice = createSlice({

name:"preferredLanguage",
initialState:{

    lang:"en"

},

reducers:{

    ToggleLang:(state,action)=>{

        state.lang = action.payload;

    }

}

})


export const { ToggleLang }  = configSlice.actions;


export default configSlice.reducer;