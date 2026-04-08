import React from "react";
import bgImg from "../images/courseimg.png"; // 👈 apni image path
import { Link } from "react-router-dom";

export default function PartnerUniversities() {
  return (
    <section className="relative text-white py-10 px-4 md:px-12 overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={bgImg}
          alt="background"
          className="w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1F44]/95 via-[#1F3A6E]/90 to-[#0A1F44]/95"></div>
      </div>

      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#C9A227]/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#C9A227]/20 blur-3xl rounded-full"></div>

      <div className="max-w-5xl mx-auto text-center relative z-10">

        {/* Badge */}
        <div className="inline-block px-4 py-1 mb-4 text-sm border border-[#C9A227]/40 rounded-full text-[#C9A227]">
          Global Network
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
          Connecting You to <br />
          <span className="text-[#C9A227]">World-Class Universities</span>
        </h2>

        {/* Description */}
        <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-sm md:text-base leading-relaxed">
          We collaborate with top institutions across the globe to open doors
          for students seeking quality education, international exposure, and
          career-defining opportunities.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="#university">
          <button className="bg-[#C9A227] text-[#0A1F44] px-6 py-3 rounded-lg font-semibold hover:scale-105 transition">
            Explore Universities
          </button>
</Link>
<Link to="/application-form">
          <button className="border border-white/30 px-6 py-3 rounded-lg hover:bg-white/10 transition">
            Get Free Consultation
          </button>
</Link>

        </div>

      </div>
    </section>
  );
}