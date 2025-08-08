// src/context/FirebaseProvider.tsx
import React, { createContext, useContext, ReactNode } from "react";
import type { FirebaseApp } from "firebase/app";          // type-only import
import { firebaseApp } from "../firebase/firebaseApp";     // actual initialized app

// 1. Create context typed as FirebaseApp
const FirebaseContext = createContext<FirebaseApp | null>(null);

// 2. Hook for components to consume
export function useFirebase(): FirebaseApp {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error("useFirebase must be inside <FirebaseProvider>");
  }
  return context;
}

// 3. Provider props
interface Props {
  children: ReactNode;
}

// 4. The provider component
export const FirebaseProvider: React.FC<Props> = ({ children }) => {
  return (
    <FirebaseContext.Provider value={firebaseApp}>
      {children}
    </FirebaseContext.Provider>
  );
};
