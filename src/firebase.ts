import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBjdzkFsgIXq4Wc3khWESDBC7luOYMWtHg",
    authDomain: "mechanics-guides-92401.firebaseapp.com",
    projectId: "mechanics-guides-92401",
    storageBucket: "mechanics-guides-92401.appspot.com",
    messagingSenderId: "821463603736",
    appId: "1:821463603736:web:55d5f61b2c63c227c9016d",
    //  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};


export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const db = getFirestore(app);