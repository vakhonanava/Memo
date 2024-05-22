// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAv63wXIam3nTmPA4nGpkepB2auMofNB9g",
  authDomain: "qr-memory.firebaseapp.com",
  projectId: "qr-memory",
  storageBucket: "qr-memory.appspot.com",
  messagingSenderId: "214290746738",
  appId: "1:214290746738:web:bd53a28709cb18202be1eb",
  measurementId: "G-QQJWNZN54S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Firebase services
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

const analytics = getAnalytics(app);
