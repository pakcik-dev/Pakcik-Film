import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxsoR2bxP0OjBdZ6B0_KqiUbo5ZRJ7TM",
  authDomain: "pakcik-film-app.firebaseapp.com",
  projectId: "pakcik-film-app",
  storageBucket: "pakcik-film-app.firebasestorage.app",
  messagingSenderId: "192919489693",
  appId: "1:192919489693:web:b47d92894743b8e8465874",
  measurementId: "G-FDSC0416EX"
};

// Inisialisasi Firebase (Mencegah re-initialization saat hot-reload)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };