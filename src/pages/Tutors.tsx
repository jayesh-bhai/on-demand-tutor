// src/pages/Tutors.tsx
import React, { useState } from "react";

interface Tutor {
  id: number;
  name: string;
  title: string;
  rating: number;
  reviews: number;
  experienceYears: number;
  studentsTaught: number;
  subjects: string[];
  curriculum?: string;
  bio: string;
  avatarUrl: string;
  price?: string;
}

const DUMMY_TUTORS: Tutor[] = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  name: [
    "Ravi Teja Vallepu",
    "Gurdeep Singh Kakkar",
    "Ananya Sharma",
    "Rahul Verma",
    "Sana Iqbal",
    "Arjun Patel",
    "Meera Nair",
    "Karan Joshi",
  ][i % 8],
  title: [
    "Qualified English tutor",
    "Masters in Math",
    "Physics Coach",
    "Chemistry Expert",
    "Biology Tutor",
    "Coding Mentor",
    "Economics Tutor",
    "SAT Coach",
  ][i % 8],
  rating: +(4.5 + (i % 5) * 0.1).toFixed(1),
  reviews: 50 + i * 20,
  experienceYears: 2 + i,
  studentsTaught: 20 + i * 30,
  subjects: [
    "English Literature",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Programming",
    "Economics",
    "SAT Prep",
  ].slice(i % 8, (i % 8) + 1),
  curriculum: ["CBSE", "ICSE", "IB", "State Board"][i % 4],
  bio: "Experienced tutor focused on student success. Friendly, patient, and result oriented. Specializes in clear explanations and practical examples.",
  avatarUrl: `https://i.pravatar.cc/150?img=${10 + i}`,
  price: `₹${300 + i * 100}/hr`,
}));

function TutorCard({
  tutor,
  onChatClick,
}: {
  tutor: Tutor;
  onChatClick: (tutor: Tutor) => void;
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex gap-5 items-start">
      <img
        src={tutor.avatarUrl}
        alt={tutor.name}
        className="w-20 h-20 rounded-lg object-cover"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {tutor.name}
              <span className="text-sm text-green-600 ml-2">Verified</span>
            </h3>
            <p className="text-sm text-gray-600">{tutor.title}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <div className="text-yellow-500 font-bold">{tutor.rating} ★</div>
              <div className="text-sm text-gray-500">
                ({tutor.reviews} reviews)
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-700 font-medium">
              {tutor.price}
            </div>
          </div>
        </div>

        <p
          className="mt-3 text-sm text-gray-600"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {tutor.bio}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {tutor.subjects.map((s) => (
            <span
              key={s}
              className="text-sm px-3 py-1 bg-purple-50 text-purple-700 rounded-full"
            >
              {s}
            </span>
          ))}
          <span className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
            {tutor.curriculum}
          </span>
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={() => onChatClick(tutor)}
            className="px-4 py-2 rounded-full border border-purple-300 text-purple-600 hover:bg-purple-50"
          >
            Chat
          </button>
          <button className="px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700">
            Book a free trial
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Tutors({
  onStartChat,
}: {
  onStartChat: (tutor: Tutor) => void;
}) {
  const [visibleCount, setVisibleCount] = useState(6);
  const tutors = DUMMY_TUTORS;

  return (
    <div className="h-full flex flex-col">
      {/* Header + Filters */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Explore Tutors</h2>
        <input
          type="text"
          placeholder="Search tutors..."
          className="px-4 py-2 border rounded-full text-sm w-64 focus:outline-none focus:ring focus:ring-purple-200"
        />
      </div>

      {/* Scrollable tutor list */}
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="grid gap-5">
          {tutors.slice(0, visibleCount).map((t) => (
            <TutorCard key={t.id} tutor={t} onChatClick={onStartChat} />
          ))}
        </div>

        {visibleCount < tutors.length && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() =>
                setVisibleCount((c) => Math.min(c + 3, tutors.length))
              }
              className="px-6 py-2 bg-white border rounded-full shadow hover:bg-gray-50"
            >
              Load more tutors
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
