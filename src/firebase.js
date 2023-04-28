// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAl-WYSw5qFFJYIGyE2yWZfTPAw4Ahs79E",
    authDomain: "chatbot2-74e55.firebaseapp.com",
    projectId: "chatbot2-74e55",
    storageBucket: "chatbot2-74e55.appspot.com",
    messagingSenderId: "764873195588",
    appId: "1:764873195588:web:fb46c0922188f16cddfc11",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
