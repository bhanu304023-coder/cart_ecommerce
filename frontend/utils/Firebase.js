import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "login-cart-e4eeb.firebaseapp.com",
  projectId: "login-cart-e4eeb",
  storageBucket: "login-cart-e4eeb.firebasestorage.app",
  messagingSenderId: "609552893448",
  appId: "1:609552893448:web:2f7f64cb13d38c8b6833bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
