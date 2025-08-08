import { initializeApp } from "firebase/app";
import type { FirebaseApp } from "firebase/app";
import { firebaseConfig } from "./config";

// Singleton Firebase App
const app: FirebaseApp = initializeApp(firebaseConfig);
export default app;
