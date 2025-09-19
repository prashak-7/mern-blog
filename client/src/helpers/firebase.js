import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getEnv } from "./getEnv";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEnv("VITE_FIREBASE_API_KEY"),
  authDomain: "mern-blog-46e08.firebaseapp.com",
  projectId: "mern-blog-46e08",
  storageBucket: "mern-blog-46e08.firebasestorage.app",
  messagingSenderId: "252071196045",
  appId: "1:252071196045:web:f1dc0c44b588ff1a52f9c4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
