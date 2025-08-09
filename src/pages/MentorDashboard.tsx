// src/pages/MentorDashboard.tsx
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseconfigurations/init';
import { useNavigate } from 'react-router-dom';

export default function MentorDashboard() {
  const navigate = useNavigate();
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Mentor Dashboard</h1>
      <p>Welcome, mentor! Build out mentor features here.</p>
      <button onClick={() => { signOut(auth); navigate('/'); }}>Logout</button>
    </div>
  );
}
