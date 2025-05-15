// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9QXeSy-bU2WFXISj22erBWqwcAfikEXI",
  authDomain: "restaurent-billing.firebaseapp.com",
  projectId: "restaurent-billing",
  storageBucket: "restaurent-billing.firebasestorage.app",
  messagingSenderId: "508998848948",
  appId: "1:508998848948:web:2082ee323970bcbb27a2e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore database
export const db = getFirestore(app);
