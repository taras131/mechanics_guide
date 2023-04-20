import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyBjdzkFsgIXq4Wc3khWESDBC7luOYMWtHg",
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "mechanics-guides-92401.firebaseapp.com",
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "mechanics-guides-92401",
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "mechanics-guides-92401.appspot.com",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID || "821463603736",
    appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:821463603736:web:55d5f61b2c63c227c9016d",
  //  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};


export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const db = getFirestore(app);