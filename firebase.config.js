import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyCslq2cmdbezrFlhoODGJph2CcYQhyd4HA",
  authDomain: "sell-it-app-3e190.firebaseapp.com",
  projectId: "sell-it-app-3e190",
  storageBucket: "sell-it-app-3e190.appspot.com",
  messagingSenderId: "652308487345",
  appId: "1:652308487345:web:6f24bd919e6c6540965690",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
