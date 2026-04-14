import React, { useState } from "react";
import { User, FileText, Building2, FileCheck, BookOpen, Globe, GraduationCap, Handshake, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const topRowCards = [
  {
    icon: <Handshake size={18} />,
    title: "Associates",
    desc: "Connect with our trusted university partners and institutional associates worldwide.",
    tags: ["University Partners", "Global Tie-ups", "Exclusive Access"],
    link: "/associates",
  },
  {
    icon: <Users size={18} />,
    title: "Aspirants",
    desc: "A dedicated platform for study abroad aspirants to explore opportunities and connect.",
    tags: ["Community", "Mentorship", "Success Stories"],
    link: "/aspirants",
  },
];

const remainingServices = [
  {
    icon: <User size={18} />,
    title: "Career Counselling",
    desc: "Expert guidance to identify the right course and institution based on your interests, strengths, and career goals.",
    tags: ["One-on-one sessions", "Career Mapping", "Interest Assessment"],
    link: null,
  },
  {
    icon: <FileText size={18} />,
    title: "Profile Evaluation",
    desc: "Assessment of academic background and career objectives to match you with the best universities.",
    tags: ["Academic Analysis", "Gap Assessment", "Eligibility Check"],
    link: null,
  },
  {
    icon: <Building2 size={18} />,
    title: "University Shortlisting",
    desc: "Strategic selection based on eligibility, budget, and career aspirations.",
    tags: ["Data-Driven Selection", "Budget Optimization", "Ranking Analysis"],
    link: null,
  },
  {
    icon: <FileCheck size={18} />,
    title: "Application Processing",
    desc: "Complete assistance in filling and submitting applications to chosen universities.",
    tags: ["Form Filling", "Document Review", "Deadline Tracking"],
    link: null,
  },
  {
    icon: <BookOpen size={18} />,
    title: "SOP & LOR Assistance",
    desc: "Professional support in drafting compelling Statements of Purpose and Letters of Recommendation.",
    tags: ["Expert Writers", "Multiple Drafts", "University-specific"],
    link: null,
  },
  {
    icon: <Globe size={18} />,
    title: "Visa Assistance",
    desc: "End-to-end visa documentation and interview preparation for study abroad applicants.",
    tags: ["Document Prep", "Mock Interviews", "Filing Support"],
    link: null,
  },
  {
    icon: <GraduationCap size={18} />,
    title: "Scholarship & Loan Support",
    desc: "Guidance on available financial aid options including merit scholarships and education loans.",
    tags: ["Scholarship Search", "Application Help", "Loan Processing"],
    link: null,
  },
];

const hoverStylesTop = [
  "hover:bg-[#f3e8ff] hover:border-[#c084fc]",
  "hover:bg-[#ffe4e6] hover:border-[#fb7185]",
];

const hoverStylesRemaining = [
  "hover:bg-[#fff1f2] hover:border-[#f43f5e]",
  "hover:bg-[#eff6ff] hover:border-[#3b82f6]",
  "hover:bg-[#f0fdf4] hover:border-[#22c55e]",
  "hover:bg-[#fefce8] hover:border-[#eab308]",
  "hover:bg-[#faf5ff] hover:border-[#a855f7]",
  "hover:bg-[#ecfeff] hover:border-[#06b6d4]",
  "hover:bg-[#fff7ed] hover:border-[#f97316]",
];

// Top Row Card Component with hover "Learn More"
function TopCard({ item, index, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex items-start gap-4 p-5 rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer ${hoverStylesTop[index]}`}
    >
      <div className="w-10 h-10 flex items-center justify-center rounded-md bg-[#c5a46d] text-white">
        {item.icon}
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="font-bold text-xl text-gray-900 mb-1">
            {item.title}
          </h3>
          {/* Learn More - only visible on hover */}
          {isHovered && (
            <span className="text-sm text-[#c5a46d] font-medium flex items-center gap-1 transition-all duration-300">
              Learn More <span className="text-lg">→</span>
            </span>
          )}
        </div>
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
  );
}

export default function ServicesList() {
  const navigate = useNavigate();

  const handleCardClick = (link) => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <section className="bg-[#f5f5f5] py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* TOP ROW - Associates & Aspirants side by side with Learn More on hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {topRowCards.map((item, index) => (
            <TopCard
              key={index}
              item={item}
              index={index}
              onClick={() => handleCardClick(item.link)}
            />
          ))}
        </div>

        {/* REMAINING SERVICES - Vertical list (NO Learn More) */}
        <div className="space-y-4">
          {remainingServices.map((item, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(item.link)}
              className={`flex items-start gap-4 p-5 rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md ${
                item.link ? "cursor-pointer" : "cursor-default"
              } ${hoverStylesRemaining[index % hoverStylesRemaining.length]}`}
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-[#c5a46d] text-white">
                {item.icon}
              </div>

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
        </div>

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