import { useState } from "react";

interface Student {
  id: number;
  name: string;
}

interface TutorMessagesProps {
  student: Student | null;
}

export default function TutorMessages({ student }: TutorMessagesProps) {
  const [messages, setMessages] = useState([
    { from: "Student", text: "Hello! Can you help me with my homework?", time: "10:30 AM" },
    { from: "You", text: "Sure, send me the details.", time: "10:32 AM" },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { from: "You", text: input, time: new Date().toLocaleTimeString() }]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">
          Chat with {student ? student.name : "Student"}
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, idx) => (
          <div key={idx} className={m.from === "You" ? "text-right" : "text-left"}>
            <div
              className={`inline-block px-4 py-2 rounded-lg ${
                m.from === "You" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {m.text}
            </div>
            <div className="text-xs text-gray-400">{m.time}</div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded-lg px-4 py-2"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}