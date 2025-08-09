import type { JSX } from 'react/jsx-dev-runtime';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HeroSection2 from './components/HeroSection2';
import Pricing from './components/Pricing';
import ExploreTutors from './pages/ExploreTutors'; // <-- new page
import StudentLogin from './pages/StudentLogin'; // <-- new page
import MentorLogin from './pages/MentorLogin'; // <-- new page
import './App.css';
import StudentDashboard from './pages/StudentDashboard';
import TutorDashboard from './pages/TutorsDashboard';

// Homepage layout
function HomePage() {
  return (
    <div className="relative w-full h-screen overflow-x-hidden">
      <Navbar />
      <br /><br /><br /><br /><br /><br />
      <Hero />
      <br /><br /><br />
      <HeroSection2 />
      <Pricing />
    </div>
  );
}

function App(): JSX.Element {
  return (
    <main className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore-tutors" element={<ExploreTutors />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/student-login" element={<Hero />} />
          <Route path="/mentor-login" element={<MentorLogin />} />
          <Route path="/mentor-login" element={<Navbar/>} />
          <Route path="/student-dashboard" element={<StudentDashboard/>} />
          <Route path="/mentor-login" element={<MentorLogin />} />
        <Route path="/tutor-messages" element={<TutorDashboard />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;