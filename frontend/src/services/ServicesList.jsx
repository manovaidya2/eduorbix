import React from "react";
import { User, FileText, Building2, FileCheck, BookOpen, Globe, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: <User size={18} />,
    title: "Career Counselling",
    desc: "Expert guidance to identify the right course and institution based on your interests, strengths, and career goals.",
    tags: ["One-on-one sessions", "Career Mapping", "Interest Assessment"],
  },
  {
    icon: <FileText size={18} />,
    title: "Profile Evaluation",
    desc: "Assessment of academic background and career objectives to match you with the best universities.",
    tags: ["Academic Analysis", "Gap Assessment", "Eligibility Check"],
  },
  {
    icon: <Building2 size={18} />,
    title: "University Shortlisting",
    desc: "Strategic selection based on eligibility, budget, and career aspirations.",
    tags: ["Data-Driven Selection", "Budget Optimization", "Ranking Analysis"],
  },
  {
    icon: <FileCheck size={18} />,
    title: "Application Processing",
    desc: "Complete assistance in filling and submitting applications to chosen universities.",
    tags: ["Form Filling", "Document Review", "Deadline Tracking"],
  },
  {
    icon: <BookOpen size={18} />,
    title: "SOP & LOR Assistance",
    desc: "Professional support in drafting compelling Statements of Purpose and Letters of Recommendation.",
    tags: ["Expert Writers", "Multiple Drafts", "University-specific"],
  },
  {
    icon: <Globe size={18} />,
    title: "Visa Assistance",
    desc: "End-to-end visa documentation and interview preparation for study abroad applicants.",
    tags: ["Document Prep", "Mock Interviews", "Filing Support"],
  },
  {
    icon: <GraduationCap size={18} />,
    title: "Scholarship & Loan Support",
    desc: "Guidance on available financial aid options including merit scholarships and education loans.",
    tags: ["Scholarship Search", "Application Help", "Loan Processing"],
  },
];

// Different hover colors
const hoverStyles = [
  "hover:bg-[#fff1f2] hover:border-[#f43f5e]",
  "hover:bg-[#eff6ff] hover:border-[#3b82f6]",
  "hover:bg-[#f0fdf4] hover:border-[#22c55e]",
  "hover:bg-[#fefce8] hover:border-[#eab308]",
  "hover:bg-[#faf5ff] hover:border-[#a855f7]",
  "hover:bg-[#ecfeff] hover:border-[#06b6d4]",
  "hover:bg-[#fff7ed] hover:border-[#f97316]",
];

export default function ServicesList() {
  return (
    <section className="bg-[#f5f5f5] py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-4">
        {services.map((item, index) => (
          <div
            key={index}
            className={`flex items-start gap-4 p-5 rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md ${hoverStyles[index % hoverStyles.length]}`}
          >
            {/* Icon */}
            <div className="w-10 h-10 flex items-center justify-center rounded-md bg-[#c5a46d] text-white">
              {item.icon}
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="font-bold text-xl text-gray-900 mb-1">
                {item.title}
              </h3>
              <p className="text-medium text-gray-500 mb-3">{item.desc}</p>

              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-[#fbf3e6] text-[#c5a46d] px-2 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Button */}
        <div className="flex justify-center pt-6">
          <Link to="/application-form">
          <button className="bg-[#c5a46d] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition">
            Book Free Counselling →
          </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
