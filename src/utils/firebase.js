// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLEaZcp9KQjSOZ-o70u91rgDBW23ViFJA",
  authDomain: "netflixgpt-8277b.firebaseapp.com",
  projectId: "netflixgpt-8277b",
  storageBucket: "netflixgpt-8277b.appspot.com",
  messagingSenderId: "25691578274",
  appId: "1:25691578274:web:de96c29667db3e245a1cfb",
  measurementId: "G-0ZHKSZ4SJS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();