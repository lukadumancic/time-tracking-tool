// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCequPM0kBYva7-WPvpTBlPU3XHqEr2kkg",
  authDomain: "time-tracking-tool-16ccc.firebaseapp.com",
  projectId: "time-tracking-tool-16ccc",
  storageBucket: "time-tracking-tool-16ccc.appspot.com",
  messagingSenderId: "37073422836",
  appId: "1:37073422836:web:7f5303ad79d29b4d0511a1",
  measurementId: "G-KB49XYFNSZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);

export const signIn = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential;
};
