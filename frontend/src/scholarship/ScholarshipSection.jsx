import React from "react";
import { useNavigate } from "react-router-dom";

const scholarships = [
  {
    title: "Merit-Based Scholarships",
    desc: "For students with outstanding academic records.",
    eligible: "All UG/PG students",
  },
  {
    title: "Country-Specific Scholarships",
    desc: "Government-funded scholarships for studying abroad.",
    eligible: "Study abroad applicants",
  },
  {
    title: "University Grants",
    desc: "Direct financial assistance from partner universities.",
    eligible: "Based on university criteria",
  },
  {
    title: "Eduorbix Merit Scholarship",
    desc: "Internal scholarship for deserving students.",
    eligible: "All Eduorbix applicants",
  },
];

export default function ScholarshipSection() {
  const navigate = useNavigate();
  return (
    <section className="bg-[#f5f5f5] py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {scholarships.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg md:text-xl font-semibold text-[#1f2a44] mb-2">
              {item.title}
            </h3>
            <p className="text-gray-500 mb-4">{item.desc}</p>

            <p className="text-sm">
              <span className="font-medium text-[#c5a46d]">Eligible:</span>{" "}
              <span className="text-[#c5a46d]">{item.eligible}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate('/application-form')}
          className="bg-[#c5a46d] text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition"
        >
          Check Eligibility
        </button>
      </div>
    </section>
  );
}
