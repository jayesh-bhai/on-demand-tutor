import React, { useState, useMemo } from "react";

interface Session {
  id: number;
  student: string;
  subject: string;
  date: string;
  time: string;
  status: "Scheduled" | "Completed" | "Cancelled" | "Pending";
  notes?: string;
}

const statusColors: Record<Session["status"], string> = {
  Scheduled: "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
  Pending: "bg-yellow-100 text-yellow-700",
};

export default function SessionsPage() {
  const [sessions] = useState<Session[]>([
    {
      id: 1,
      student: "Alice B.",
      subject: "English",
      date: "2025-08-15",
      time: "3:00 PM",
      status: "Scheduled",
      notes: "Focus on essay structure.",
    },
    {
      id: 2,
      student: "Mark S.",
      subject: "Chemistry",
      date: "2025-08-16",
      time: "5:00 PM",
      status: "Completed",
      notes: "Reviewed periodic table concepts.",
    },
    {
      id: 3,
      student: "Sarah M.",
      subject: "Math",
      date: "2025-08-17",
      time: "1:00 PM",
      status: "Pending",
    },
    {
      id: 4,
      student: "John D.",
      subject: "Physics",
      date: "2025-08-18",
      time: "11:00 AM",
      status: "Cancelled",
      notes: "Student requested reschedule.",
    },
  ]);

  // For filtering sessions by status
  const [filterStatus, setFilterStatus] = useState<Session["status"] | "All">("All");

  // For modal display
  const [modalSession, setModalSession] = useState<Session | null>(null);

  // Filter sessions based on selected filter
  const filteredSessions = useMemo(() => {
    if (filterStatus === "All") return sessions;
    return sessions.filter((s) => s.status === filterStatus);
  }, [filterStatus, sessions]);

  // Close modal function - define once!
  const closeModal = () => setModalSession(null);

  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">My Sessions</h2>

      {/* Filters */}
      <div className="flex space-x-4 mb-6">
        {["All", "Scheduled", "Completed", "Cancelled", "Pending"].map((status) => (
          <button
            key={status}
            className={`px-4 py-2 rounded-full font-semibold border ${
              filterStatus === status
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200"
            }`}
            onClick={() => setFilterStatus(status as Session["status"] | "All")}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Sessions Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="p-3">Student</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Date</th>
              <th className="p-3">Time</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSessions.map((session) => (
              <tr
                key={session.id}
                className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                onClick={() => setModalSession(session)}
              >
                <td className="p-3">{session.student}</td>
                <td className="p-3">{session.subject}</td>
                <td className="p-3">{new Date(session.date).toLocaleDateString()}</td>
                <td className="p-3">{session.time}</td>
                <td className="p-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusColors[session.status]}`}
                  >
                    {session.status}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalSession(session);
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
            {filteredSessions.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">
                  No sessions found for this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Session Details Modal */}
      {modalSession && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              aria-label="Close modal"
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-2xl font-bold"
            >
              &times;
            </button>
            <h3 className="text-2xl font-semibold mb-4">Session Details</h3>
            <p><strong>Student:</strong> {modalSession.student}</p>
            <p><strong>Subject:</strong> {modalSession.subject}</p>
            <p><strong>Date:</strong> {new Date(modalSession.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {modalSession.time}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={`inline-block px-2 py-1 rounded-full text-sm font-semibold ${statusColors[modalSession.status]}`}>
                {modalSession.status}
              </span>
            </p>
            {modalSession.notes && (
              <p className="mt-4">
                <strong>Notes:</strong> {modalSession.notes}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}