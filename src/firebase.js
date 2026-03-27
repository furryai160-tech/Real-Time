import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Replace these with your actual Firebase configuration
 apiKey: "AIzaSyA6dGfBF2inEvtk7oegKqIY0gwAwk6lHqg",
  authDomain: "real-time-95504.firebaseapp.com",
  databaseURL: "https://real-time-95504-default-rtdb.firebaseio.com",
  projectId: "real-time-95504",
  storageBucket: "real-time-95504.firebasestorage.app",
  messagingSenderId: "704048337546",
  appId: "1:704048337546:web:f2973de066bd8690b45373",
  measurementId: "G-H36H3TB9M6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
