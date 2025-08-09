import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { auth, db } from "../firebaseconfigurations/init";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "mentor">("student");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email,
        role,
      });

      if (role === "mentor") {
        navigate("/mentor-dashboard");
      } else {
        navigate("/student-dashboard");
      }
    } catch (err) {
      console.error(err);
      alert("Signup failed");
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

        {/* Signup Card */}
        <Card className="glass-card border-white/20 shadow-strong">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
            <CardDescription>
              Join thousands of students accelerating their growth
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4">
              <input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <select
                value={role}
                onChange={(e) =>
                  setRole(e.target.value as "student" | "mentor")
                }
              >
                <option value="student">Student</option>
                <option value="mentor">Mentor</option>
              </select>
              <button onClick={handleSignup}>Sign Up</button>
            </div>
            {/* Sign In Link */}
            <div className="text-center">
              <span className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Sign in
                </Link>
              </span>
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
}
