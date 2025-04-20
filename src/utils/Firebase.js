// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuPG3sMpsPBKZxIersDaeKpMV3Pa78RVQ",
  authDomain: "entertainai.firebaseapp.com",
  projectId: "entertainai",
  storageBucket: "entertainai.firebasestorage.app",
  messagingSenderId: "494577761980",
  appId: "1:494577761980:web:001b9fc4a3818a272f1ab9",
  measurementId: "G-TQBPK27JDG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();