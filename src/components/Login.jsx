import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useDispatch } from "react-redux";

import Header from "./Header";
import { ValidateFormOne } from "../utils/Validate";
import { auth } from "../utils/Firebase";
import { addUsers } from "../utils/userSlice";
import { logoImage } from "../utils/Constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  // Switch between Sign In and Sign Up
  const handleSignIn = () => {
    setIsSignIn((previousValue) => !previousValue);
    setErrorMessage("");
  };

  const validateForm = (e) => {
    e.preventDefault();

    const emailValue = email.current?.value.trim();
    const passwordValue = password.current?.value;

    // Validate email and password
    const message = ValidateFormOne(emailValue, passwordValue);

    setErrorMessage(message || "");

    if (message) {
      return;
    }

    // =========================
    // SIGN UP
    // =========================
    if (!isSignIn) {
      const nameValue = name.current?.value.trim();

      if (!nameValue) {
        setErrorMessage("Please enter your full name.");
        return;
      }

      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;

          return updateProfile(user, {
            displayName: nameValue,
            photoURL: logoImage,
          }).then(() => {
            dispatch(
              addUsers({
                uid: user.uid,
                email: user.email,
                displayName: nameValue,
                photoURL: logoImage,
              }),
            );

            console.log("Signup successful:", user);

            // Go to Browse page
            navigate("/browse");
          });
        })
        .catch((error) => {
          console.error("Signup error:", error);

          switch (error.code) {
            case "auth/email-already-in-use":
              setErrorMessage(
                "This email is already registered. Please sign in.",
              );
              break;

            case "auth/invalid-email":
              setErrorMessage("Please enter a valid email address.");
              break;

            case "auth/weak-password":
              setErrorMessage("Password should be at least 6 characters.");
              break;

            default:
              setErrorMessage(`${error.code}: ${error.message}`);
          }
        });

      return;
    }

    // =========================
    // SIGN IN
    // =========================
    signInWithEmailAndPassword(auth, emailValue, passwordValue)
      .then((userCredential) => {
        const user = userCredential.user;

        console.log("Login successful:", user);

        dispatch(
          addUsers({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          }),
        );

        // Navigate after successful login
        navigate("/browse");
      })
      .catch((error) => {
        console.error("Firebase Login Error:", error);
        console.error("Error Code:", error.code);
        console.error("Error Message:", error.message);

        switch (error.code) {
          case "auth/invalid-credential":
            setErrorMessage("Invalid email or password.");
            break;

          case "auth/user-not-found":
            setErrorMessage("No account exists with this email.");
            break;

          case "auth/wrong-password":
            setErrorMessage("Incorrect password.");
            break;

          case "auth/invalid-email":
            setErrorMessage("Please enter a valid email address.");
            break;

          case "auth/user-disabled":
            setErrorMessage("This account has been disabled.");
            break;

          case "auth/too-many-requests":
            setErrorMessage(
              "Too many failed attempts. Please try again later.",
            );
            break;

          default:
            setErrorMessage(`${error.code}: ${error.message}`);
        }
      });
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Background Image */}
      <img
        className="fixed inset-0 w-full h-full object-cover -z-10"
        src="https://cdn.mos.cms.futurecdn.net/rDJegQJaCyGaYysj2g5XWY.jpg"
        alt="Background"
      />

      {/* Login / Signup Form */}
      <form
        onSubmit={validateForm}
        className="p-8 md:p-12 bg-black absolute my-28 w-[90%] md:w-3/12 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>

        {/* Full Name - Signup only */}
        {!isSignIn && (
          <input
            type="text"
            placeholder="Full Name"
            ref={name}
            className="p-4 my-2 w-full bg-gray-700 rounded"
          />
        )}

        {/* Email */}
        <input
          type="email"
          ref={email}
          placeholder="Email Address"
          className="p-4 my-2 w-full bg-gray-700 rounded"
        />

        {/* Password */}
        <input
          type="password"
          ref={password}
          placeholder="Password"
          className="p-4 my-2 w-full bg-gray-700 rounded"
        />

        {/* Error Message */}
        {errorMessage && (
          <p className="text-red-500 font-bold text-sm py-2">{errorMessage}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="py-4 my-4 w-full bg-red-700 hover:bg-red-800 rounded font-semibold"
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>

        {/* Switch Sign In / Sign Up */}
        <button
          type="button"
          onClick={handleSignIn}
          className="py-4 text-left text-white hover:underline"
        >
          {isSignIn
            ? "New to Netflix? Sign up now"
            : "Already a user? Sign in now"}
        </button>
      </form>
    </div>
  );
};

export default Login;
