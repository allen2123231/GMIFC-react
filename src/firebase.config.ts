// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLmsJFslAOFo9aOKzuvClJY2Wo_o9vyO8",
  authDomain: "gmifc-e0dcb.firebaseapp.com",
  projectId: "gmifc-e0dcb",
  storageBucket: "gmifc-e0dcb.appspot.com",
  messagingSenderId: "975440328762",
  appId: "1:975440328762:web:64ea0b78fe8354a5911d03",
  measurementId: "G-KPHJZT6SEY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const datebase = getFirestore();
const analytics = getAnalytics(app);
