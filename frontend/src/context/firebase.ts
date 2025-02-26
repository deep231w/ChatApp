// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWzt_-AzHvO3KMsXQMfxvQEpJXzRErPK8",
  authDomain: "chatapp-6a195.firebaseapp.com",
  projectId: "chatapp-6a195",
  storageBucket: "chatapp-6a195.firebasestorage.app",
  messagingSenderId: "1074955310083",
  appId: "1:1074955310083:web:2370746eaea6a92a6a2a36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth= getAuth(app);

console.log("🔥 Firebase Auth Initialized:", auth);

export default app;