
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyASCFE_dSii2iTT2b2epagKGvh-lsdyQB8",
  databaseURL: "https://wood--selling-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: " wood--selling", 
  projectNumber: "972516843124"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
