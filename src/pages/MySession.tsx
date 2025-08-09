
type SessionCardProps = {
  tutor: string;
  subject: string;
  date: string;
  time: string;
  status: "upcoming" | "past";
};

const SessionCard = ({ tutor, subject, date, time, status }: SessionCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between">
      <div>
        <p className="font-medium text-lg">{tutor}</p>
        <p className="text-sm text-gray-500">{subject}</p>
        <p className="text-sm text-gray-400">
          {date} • {time}
        </p>
      </div>
      <div className="flex space-x-2">
        {status === "upcoming" && (
          <>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Join
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              Reschedule
            </button>
          </>
        )}
        {status === "past" && (
          <button className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200">
            Leave Review
          </button>
        )}
      </div>
    </div>
  );
};

export default function MySession() {
  const upcomingSessions: SessionCardProps[] = [
    { tutor: "Sarah M.", subject: "Math - Algebra", date: "Aug 10", time: "3:00 PM", status: "upcoming" },
    { tutor: "John D.", subject: "Physics - Mechanics", date: "Aug 12", time: "5:00 PM", status: "upcoming" },
  ];

  const pastSessions: SessionCardProps[] = [
    { tutor: "Alice M.", subject: "English - Literature", date: "Aug 5", time: "4:00 PM", status: "past" },
    { tutor: "David K.", subject: "Chemistry - Organic", date: "Aug 3", time: "2:00 PM", status: "past" },
  ];

  return (
    <div className="space-y-6">
      {/* Upcoming Sessions */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Upcoming Sessions</h2>
        <div className="space-y-4">
          {upcomingSessions.map((session, index) => (
            <SessionCard key={index} {...session} />
          ))}
        </div>
      </div>

      {/* Past Sessions */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Past Sessions</h2>
        <div className="space-y-4">
          {pastSessions.map((session, index) => (
            <SessionCard key={index} {...session} />
          ))}
        </div>
      </div>
    </div>
  );
}
