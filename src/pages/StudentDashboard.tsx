// src/pages/StudentDashboard.tsx
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseconfigurations/init';
import { useNavigate } from 'react-router-dom';

export default function StudentDashboard() {
  const navigate = useNavigate();
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Student Dashboard</h1>
      <p>Welcome, student! Build out student features here.</p>
      <button onClick={() => { signOut(auth); navigate('/'); }}>Logout</button>
    </div>
  );
}
