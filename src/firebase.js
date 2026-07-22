import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaKjrm0YMsdD1ZiRDqNKhohJ4eq24vggI",
  authDomain: "bookly-87248.firebaseapp.com",
  projectId: "bookly-87248",
  storageBucket: "bookly-87248.firebasestorage.app",
  messagingSenderId: "44866754239",
  appId: "1:44866754239:web:d80ff148db16e53613180a",
  measurementId: "G-PD0Q1MPYM4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {});
}

export default app;

