import React from "react";
import {
  User,
  FileText,
  Building2,
  BookOpen,
  Globe,
  GraduationCap,
  CreditCard
} from "lucide-react";

const services = [
  {
    icon: <User size={26} />,
    title: "Career Counselling",
    desc: "Expert guidance to identify the right course and institution based on your goals.",
    hover: "hover:bg-blue-50",
  },
  {
    icon: <FileText size={26} />,
    title: "Profile Evaluation",
    desc: "Assessment of academic background and career objectives to find your match.",
    hover: "hover:bg-green-50",
  },
  {
    icon: <Building2 size={26} />,
    title: "University Shortlisting",
    desc: "Strategic selection based on eligibility, budget, and aspirations.",
    hover: "hover:bg-purple-50",
  },
  {
    icon: <BookOpen size={26} />,
    title: "SOP & LOR Assistance",
    desc: "Professional support in drafting compelling application documents.",
    hover: "hover:bg-pink-50",
  },
  {
    icon: <Globe size={26} />,
    title: "Visa Support",
    desc: "End-to-end visa documentation and interview preparation.",
    hover: "hover:bg-cyan-50",
  },
  {
    icon: <GraduationCap size={26} />,
    title: "Scholarship Guidance",
    desc: "Guidance on available merit-based and need-based financial aid.",
    hover: "hover:bg-indigo-50",
  },
  {
    icon: <CreditCard size={26} />,
    title: "Education Loan",
    desc: "Assistance with education loan processing and approvals.",
    highlight: true,
  },
];

export default function Services() {
  return (
    <section className="bg-[#f5f7fb] py-16 md:py-20 px-4 md:px-10">

      {/* Heading */}
      <div className="text-center mb-12 md:mb-14">
        <p className="text-[#c5a46d] text-xs md:text-sm tracking-widest font-semibold mb-2">
          WHAT WE OFFER
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0b2a4a]">
          Our Core <span className="text-[#c5a46d]">Services</span>
        </h2>

        <p className="text-gray-500 mt-3 md:mt-4 max-w-2xl mx-auto text-sm md:text-base px-2">
          Comprehensive admission support to make your education journey
          smooth and successful.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6 max-w-7xl mx-auto">

        {services.map((item, i) => (
          <div
            key={i}
            className={`group p-5 md:p-6 rounded-2xl border transition-all duration-300 transform hover:-translate-y-1
              ${item.highlight
                ? "border-yellow-300 hover:bg-yellow-50"
                : `bg-white border-gray-200 ${item.hover} hover:shadow-lg`
              }
            `}
          >

            {/* Icon */}
            <div
              className={`w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-xl mb-4 transition-all duration-300
              ${
                item.highlight
                  ? "bg-[#fbf3e6] text-[#c5a46d]"
                  : "bg-[#fbf3e6] text-[#c5a46d] group-hover:bg-yellow-200 group-hover:scale-110"
              }
            `}
            >
              {item.icon}
            </div>

            {/* Title */}
            <h3 className="text-base md:text-lg font-semibold text-[#0b2a4a] mb-2">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-gray-500 text-sm leading-relaxed">
              {item.desc}
            </p>

            {/* Learn More (Now on ALL cards) */}
            <p className="text-[#c5a46d] text-sm mt-4 font-medium cursor-pointer flex items-center gap-1 group-hover:gap-2 transition-all">
              Learn More →
            </p>

          </div>
        ))}

      </div>
    </section>
  );
}