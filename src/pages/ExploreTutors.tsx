// src/pages/ExploreTutors.tsx
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
  name: ["Ravi Teja Vallepu", "Gurdeep Singh Kakkar", "Ananya Sharma", "Rahul Verma", "Sana Iqbal", "Arjun Patel", "Meera Nair", "Karan Joshi"][i % 8],
  title: ["Qualified English tutor", "Masters in Math", "Physics Coach", "Chemistry Expert", "Biology Tutor", "Coding Mentor", "Economics Tutor", "SAT Coach"][i % 8],
  rating: +(4.5 + (i % 5) * 0.1).toFixed(1),
  reviews: 50 + i * 20,
  experienceYears: 2 + i,
  studentsTaught: 20 + i * 30,
  subjects: ["English Literature", "Mathematics", "Physics", "Chemistry", "Biology", "Programming", "Economics", "SAT Prep"].slice(i % 8, (i % 8) + 1),
  curriculum: ["CBSE", "ICSE", "IB", "State Board"][i % 4],
  bio: "Experienced tutor focused on student success. Friendly, patient, and result oriented. Specializes in clear explanations and practical examples.",
  avatarUrl: `https://i.pravatar.cc/150?img=${10 + i}`,
  price: `₹${300 + i * 100}/hr`
}));

function TutorCard({ tutor }: { tutor: Tutor }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex gap-6 items-start">
      <img src={tutor.avatarUrl} alt={tutor.name} className="w-20 h-20 rounded-lg object-cover"/>
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
              <div className="text-sm text-gray-500">({tutor.reviews} reviews)</div>
            </div>
            <div className="mt-2 text-sm text-gray-700 font-medium">{tutor.price}</div>
          </div>
        </div>

        <p className="mt-3 text-sm text-gray-600" style={{
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>{tutor.bio}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {tutor.subjects.map((s) => (
            <span 
              key={s} 
              className="text-sm px-3 py-1 bg-purple-50 text-purple-700 rounded-full"
            >
              {s}
            </span>
          ))}
          <span className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-full">{tutor.curriculum}</span>
        </div>

        <div className="mt-4 flex gap-3">
          <button className="px-4 py-2 rounded-full border border-purple-300 text-purple-600 hover:bg-purple-50">
            View profile
          </button>
          <button className="px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700">
            Book a free trial
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ExploreTutors() {
  const [visibleCount, setVisibleCount] = useState(4);
  const tutors = DUMMY_TUTORS;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold">Find the Best Tutors for You</h1>
          <p className="mt-3 text-base md:text-lg max-w-2xl">
            Browse expert tutors across subjects, view verified profiles and book a free trial session in one click.
          </p>
          <div className="mt-6 flex gap-4">
            <button className="bg-orange-400 text-white px-5 py-2 rounded-full shadow">
              Book a free trial class
            </button>
            <button className="border border-white px-5 py-2 rounded-full">
              Learn more
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">1,000+ expert teachers near you</h2>
          <p className="text-sm text-gray-600 mt-1">
            Popular subjects: CBSE · Maths · Science · Physics · Chemistry · Biology
          </p>
        </div>

        <div className="grid gap-6">
          {tutors.slice(0, visibleCount).map((t) => (
            <TutorCard key={t.id} tutor={t} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          {visibleCount < tutors.length ? (
            <button
              onClick={() => setVisibleCount((c) => Math.min(c + 4, tutors.length))}
              className="px-6 py-2 bg-white border rounded-full shadow hover:bg-gray-50"
            >
              Load more tutors
            </button>
          ) : (
            <div className="text-gray-500">No more tutors to show</div>
          )}
        </div>
      </div>
    </div>
  );
}
