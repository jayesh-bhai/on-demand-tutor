// src/firebase/firebaseApp.ts
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";

// Initialize the Firebase app (singleton)
export const firebaseApp = initializeApp(firebaseConfig);
