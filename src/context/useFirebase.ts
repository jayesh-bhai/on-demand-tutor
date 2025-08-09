import { useContext } from "react";
import type { FirebaseApp } from "firebase/app";
import FirebaseContext from "./FirebaseContext";

export const useFirebase = (): FirebaseApp => {
  const app = useContext(FirebaseContext);
  if (!app) throw new Error("FirebaseApp not available");
  return app;
};
