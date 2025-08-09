// // src/pages/StudentDashboard.tsx
// import { signOut } from 'firebase/auth';
// import { auth } from '../firebaseconfigurations/init';
// import { useNavigate } from 'react-router-dom';

// export default function StudentDashboard() {
//   const navigate = useNavigate();
//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold">Student Dashboard</h1>
//       <p>Welcome, student! Build out student features here.</p>
//       <button onClick={() => { signOut(auth); navigate('/'); }}>Logout</button>
//     </div>
//   );
// }

import React, { useState, type JSX } from "react";
import Tutors from "./Tutors";
import Messages from "./Messages";
import MySession from "./MySession";

interface Tutor {
  id: number;
  name: string;
}

interface Session {
  tutor: string;
  subject: string;
  date: string;
  time: string;
}

interface Message {
  from: string;
  preview: string;
  time: string;
  unread: boolean;
  tutorObj: Tutor;
}

const StatCard = ({ title, value, description }: { title: string; value: number; description?: string }) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-2xl font-semibold mt-1">{value}</p>
    {description && <p className="text-sm text-gray-400 mt-1">{description}</p>}
  </div>
);

const UpcomingSessions = ({ sessions }: { sessions: Session[] }) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <h3 className="text-lg font-semibold mb-4">Upcoming Sessions</h3>
    {sessions.length > 0 ? (
      <ul className="space-y-4">
        {sessions.map((s: Session, i: number) => (
          <li key={i} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{s.tutor}</p>
              <p className="text-sm text-gray-500">{s.subject} • {s.date}</p>
            </div>
            <span className="text-sm text-gray-400">{s.time}</span>
          </li>
        ))}
      </ul>
    ) : <p className="text-gray-500">No upcoming sessions.</p>}
  </div>
);

const RecentMessages = ({
  messages,
  onOpenChat,
}: {
  messages: Message[];
  onOpenChat: (tutor: Tutor) => void;
}) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <div className="flex items-center justify-between mb-3">
      <h4 className="text-lg font-semibold">Messages</h4>
    </div>
    <div className="space-y-3">
      {messages.map((m: Message, idx: number) => (
        <div key={idx} className={`p-2 rounded-md ${m.unread ? "bg-indigo-50" : "bg-gray-50"}`}>
          <div className="flex items-center justify-between">
            <div
              className="text-sm font-medium cursor-pointer"
              onClick={() => onOpenChat(m.tutorObj)}
            >
              {m.from}
            </div>
            <div className="text-xs text-gray-400">{m.time}</div>
          </div>
          <div className="text-sm text-gray-600">{m.preview}</div>
        </div>
      ))}
    </div>
  </div>
);

export default function StudentDashboard(): JSX.Element {
  const [activeMenu, setActiveMenu] = useState<string>("dashboard");
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);

  const [stats] = useState([
    { title: "Active Sessions", value: 2, description: "Ongoing tutoring" },
    { title: "Completed Sessions", value: 12, description: "Last 30 days" },
    { title: "Saved Tutors", value: 5, description: "Favorited" },
    { title: "Unread Messages", value: 3 },
  ]);

  const [sessions] = useState<Session[]>([
    { tutor: "Sarah M.", subject: "Math", date: "Aug 15, 3 PM", time: "3:00 PM" },
    { tutor: "John D.", subject: "Physics", date: "Aug 16, 1 PM", time: "1:00 PM" },
  ]);

  const [messages] = useState<Message[]>([
    { 
      from: "Sarah M.", 
      preview: "Looking forward to our next session!", 
      time: "2h", 
      unread: true, 
      tutorObj: { id: 1, name: "Sarah M." } 
    },
    { 
      from: "John D.", 
      preview: "Don't forget to review chapter 5.", 
      time: "1d", 
      unread: false, 
      tutorObj: { id: 2, name: "John D." } 
    },
  ]);

  const handleStartChat = (tutor: Tutor) => {
    setSelectedTutor(tutor);
    setActiveMenu("messages");
  };

  const handleOpenChatFromPreview = (tutor: Tutor) => {
    setSelectedTutor(tutor);
    setActiveMenu("messages");
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {stats.map((st, i) => <StatCard key={i} {...st} />)}
            </div>

            <div className="space-y-6">
              <UpcomingSessions sessions={sessions} />
              <RecentMessages messages={messages} onOpenChat={handleOpenChatFromPreview} />
            </div>
          </>
        );

      case "messages":
        return (
          <div className="h-full">
            <Messages initialTutor={selectedTutor} />
          </div>
        );

      case "sessions":
        return <MySession />;

      case "tutors":
        return (
          <div className="h-full">
            <Tutors onStartChat={handleStartChat} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col justify-between w-64 bg-white shadow-sm p-4 h-screen">
        {/* Top Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Student Panel</h2>
          <nav className="space-y-2">
            {["dashboard", "messages", "sessions", "tutors"].map((menu) => (
              <button
                key={menu}
                onClick={() => setActiveMenu(menu)}
                className={`block w-full text-left px-3 py-2 rounded-lg ${
                  activeMenu === menu ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
                }`}
              >
                {menu.charAt(0).toUpperCase() + menu.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => (window.location.href = "/")}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-white border rounded-lg text-gray-700 hover:bg-red-500 hover:text-white transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V4a1 1 0 011-1h6a1 1 0 011 1v3"
            />
          </svg>
          Log Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6 h-screen overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}