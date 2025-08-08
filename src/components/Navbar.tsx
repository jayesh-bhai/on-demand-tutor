import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div className="w-full fixed top-0 left-0 bg-white z-[1000] shadow-md">
      <nav className="flex justify-end items-center py-4 px-8 relative">
        <ul className="flex list-none gap-[80px]">
          <li>
            <Link
              to="/pricing"
              className="text-[#111] text-lg hover:text-[#6366F1] transition-colors duration-300"
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              to="/explore-tutors"
              className="text-[#111] text-lg hover:text-[#6366F1] transition-colors duration-300"
            >
              Explore Tutors
            </Link>
          </li>
          <li>
            <Link
              to="/how-it-works"
              className="text-[#111] text-lg hover:text-[#6366F1] transition-colors duration-300"
            >
              How it works
            </Link>
          </li>
          <li>
            <Link
              to="/subjects"
              className="text-[#111] text-lg hover:text-[#6366F1] transition-colors duration-300"
            >
              Subjects
            </Link>
          </li>
        </ul>

        {/* Sign Up Dropdown */}
        <div className="ml-20 relative">
          <button
            onClick={toggleDropdown}
            className="px-5 py-2 border-2 border-[#6366F1] text-[#6366F1] text-lg rounded-md font-semibold transition-all duration-300 hover:bg-[#6366F1] hover:text-white"
          >
            Sign Up ▼
          </button>

          <div
            className={`absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden transition-all duration-300 ${
              dropdownOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <Link
  to="/student-login"
  className="block px-4 py-2 text-[#111] hover:bg-[#f0f0f0] transition-colors"
>
  As Student
</Link>
            <Link
              to="/mentor-login"
              className="block px-4 py-2 text-[#111] hover:bg-[#f0f0f0] transition-colors"
            >
              As Mentor
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
