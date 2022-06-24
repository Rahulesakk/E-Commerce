import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA_rkWbtsKgea7s_puAZJLsq8YT13ewpfw",
  authDomain: "ecommerce-af710.firebaseapp.com",
  projectId: "ecommerce-af710",
  storageBucket: "ecommerce-af710.appspot.com",
  messagingSenderId: "257717849115",
  appId: "1:257717849115:web:d3a260167087c621defcbe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
 
export const googleAuthProvider = new GoogleAuthProvider();
