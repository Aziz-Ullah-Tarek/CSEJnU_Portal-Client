// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmeXwEOcYGDoEvPeomTARNKlt1dFKwgKE",
  authDomain: "csejnuportal.firebaseapp.com",
  projectId: "csejnuportal",
  storageBucket: "csejnuportal.firebasestorage.app",
  messagingSenderId: "265712697821",
  appId: "1:265712697821:web:3f854b998d3e5ae8f8b634"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;