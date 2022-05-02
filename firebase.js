// Import the functions you need from the SDKs you need
//import * as firebase from "firebase";
import { initializeApp, getApps } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  doc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  collectionGroup,
  arrayUnion,
  arrayRemove,
  updateDoc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMpylxftLJF3zF8Y4kxs_utVcow0LXUfM",
  authDomain: "vzualize-5520f.firebaseapp.com",
  projectId: "vzualize-5520f",
  storageBucket: "vzualize-5520f.appspot.com",
  messagingSenderId: "263193117355",
  appId: "1:263193117355:web:bd785bd310c6d06c73edee",
  measurementId: "G-L4DLWQJH2S",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// let app;
// if (firebaseConfig.apps.length === 0) {
//   app = initializeApp(firebaseConfig);
// } else {
//   app = firebase.app();
// }

// const auth = firebase.auth();

//export { auth };
if (!getApps().length) initializeApp(firebaseConfig);

export {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  collection,
  collectionGroup,
  addDoc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  getDoc,
  getDocs,
  setDoc,
  doc,
  arrayUnion,
  arrayRemove,
  updateDoc,
};
