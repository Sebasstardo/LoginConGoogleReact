import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA1E9PDOntd5Fhq15HxKovZbs-gJFn1uq0",

  authDomain: "poke-cfc57.firebaseapp.com",

  projectId: "poke-cfc57",

  storageBucket: "poke-cfc57.appspot.com",

  messagingSenderId: "454510145933",

  appId: "1:454510145933:web:6465e87be21b08c69c4dc4",
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
export { auth, firebase, db, storage };
