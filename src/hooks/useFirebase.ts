// src/hooks/useFirebase.ts
import { useContext } from 'react';
import { FirebaseContext } from '../context/FirebaseProvider';

export function useFirebase(): FirebaseApp {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error("useFirebase must be inside <FirebaseProvider>");
  }
  return context;
}