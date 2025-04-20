import { Link } from "react-router-dom";
import Header from "./Header";
import React,{useRef, useState} from "react";
import { ValidateFormOne } from "../utils/Validate";
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";

import { auth } from "../utils/Firebase";
import { useNavigate } from "react-router-dom";
import { addUsers } from "../utils/userSlice";
import { logoImage } from "../utils/Constants";


const Login = () => {

  const dispatch = useDispatch();
  const [ IsSignIn,setSignIn ] = useState(true);
  
  const [ errorMessage,setErrorMessage ] = useState(null) 
  
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  
  
  const Navigate = useNavigate();
  
  
  const handleSignIn=()=>{
  
      setSignIn(!IsSignIn);
  
  }
  
  
  const validateForm=(e)=>{
  
     e.preventDefault();
  
  //    console.log(email.current.value);
  //    console.log(password.current.value);
     const emailValue =  email.current.value;
     const passwordValue = password.current.value;
     
  
     const message = ValidateFormOne(emailValue,passwordValue);
  
     setErrorMessage(message);
  
  
     if(message) return;
  
     if(!IsSignIn){
  
  
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
    .then((userCredential) => {
  
      const user = userCredential.user;


      updateProfile(user, {
     
        displayName: name.current.value, photoURL: logoImage
      
      }).then(() => {


        dispatch(addUsers({
       uid:user.uid,
       email:user.email,
       displayName:name.current.value,
       photoURL:logoImage

        }))
        // Profile updated!
    Navigate("/browse");
        
        
        // ...
      }).catch((error) => {
        // An error occurred
        // ...
      });
  
      // console.log(user);
  
      // Navigate("/browse");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
  
      setErrorMessage(errorCode+" "+errorMessage);
      // ..
    });
  
  
     }
  
     else{
  
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);

      dispatch(addUsers({
        uid:user.uid,
        email:user.email,
        displayName:user.displayName,
        photoURL:user.photoURL,
 
         }))

      // Navigate("/browse");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
  
      setErrorMessage(errorCode+" "+errorMessage);
    });
  
  
     }
     
  
  }
  
  
  
  
  
  return (
    <div>
     <Header />

     <img className="w-screen h-screen absolute"  src="https://cdn.mos.cms.futurecdn.net/rDJegQJaCyGaYysj2g5XWY.jpg" />

     <form className="p-12 bg-black absolute my-28  w-[90%] mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80 absolute md:w-3/12">
     
         <h1 className="font-bold text-3xl py-4 ">{ IsSignIn ? "Sign In" : "Sign Up" } </h1>
     
         { !IsSignIn && <input type="text" placeholder="Full Name" ref={name} className="p-4 my-2 w-full bg-gray-700"/> }
     
         <input type="text" ref = {email} placeholder="Email Address" className="p-4 my-2 w-full bg-gray-700"/>
         {/* <p className=" text-red-500 font-bold text-lg"> { errorMessage } </p> */}
     
         <input type="password" ref={ password } placeholder="Password" className="p-4 my-2 w-full bg-gray-700" />
         <p className=" text-red-500 font-bold text-lg"> { errorMessage } </p>
     
         <button className="py-4 my-4 w-full bg-red-700" onClick={ validateForm }> { IsSignIn ? "Sign In" : "Sign Up" }  </button>
     
         {IsSignIn ? <Link onClick={ handleSignIn  } > <p className="py-4"> New to Netflix? Signup Now </p>  </Link> : <Link onClick={ handleSignIn  } > <p className="py-4"> Already a user? Sign In Now </p>  </Link>}
     
         </form>
    </div>
  );
};

export default Login;
