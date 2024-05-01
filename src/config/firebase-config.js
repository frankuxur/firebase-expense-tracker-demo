// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhudQtkfyEsX2lGn8QtCRx0z3yUDtS2Fw",
  authDomain: "expense-tracker-cc81d.firebaseapp.com",
  projectId: "expense-tracker-cc81d",
  storageBucket: "expense-tracker-cc81d.appspot.com",
  messagingSenderId: "1005066277032",
  appId: "1:1005066277032:web:0fda568f4ef822ccd3729d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)