// src/firebaseconfigurations/init.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import type { FirebaseApp } from "firebase/app";
import { firebaseConfig } from "./config";

// Initialize Firebase App
const app: FirebaseApp = initializeApp(firebaseConfig);

// ✅ Initialize and export auth and db
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
