// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyASCFE_dSii2iTT2b2epagKGvh-lsdyQB8",
  // authDomain: "testapi-98103.firebaseapp.com",
  databaseURL: "https://wood--selling-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "wood--selling",
//   storageBucket: "testapi-98103.appspot.com",
//   messagingSenderId: "1030868661045",
//   appId: "1:1030868661045:web:feea3da5bb26158178127c",
//   measurementId: "G-SK1D0YDWCM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
