import React, { useState, useEffect, useRef } from "react";
import TutorSession from "./TutorSession";
import StudentsSessionsPage from "./StudentSession";

interface Student {
  id: number;
  name: string;
}

interface Session {
  student: string;
  subject: string;
  date: string;
  time: string;
}

interface Message {
  from: string;
  preview: string;
  time: string;
  unread: boolean;
  studentObj: Student;
}

interface ChatMessage {
  id: string;
  text: string;
  sender: "me" | "student";
  time?: string;
}

interface Chat {
  id: number;
  name: string;
  subject?: string;
  messages: ChatMessage[];
}

/* Stat card */
const StatCard = ({ title, value, description }: { title: string; value: any; description?: string }) => (
  <div className="bg-white rounded-xl shadow p-6">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-2xl font-semibold mt-1">{value}</p>
    {description && <p className="text-sm text-gray-400 mt-1">{description}</p>}
  </div>
);

/* Upcoming Sessions */
const UpcomingSessions = ({ sessions }: { sessions: Session[] }) => (
  <div className="bg-white rounded-xl shadow p-6">
    <h3 className="text-lg font-semibold mb-4">Upcoming Sessions</h3>
    {sessions.length ? (
      <ul className="space-y-4">
        {sessions.map((s, i) => (
          <li key={i} className="flex justify-between items-center">
            <div>
              <p className="font-medium">{s.student}</p>
              <p className="text-sm text-gray-500">{s.subject} • {s.date}</p>
            </div>
            <span className="text-sm text-gray-400">{s.time}</span>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500">No upcoming sessions.</p>
    )}
  </div>
);

/* Recent Messages */
const RecentMessages = ({ messages, onOpenChat }: { messages: Message[]; onOpenChat: (student: Student) => void }) => (
  <div className="bg-white rounded-xl shadow p-6">
    <div className="flex justify-between items-center mb-3">
      <h4 className="text-lg font-semibold">Messages</h4>
    </div>
    <div className="space-y-3 max-h-60 overflow-y-auto">
      {messages.map((m, idx) => (
        <div
          key={idx}
          className={`p-3 rounded-md cursor-pointer ${
            m.unread ? "bg-indigo-50" : "bg-gray-50"
          } hover:bg-indigo-100`}
          onClick={() => onOpenChat(m.studentObj)}
        >
          <div className="flex justify-between items-center">
            <p className="font-medium">{m.from}</p>
            <span className="text-xs text-gray-400">{m.time}</span>
          </div>
          <p className="text-sm text-gray-600 truncate">{m.preview}</p>
        </div>
      ))}
    </div>
  </div>
);

/* Chat Component */
const ChatArea = ({
  chat,
  onSendMessage,
}: {
  chat: Chat;
  onSendMessage: (text: string) => void;
}) => {
  const [text, setText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.messages]);

  const sendMessage = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSendMessage(trimmed);
    setText("");
  };

  return (
    <div className="flex flex-col flex-1 bg-white rounded-xl shadow overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">{chat.name}</h2>
        {chat.subject && <p className="text-sm text-gray-500">{chat.subject}</p>}
      </div>

      <div className="flex-1 p-6 overflow-y-auto space-y-3 bg-gray-50">
        {chat.messages.length === 0 && <p className="text-gray-500">No messages yet.</p>}
        {chat.messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs ${
                m.sender === "me"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-900 rounded-bl-none"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t flex gap-3">
        <input
          type="text"
          placeholder={`Message ${chat.name}...`}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

/* Placeholder Sessions Page */
const SessionsPage = () => (
  <TutorSession/>
);

/* Placeholder Students Page */
const StudentsPage = () => (
  <div className="bg-white rounded-xl shadow p-6">
    <h3 className="text-xl font-semibold mb-4">Students</h3>
    <p>Students list content coming soon.</p>
  </div>
);

export default function TutorDashboard() {
  const [activeMenu, setActiveMenu] = useState<"dashboard" | "messages" | "sessions" | "students">("dashboard");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  /* Mock data */
  const [stats] = useState([
    { title: "Active Students", value: 4, description: "Currently tutoring" },
    { title: "Sessions This Week", value: 8 },
    { title: "Earnings This Month", value: "$520" },
    { title: "Unread Messages", value: 2 },
  ]);

  const [sessions] = useState<Session[]>([
    { student: "Alice B.", subject: "English", date: "Aug 15", time: "3:00 PM" },
    { student: "Mark S.", subject: "Chemistry", date: "Aug 16", time: "5:00 PM" },
  ]);

  const [messages] = useState<Message[]>([
    {
      from: "Alice B.",
      preview: "Thanks for the homework tips!",
      time: "2h",
      unread: true,
      studentObj: { id: 1, name: "Alice B." },
    },
    {
      from: "Mark S.",
      preview: "Can we reschedule next week's session?",
      time: "1d",
      unread: false,
      studentObj: { id: 2, name: "Mark S." },
    },
  ]);

  // Chats state for full message history per student
  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      name: "Alice B.",
      subject: "English",
      messages: [
        { id: "m1", text: "Hey! Are you free tomorrow?", sender: "student" },
        { id: "m2", text: "Yes, looking forward to it.", sender: "me" },
      ],
    },
    {
      id: 2,
      name: "Mark S.",
      subject: "Chemistry",
      messages: [
        { id: "m1", text: "Can we reschedule next week?", sender: "student" },
      ],
    },
  ]);

  /* Handlers */
  const openChatWithStudent = (student: Student) => {
    setSelectedStudent(student);
    setActiveMenu("messages");

    // If chat doesn't exist yet, create empty chat
    if (!chats.find((c) => c.id === student.id)) {
      setChats((prev) => [...prev, { id: student.id, name: student.name, messages: [] }]);
    }
  };

  const sendMessageToChat = (text: string) => {
    if (!selectedStudent) return;
    setChats((prev) =>
      prev.map((c) =>
        c.id === selectedStudent.id
          ? {
              ...c,
              messages: [
                ...c.messages,
                { id: Date.now().toString(), text, sender: "me" },
              ],
            }
          : c
      )
    );
  };

  const activeChat = selectedStudent
    ? chats.find((c) => c.id === selectedStudent.id) ?? { id: -1, name: "Unknown", messages: [] }
    : null;

  /* Render main content */
  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              {stats.map((stat, idx) => (
                <StatCard key={idx} {...stat} />
              ))}
            </div>
            <UpcomingSessions sessions={sessions} />
            <RecentMessages messages={messages} onOpenChat={openChatWithStudent} />
          </>
        );

      case "messages":
        return activeChat ? (
          <ChatArea chat={activeChat} onSendMessage={sendMessageToChat} />
        ) : (
          <div className="p-6 text-gray-600">Select a student from messages to start chatting.</div>
        );

      case "sessions":
        return <SessionsPage />;

      case "students":
        return <StudentsSessionsPage />;

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow p-4 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Tutor Panel</h2>

        <nav className="space-y-2 flex-1">
          {["dashboard", "messages", "sessions", "students"].map((menu) => (
            <button
              key={menu}
              onClick={() => setActiveMenu(menu as any)}
              className={`block w-full text-left px-3 py-2 rounded-lg ${
                activeMenu === menu
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-gray-100"
              }`}
            >
              {menu.charAt(0).toUpperCase() + menu.slice(1)}
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          onClick={() => (window.location.href = "/")}
          className="flex items-center justify-center gap-2 px-4 py-2 mt-auto bg-white border rounded-lg text-gray-700 hover:bg-red-500 hover:text-white transition-all duration-300 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12"
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
      <main className="flex-1 p-6 space-y-6 h-screen overflow-auto">{renderContent()}</main>
    </div>
  );
}
