import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBnl7hSfXXUj4khyV3yrhT5oUtMQfdoH_A",
  authDomain: "newbi-ent-v2.firebaseapp.com",
  projectId: "newbi-ent-v2",
  storageBucket: "newbi-ent-v2.firebasestorage.app",
  messagingSenderId: "860370467784",
  appId: "1:860370467784:web:d7b4dfc66336f6da50defd"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
