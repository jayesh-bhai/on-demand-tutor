import React, { useEffect, useRef, useState } from "react";

/* Types for clarity */
type Message = { id: string; text: string; sender: "me" | "tutor"; time?: string };
type Chat = { id: number; name: string; subject?: string; messages: Message[] };

interface Props {
  initialTutor?: { id: number; name: string } | null;
}

/**
 * Messaging - two-pane chat:
 * - left: list of tutors (conversations)
 * - right: active conversation with messages + input
 *
 * initialTutor (optional) will open that tutor's conversation immediately.
 */
export default function Messaging({ initialTutor = null }: Props) {
  // initial conversations - keep IDs in sync with your DUMMY_TUTORS list
  const [conversations, setConversations] = useState<Chat[]>([
    {
      id: 1,
      name: "Ravi Teja Vallepu",
      subject: "Mathematics",
      messages: [
        { id: "m1", text: "Hey! Are we still on for tomorrow's session?", sender: "me" },
        { id: "m2", text: "Yes — I'll bring worksheets.", sender: "tutor" },
        { id: "m3", text: "Perfect. See you then.", sender: "me" },
        { id: "m4", text: "Also please review the last test.", sender: "tutor" },
        { id: "m5", text: "On it — thanks!", sender: "me" },
      ],
    },
    {
      id: 2,
      name: "Gurdeep Singh Kakkar",
      subject: "Physics",
      messages: [
        { id: "m1", text: "Can we move session to Friday?", sender: "me" },
        { id: "m2", text: "Friday works.", sender: "tutor" },
      ],
    },
    {
      id: 3,
      name: "Ananya Sharma",
      subject: "English",
      messages: [
        { id: "m1", text: "Sent you the essay draft.", sender: "me" },
        { id: "m2", text: "I'll check and return notes.", sender: "tutor" },
      ],
    },
    // add other tutors if you want...
  ]);

  // active conversation id
  const [activeId, setActiveId] = useState<number>(() => {
    return initialTutor?.id ?? 1;
  });

  // new message input
  const [text, setText] = useState<string>("");

  // auto-scroll ref
  const messagesRef = useRef<HTMLDivElement | null>(null);

  // If initialTutor changes while mounted (e.g. user clicked Chat from Tutors), update activeId
  useEffect(() => {
    if (initialTutor?.id) setActiveId(initialTutor.id);
  }, [initialTutor]);

  // auto-scroll to bottom whenever the active conversation's messages change
  useEffect(() => {
    const node = messagesRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [conversations, activeId]);

  const activeConversation = conversations.find((c) => c.id === activeId) ?? conversations[0];

  const sendMessage = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? {
              ...c,
              messages: [
                ...c.messages,
                { id: `${Date.now()}`, text: trimmed, sender: "me" as const },
              ],
            }
          : c
      )
    );
    setText("");
  };

  return (
    <div className="flex h-full bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Tutors list */}
      <div className="w-80 border-r border-gray-200 bg-gray-50 flex flex-col">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Chats ({conversations.length})</h3>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((c) => {
            const last = c.messages[c.messages.length - 1];
            return (
              <button
                key={c.id}
                onClick={() => setActiveId(c.id)}
                className={`w-full text-left p-4 border-b hover:bg-gray-100 flex items-start gap-3 ${activeId === c.id ? "bg-gray-200" : ""}`}
              >
                <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center font-bold text-indigo-700">
                  {c.name.split(" ").map((n) => n[0]).slice(0,2).join("")}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{c.name}</div>
                    <div className="text-xs text-gray-400">{last ? "" : ""}</div>
                  </div>
                  <div className="text-sm text-gray-500 truncate">{last?.text ?? "No messages yet"}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex flex-col flex-1">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">{activeConversation.name}</h2>
          {activeConversation.subject && <div className="text-sm text-gray-500">{activeConversation.subject}</div>}
        </div>

        {/* Messages list */}
        <div className="flex-1 overflow-y-auto p-6" ref={messagesRef}>
          {activeConversation.messages.map((m) => (
            <div key={m.id} className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"} mb-3`}>
              <div className={`px-4 py-2 rounded-lg max-w-xs ${m.sender === "me" ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-100 text-gray-800 rounded-bl-none"}`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t flex items-center gap-3">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Message ${activeConversation.name}...`}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
          />
          <button onClick={sendMessage} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Send</button>
        </div>
      </div>
    </div>
  );
}
