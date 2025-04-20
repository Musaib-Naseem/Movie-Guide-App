import React,{useEffect} from "react";
import { auth } from "../utils/Firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { addUsers,removeUser } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { bgImage } from "../utils/Constants";
import { toggleGPT } from "../utils/gptSlice";
import { SupportedLang } from "../utils/Constants";
import { ToggleLang } from "../utils/configSlice";


const Header = () => {


    const gptData = useSelector(store=>store.gpt);
    const showTogData = gptData.IsGptSlice

  const user = useSelector((store) => store.user);
  console.log(user);

  const movies = useSelector((store) => store.movies);
  console.log(movies);

  const langSel = useSelector(store=>store);

  console.log(langSel);
  
  const dispatch = useDispatch();
  const Navigate = useNavigate();


  const handleGPT=()=>{

    dispatch(toggleGPT());

  }
 

  useEffect(()=>{

const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
     
      const {uid,email,displayName,photoURL} = user;

      dispatch(addUsers({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
      Navigate("/browse");
      
    } else {

      dispatch(removeUser());
      Navigate("/");

    }
  });

  return ()=>unsubscribe();

},[]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // Navigate("/");
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };


  const handleChange=(e)=>{

    dispatch(ToggleLang(e.target.value));

  }

  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full flex flex-col  md:flex-row justify-between items-center cover-full pb-12 ">

     
      <img
        className="w-44"
        src={bgImage}
        alt="Netflix logo"
      />
      <div className="flex items-center space-x-4 mt-4 md:mt-0 w-[auto] mt-1">
     { user && 
      <div className="flex flex-wrap justify-center items-center items-baseline ">

{
  showTogData ?  <select className="m-4 mr-12 p-0 px-4 bg-black-500 text-black border-0" onChange={ handleChange }>
  {

SupportedLang.map(data=> <option key={data.identifier} value={data.identifier} > {data.LanguageName} </option> )

  }
 

  </select> : ""

}
       
        
        <button onClick={ handleGPT } className="m-4 px-4 py-2 bg-purple-500 text-white rounded-lg m-2 -ml-4"> {showTogData ? "Home Page" : "GPT Search" }</button>
        
         {/* <img
className="w-12 h-12 p-2 rounded-full"
          src={user?.photoURL}
          alt="User profile"
        /> */}
        <h1 className="text-white font-semibold m-4">{user?.displayName}</h1>
        <button
          onClick={handleSignOut}
          className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600 mt-8 m-4"
        >
          Sign Out
        </button>
        </div>
}
      </div>
    </div>
  );
};

export default Header;
