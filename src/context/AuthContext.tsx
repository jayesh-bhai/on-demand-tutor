// AuthContext.tsx
import type { User } from 'firebase/auth';
import { createContext } from 'react';

export interface AuthContextProps {
  currentUser: User | null;
  role: 'student' | 'mentor' | null;
}

export const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  role: null,
});