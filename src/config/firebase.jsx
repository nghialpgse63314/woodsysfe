
// import { initializeApp } from "firebase/app";

import firebase from 'firebase/compat/app';
import 'firebase/database';
// import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyA_mI75RgxjPZz03Nq4jNLkLfil6QO6FYM",
  authDomain: "fir-starter-587de.firebaseapp.com",
  projectId: "fir-starter-587de",
  databaseURL: "https://fir-starter-587de-default-rtdb.asia-southeast1.firebasedatabase.app/Product",
  storageBucket: "fir-starter-587de.appspot.com",
  messagingSenderId: "943898010882",
  appId: "1:943898010882:web:9ed05d1e89ffacd68d0e1b",
  measurementId: "G-3NTFYGJYBK"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);
// export { database };
firebase.initializeApp(firebaseConfig);

export default firebase;
