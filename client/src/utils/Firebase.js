// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-XmX1TlODRm0zgkgBbN4QKPY2gGSIWko",
  authDomain: "restaurant-web-dea02.firebaseapp.com",
  projectId: "restaurant-web-dea02",
  storageBucket: "restaurant-web-dea02.appspot.com",
  messagingSenderId: "950944819081",
  appId: "1:950944819081:web:c51bf64e0200b6a792a358",
  measurementId: "G-K7H9XVW05D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;