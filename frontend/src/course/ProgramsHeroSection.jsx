import React from "react";
import { Link, useNavigate } from "react-router-dom";
import img1 from "../images/courseimg.png";

export default function ProgramsHeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-br from-[#0A1F44] via-[#1F3A6E] to-[#0A1F44] text-white overflow-hidden">

      {/* Soft Background Glow */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-60 h-60 bg-[#C9A227] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#C9A227] rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-12 md:py-14">
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Left Content */}
          <div className="space-y-5">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full border border-[#C9A227]/30 text-sm">
              <span className="w-2 h-2 bg-[#C9A227] rounded-full"></span>
              <span className="text-[#C9A227]">Programs</span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Explore Programs
              <span className="block text-[#C9A227]">For Your Career</span>
            </h1>

            {/* Short Description */}
            <p className="text-gray-300 text-sm md:text-base max-w-lg">
              Find undergraduate, postgraduate, and professional programs across top universities.
            </p>

            {/* CTA */}
            <div className="flex gap-3 pt-2">
              <button 
                onClick={() => navigate("/apply-now")}
                className="px-6 py-2.5 bg-[#C9A227] text-[#0A1F44] font-semibold rounded-md hover:bg-white transition"
              >
                Explore Now
              </button>
<Link to="/application-form">
              <button 
                onClick={() => navigate("/book-counselling")}
                className="px-6 py-2.5 border border-white text-white rounded-md hover:bg-white hover:text-[#0A1F44] transition"
              >
                Counselling
              </button>
              </Link>
            </div>

          </div>

          {/* Right Image */}
          <div className="relative">
            <img 
              src={img1}
              alt="Students"
              className="w-full h-[260px] md:h-[300px] object-cover rounded-xl shadow-xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
}