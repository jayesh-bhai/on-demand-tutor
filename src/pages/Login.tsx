import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseconfigurations/init';
import { doc, getDoc } from 'firebase/firestore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // fetch role from Firestore
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const role = data.role as 'student' | 'mentor' | undefined;

        if (role === 'mentor') {
          navigate('/mentor-dashboard');
        } else if (role === 'student') {
          navigate('/student-dashboard');
        } else {
          // fallback if role missing
          navigate('/');
        }
      } else {
        // user doc doesn't exist
        console.warn('No user doc found, redirecting to home');
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-white/5 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-white/10 rounded-full animate-bounce delay-700"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-3 group">
            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl group-hover:scale-110 transition-transform duration-300">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">SeniorWise</span>
          </Link>
        </div>

        {/* Login Card */}
        <Card className="glass-card border-white/20 shadow-strong">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to continue your mentorship journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4">
              <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
              <button onClick={handleLogin}>Log In</button>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};