import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyCaKjrm0YMsdD1ZiRDqNKhohJ4eq24vggI",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "bookly-87248.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "bookly-87248",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "bookly-87248.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "44866754239",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:44866754239:web:d80ff148db16e53613180a",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-PD0Q1MPYM4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
