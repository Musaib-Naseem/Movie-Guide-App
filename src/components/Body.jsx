import React from "react";
import { BrowserRouter, Routes , Route } from "react-router-dom";
import Login from "./Login";
import Browse from "./Browse";

// import { auth } from "../utils/Firebase";
// import { useDispatch } from "react-redux";
// import { addUsers, removeUser } from "../utils/userSlice";

const Body=()=>{



return(

    <div>
    
  <BrowserRouter>

  <Routes>

  <Route path="/"  element={ <Login /> } />
  <Route path="/browse" element={ <Browse /> } />

  </Routes>

  </BrowserRouter>


    </div>

)

}

export default Body;