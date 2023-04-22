// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0zA4423fg2vrp3nNN_mwtvI4qFxEGrvc",
  authDomain: "gpt-nv.firebaseapp.com",
  projectId: "gpt-nv",
  storageBucket: "gpt-nv.appspot.com",
  messagingSenderId: "740522142425",
  appId: "1:740522142425:web:c61576f8a4b70b062c6cc8",
  measurementId: "G-QBFJRC79W8"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };