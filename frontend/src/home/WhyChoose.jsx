import React from "react";
import { FaUserFriends, FaShieldAlt, FaEye, FaHeart, FaMedal, FaChartLine } from "react-icons/fa";

export default function WhyChoose() {
  const data = [
    {
      id: "01",
      icon: <FaUserFriends />,
      title: "Expert Counsellors",
      desc: "Experienced professionals who understand your goals and guide you every step.",
    },
    {
      id: "02",
      icon: <FaShieldAlt />,
      title: "Strong University Network",
      desc: "Partnerships with 500+ universities worldwide for maximum options.",
    },
    {
      id: "03",
      icon: <FaEye />,
      title: "Transparent Fee Structure",
      desc: "No hidden charges — complete clarity on costs at every stage.",
    },
    {
      id: "04",
      icon: <FaHeart />,
      title: "Personalized Guidance",
      desc: "Tailored advice crafted for every student's unique needs and aspirations.",
    },
    {
      id: "05",
      icon: <FaMedal />,
      title: "End-to-End Support",
      desc: "From course selection to visa approval, we handle it all.",
    },
    {
      id: "06",
      icon: <FaChartLine />,
      title: "High Success Rate",
      desc: "98% admission success rate across all programs globally.",
    },
  ];

  return (
    <section className="bg-[#f8f7f3] py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-[#c5a46d] tracking-widest text-sm font-semibold uppercase mb-2">
          Why Us
        </p>

        <h2 className="text-3xl md:text-4xl font-bold text-[#1e2a38] mb-3">
          Why Choose <span className="text-[#c5a46d]">Eduorbix?</span>
        </h2>

        <p className="text-gray-500 max-w-xl mx-auto mb-12">
          We're committed to making your education journey seamless and
          successful.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {data.map((item, i) => (
            <div
              key={i}
              className="relative bg-white rounded-xl border border-gray-200 p-6 text-left hover:shadow-md transition"
            >
              <span className="absolute top-4 right-6 text-gray-100 text-5xl font-bold">
                {item.id}
              </span>

              <div className="w-12 h-12 flex items-center justify-center bg-[#fbf3e6] text-[#c5a46d] rounded-lg text-xl mb-4">
                {item.icon}
              </div>

              <h3 className="font-semibold text-lg text-[#1e2a38] mb-2">
                {item.title}
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
