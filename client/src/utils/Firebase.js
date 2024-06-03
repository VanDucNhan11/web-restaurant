// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJGfQb5YYJZGxSNfG2I3nSHhZk0nqOupE",
  authDomain: "restaurant-web-9ca87.firebaseapp.com",
  projectId: "restaurant-web-9ca87",
  storageBucket: "restaurant-web-9ca87.appspot.com",
  messagingSenderId: "50360038396",
  appId: "1:50360038396:web:00a7744e7431d4604d3879",
  measurementId: "G-8595HYFCPS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;