import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyBkyP5notmdNjfwbpkkx6pSTwOhpzZ8wSc",
    authDomain: "foodapp1-9f48c.firebaseapp.com",
    projectId: "foodapp1-9f48c",
    storageBucket: "foodapp1-9f48c.appspot.com",
    messagingSenderId: "379471778077",
    appId: "1:379471778077:web:7d32cdf7d49e6daa0c51f4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };