import { createContext } from "react";
import type { FirebaseApp } from "firebase/app";
import firebaseApp from "../firebaseconfigurations/init";

// ⚠️ Only one export (component), avoids Fast Refresh issues
const FirebaseContext = createContext<FirebaseApp | null>(firebaseApp);
export default FirebaseContext;
