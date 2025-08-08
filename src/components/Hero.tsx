// src/components/Hero.tsx

import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-black via-zinc-900 to-black text-white pt-40 pb-28 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:items-end md:text-right">
<h1 className="text-2xl md:text-4xl font-extrabold leading-snug tracking-tight mb-6 drop-shadow-md">

          Learn Anything, Anytime. <br />
          <span className="text-indigo-400">Connect with expert tutors instantly.</span>
        </h1>

        <p className="text-base md:text-lg leading-relaxed max-w-xl mb-12 text-gray-300">
          Whether you’re here to learn or to teach, our platform connects mentors and students in seconds.
          Experience seamless, interactive video sessions — anywhere, anytime.
          <br />
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
<Link
  to="/mentor-login" 
  className="w-full sm:w-auto px-6 py-3 bg-indigo-500 text-white text-sm md:text-base font-semibold rounded-full hover:bg-indigo-600 transition duration-300 shadow-lg hover:shadow-xl"
>
  Become a Tutor
</Link>
          <Link
            to="/student-login"
            className="w-full sm:w-auto px-6 py-3 bg-white text-black text-sm md:text-base font-semibold rounded-full hover:bg-gray-200 transition duration-300 shadow-lg hover:shadow-xl"
          >
            Find a Tutor
          </Link>
        </div>
      </div>
    </section>
  );
}
