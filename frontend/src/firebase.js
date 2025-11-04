// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCzjvrYE0VIZ8O0wHKXPxSGbx6asWXmYQs",
    authDomain: "elc-portal-e0b1f.firebaseapp.com",
    projectId: "elc-portal-e0b1f",
    storageBucket: "elc-portal-e0b1f.firebasestorage.app",
    messagingSenderId: "1052064809233",
    appId: "1:1052064809233:web:f4fab9747e8c09d5928cb0",
    measurementId: "G-D8QQH53L00"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
