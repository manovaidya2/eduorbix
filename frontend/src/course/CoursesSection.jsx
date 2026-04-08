import React from "react";
import { Link } from "react-router-dom";
import { FaCog, FaBriefcase, FaStethoscope, FaBalanceScale, FaCalculator, FaFlask, FaPalette, FaLaptopCode, FaDraftingCompass, FaUtensils, FaPlane, FaGraduationCap } from "react-icons/fa";

const courses = [
  {
    title: "Engineering",
    tag: "UG/PG",
    items: ["B.Tech", "M.Tech", "BE"],
    icon: <FaCog />,
  },
  {
    title: "Management",
    tag: "UG/PG",
    items: ["MBA", "BBA", "PGDM"],
    icon: <FaBriefcase />,
  },
  {
    title: "Medical",
    tag: "UG",
    items: ["MBBS", "BDS", "BAMS"],
    icon: <FaStethoscope />,
  },
  {
    title: "Law",
    tag: "UG/PG",
    items: ["LLB", "LLM", "BA LLB"],
    icon: <FaBalanceScale />,
  },
  {
    title: "Commerce",
    tag: "UG/PG",
    items: ["B.Com", "M.Com", "CA"],
    icon: <FaCalculator />,
  },
  {
    title: "Science",
    tag: "UG/PG",
    items: ["B.Sc", "M.Sc", "BS"],
    icon: <FaFlask />,
  },
  {
    title: "Arts",
    tag: "UG/PG",
    items: ["BA", "MA", "BFA"],
    icon: <FaPalette />,
  },
  {
    title: "IT & Computer Science",
    tag: "UG/PG",
    items: ["BCA", "MCA", "B.Sc IT"],
    icon: <FaLaptopCode />,
  },
  {
    title: "Design",
    tag: "UG/PG",
    items: ["B.Des", "M.Des"],
    icon: <FaDraftingCompass />,
  },
  {
    title: "Hospitality",
    tag: "UG/PG",
    items: ["BHM", "MHM"],
    icon: <FaUtensils />,
  },
  {
    title: "Aviation",
    tag: "UG",
    items: ["B.Sc Aviation", "Pilot Training"],
    icon: <FaPlane />,
  },
  {
    title: "PhD Programs",
    tag: "Doctoral",
    items: ["PhD in all disciplines"],
    icon: <FaGraduationCap />,
  },
];

export default function CoursesSection() {
  return (
    <div className="bg-[#f7f7f7] min-h-screen p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl p-6 relative shadow-sm transition duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#d4a62a] group"
          >
            {/* Tag */}
            <span className="absolute top-4 right-4 text-xs bg-[#f3e7c9] text-[#b8902e] px-3 py-1 rounded-full font-medium">
              {course.tag}
            </span>

            {/* Icon */}
            <div className="w-12 h-12 flex items-center justify-center bg-[#f8f3e6] rounded-xl text-xl mb-4 text-[#b8902e] group-hover:bg-[#d4a62a] group-hover:text-white transition">
              {course.icon}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold mb-3 text-gray-800 group-hover:text-[#b8902e] transition">
              {course.title}
            </h3>

            {/* Pills */}
            <div className="flex flex-wrap gap-2">
              {course.items.map((item, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full group-hover:bg-[#f3e7c9] group-hover:text-[#b8902e] transition"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="flex justify-center mt-10">
      <Link to="/application-form">
        <button className="bg-[#d4a62a] hover:bg-[#c7981f] text-white px-6 py-3 rounded-lg font-medium shadow transition">
          Find Your Ideal Course →
        </button>
        </Link>
      </div>
    </div>
  );
}
