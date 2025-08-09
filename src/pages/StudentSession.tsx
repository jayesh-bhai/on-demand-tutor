import React, { useState, useMemo } from "react";

interface Student {
  id: number;
  name: string;
  email: string;
}

interface Session {
  id: number;
  studentId: number;
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

const StatCard = ({
  title,
  value,
  description,
}: {
  title: string;
  value: any;
  description?: string;
}) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-2xl font-semibold mt-1">{value}</p>
    {description && <p className="text-sm text-gray-400 mt-1">{description}</p>}
  </div>
);

export default function StudentsSessionsPage() {
  // Students data
  const [students] = useState<Student[]>([
    { id: 1, name: "Alice Brown", email: "alice.brown@example.com" },
    { id: 2, name: "Mark Smith", email: "mark.smith@example.com" },
    { id: 3, name: "Sarah Miller", email: "sarah.miller@example.com" },
    { id: 4, name: "John Davis", email: "john.davis@example.com" },
    { id: 5, name: "Emily Johnson", email: "emily.johnson@example.com" },
  ]);

  // Sessions data with studentId reference
  const [sessions] = useState<Session[]>([
    {
      id: 101,
      studentId: 1,
      subject: "English",
      date: "2025-08-15",
      time: "3:00 PM",
      status: "Scheduled",
      notes: "Focus on essay structure.",
    },
    {
      id: 102,
      studentId: 2,
      subject: "Chemistry",
      date: "2025-08-16",
      time: "5:00 PM",
      status: "Completed",
      notes: "Reviewed periodic table concepts.",
    },
    {
      id: 103,
      studentId: 1,
      subject: "Math",
      date: "2025-08-17",
      time: "1:00 PM",
      status: "Pending",
    },
    {
      id: 104,
      studentId: 3,
      subject: "Physics",
      date: "2025-08-18",
      time: "11:00 AM",
      status: "Cancelled",
      notes: "Student requested reschedule.",
    },
    {
      id: 105,
      studentId: 4,
      subject: "Biology",
      date: "2025-08-19",
      time: "2:00 PM",
      status: "Scheduled",
    },
    {
      id: 106,
      studentId: 5,
      subject: "History",
      date: "2025-08-20",
      time: "4:00 PM",
      status: "Scheduled",
    },
  ]);

  // Filters
  const [selectedStudentId, setSelectedStudentId] = useState<number | "All">("All");
  const [filterStatus, setFilterStatus] = useState<Session["status"] | "All">("All");

  // Modal session for details
  const [modalSession, setModalSession] = useState<Session | null>(null);

  // Filtered sessions based on student & status
  const filteredSessions = useMemo(() => {
    return sessions.filter((s) => {
      const matchStudent = selectedStudentId === "All" || s.studentId === selectedStudentId;
      const matchStatus = filterStatus === "All" || s.status === filterStatus;
      return matchStudent && matchStatus;
    });
  }, [sessions, selectedStudentId, filterStatus]);

  // Compute stats
  const totalStudents = students.length;
  const totalSessions = sessions.length;
  const upcomingSessionsCount = sessions.filter((s) => s.status === "Scheduled").length;

  // Close modal handler
  const closeModal = () => setModalSession(null);

  // Find student by id
  const getStudentName = (id: number) => students.find((st) => st.id === id)?.name || "Unknown";

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Students & Sessions</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Students" value={totalStudents} />
        <StatCard title="Total Sessions" value={totalSessions} />
        <StatCard
          title="Upcoming Sessions"
          value={upcomingSessionsCount}
          description="Sessions scheduled in future"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <select
          className="border rounded-md p-2 w-full sm:w-60"
          value={selectedStudentId}
          onChange={(e) =>
            setSelectedStudentId(e.target.value === "All" ? "All" : Number(e.target.value))
          }
        >
          <option value="All">All Students</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>

        <select
          className="border rounded-md p-2 w-full sm:w-60"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as Session["status"] | "All")}
        >
          <option value="All">All Statuses</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {/* Sessions table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow p-4">
        <table className="w-full border-collapse text-left">
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
            {filteredSessions.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">
                  No sessions found for these filters.
                </td>
              </tr>
            )}
            {filteredSessions.map((session) => (
              <tr
                key={session.id}
                className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                onClick={() => setModalSession(session)}
              >
                <td className="p-3">{getStudentName(session.studentId)}</td>
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
          </tbody>
        </table>
      </div>

      {/* Session details modal */}
      {modalSession && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
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
            <p>
              <strong>Student:</strong> {getStudentName(modalSession.studentId)}
            </p>
            <p>
              <strong>Subject:</strong> {modalSession.subject}
            </p>
            <p>
              <strong>Date:</strong> {new Date(modalSession.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Time:</strong> {modalSession.time}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`inline-block px-2 py-1 rounded-full text-sm font-semibold ${statusColors[modalSession.status]}`}
              >
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
