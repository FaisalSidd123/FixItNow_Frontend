// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDz7qBmRRAw6aBbWVjZPe05vz25eLoH49E",
  authDomain: "fixitnow-57904.firebaseapp.com",
  projectId: "fixitnow-57904",
  storageBucket: "fixitnow-57904.firebasestorage.app",
  messagingSenderId: "242574366416",
  appId: "1:242574366416:web:b27a5982f6795088dc70d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {app,auth};