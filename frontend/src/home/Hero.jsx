import React from "react";
import img from "../images/hero-bg.jpg";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
<section className="relative w-full min-h-[100vh] md:min-h-[85vh] flex items-center justify-center md:justify-start pb-10 -mt-[30px] md:mt-0">
  {/* Background */}
  <div className="absolute inset-0">
    <img
      src={img}
      alt="hero"
      className="w-full h-full object-cover object-center md:object-cover"
    />
    <div className="absolute inset-0 bg-[#0b2a4a]/85"></div>
  </div>

  {/* Content */}
  <div className="relative z-10 w-full max-w-4xl px-4 md:px-10 lg:px-16 text-white text-center md:text-left flex flex-col items-center md:items-start justify-center">

    {/* Badge */}
    <div className="inline-block bg-[#0d2f52] border border-yellow-400 text-[#c5a46d] px-3 py-1 rounded-full text-sm mb-5">
      • Trusted by 15,000+ Students
    </div>

    {/* Heading */}
    <h1 className="text-3xl md:text-6xl font-bold leading-tight mb-5 max-w-3xl">
      Not Just Education -{" "}
      <span className="text-[#c5a46d]">A Global Journey</span>
    </h1>

    {/* Subtext */}
    <p className="text-gray-300 max-w-xl mb-7 text-base md:text-xl leading-relaxed">
      Personalized admission guidance, university shortlisting,
      application support, and visa assistance — all under one roof.
    </p>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row gap-4 mb-7 w-full sm:w-auto">
      <Link to="/contact" className="w-full sm:w-auto">
        <button className="w-full bg-[#c5a46d] text-black px-6 py-3 rounded-lg text-sm md:text-base font-semibold hover:bg-yellow-500">
          🎓 Book Free Counselling →
        </button>
      </Link>

      <Link to="/application-form" className="w-full sm:w-auto">
        <button className="w-full border border-yellow-400 px-6 py-3 rounded-lg text-sm md:text-base font-semibold hover:bg-yellow-400 hover:text-black transition">
          📝 Apply Now
        </button>
      </Link>
    </div>

    {/* Stats */}
    <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm md:text-base text-gray-300">
      <div className="flex items-center gap-2">
        <span className="text-[#c5a46d]">✔</span> 98% Success Rate
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[#c5a46d]">✔</span> 500+ Universities
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[#c5a46d]">✔</span> 25+ Countries
      </div>
    </div>
  </div>

  {/* Bottom Stats Card */}
  <div className="absolute bottom-[-60px] md:bottom-[-50px] left-1/2 -translate-x-1/2 w-[95%] md:w-[92%] bg-white rounded-2xl shadow-lg grid grid-cols-2 md:grid-cols-4 text-center py-6">
    
    <div className="border-r border-gray-200">
      <p className="text-xl md:text-2xl font-bold text-[#c5a46d]">15,000+</p>
      <p className="text-gray-600 text-xs md:text-sm">Students Placed</p>
    </div>

    <div className="border-r border-gray-200">
      <p className="text-xl md:text-2xl font-bold text-[#c5a46d]">500+</p>
      <p className="text-gray-600 text-xs md:text-sm">Partner Universities</p>
    </div>

    <div className="border-r border-gray-200">
      <p className="text-xl md:text-2xl font-bold text-[#c5a46d]">25+</p>
      <p className="text-gray-600 text-xs md:text-sm">Countries Covered</p>
    </div>

    <div>
      <p className="text-xl md:text-2xl font-bold text-[#c5a46d]">98%</p>
      <p className="text-gray-600 text-xs md:text-sm">Success Rate</p>
    </div>

  </div>

</section>
  );
}