// AuthProvider.tsx
import { AuthContext } from './AuthContext';
import { useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebaseconfigurations/init';
import { doc, getDoc } from 'firebase/firestore';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [role, setRole] = useState<'student' | 'mentor' | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRole(docSnap.data().role);
        }
      } else {
        setRole(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, role }}>
      {children}
    </AuthContext.Provider>
  );
};