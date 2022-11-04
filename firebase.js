// import { initializeApp } from "firebase/app";
// import * as firebase from "firebase";
// import "@firebase/auth";
// import "@firebase/firestore";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJKCHfhyFC18dDeSuvxzY_8r6OZtDAKgE",
  authDomain: "signal2-clone.firebaseapp.com",
  projectId: "signal2-clone",
  storageBucket: "signal2-clone.appspot.com",
  messagingSenderId: "885517006728",
  appId: "1:885517006728:web:1f83257782e7ad9941ec3d",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

// const auth = firebase.auth();

export { firebase, db };
