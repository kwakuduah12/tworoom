// Import the functions needed from the SDKs needed
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products 
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBvF8woXDn_ZOAN-0-ZyGtm-VxYDaOmrFU",
    authDomain: "tworoom-d0eb6.firebaseapp.com",
    projectId: "tworoom-d0eb6",
    storageBucket: "tworoom-d0eb6.firebasestorage.app",
    messagingSenderId: "530639346898",
    appId: "1:530639346898:web:9c8847eb7851802a0aa10b",
    measurementId: "G-4B82S79M7X"
  };

// IMPORTANT: Do NOT initialize analytics in Expo
// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

if (__DEV__) {
  try {
    connectAuthEmulator(auth, "http://127.0.0.1:9099");
  } catch (error) {
    console.error("Failed to connect to auth emulator:", error);
  }
}