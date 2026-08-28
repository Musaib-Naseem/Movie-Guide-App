import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAuPG3sMpsPBKZxIersDaeKpMV3Pa78RVQ",
  authDomain: "entertainai.firebaseapp.com",
  projectId: "entertainai",
  storageBucket: "entertainai.firebasestorage.app",
  messagingSenderId: "494577761980",
  appId: "1:494577761980:web:001b9fc4a3818a272f1ab9",
  measurementId: "G-TQBPK27JDG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
