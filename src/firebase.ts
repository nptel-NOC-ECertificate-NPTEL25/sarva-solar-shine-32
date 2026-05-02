// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQcs9M04KNUEQ_H7bUdws8VEr5BLT5aqc",
  authDomain: "sarva-group-of-companys.firebaseapp.com",
  projectId: "sarva-group-of-companys",
  storageBucket: "sarva-group-of-companys.firebasestorage.app",
  messagingSenderId: "748768872437",
  appId: "1:748768872437:web:8767bb97bff9ce4d65c2bc",
  measurementId: "G-R0B1LW1SRH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
