import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || 'mock_key',
  authDomain: "react-chat-24846.firebaseapp.com",
  projectId: "react-chat-24846",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: "552107816308",
  appId: "1:552107816308:web:d1d0d3a41f48724bd52821"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage();