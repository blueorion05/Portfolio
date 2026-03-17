// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3JmCeQmkpwrYu0V9cEv_F_JSdy8WPLdI",
  authDomain: "jhudiel-portfolio.firebaseapp.com",
  projectId: "jhudiel-portfolio",
  storageBucket: "jhudiel-portfolio.firebasestorage.app",
  messagingSenderId: "128731473588",
  appId: "1:128731473588:web:a617a2bcd15a7b52a799e1",
  measurementId: "G-M7Q8G41WT5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);