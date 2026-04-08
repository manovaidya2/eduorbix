import React from "react";
import ukImg from "../images/hero-bg.jpg";

export default function UKHero() {
  return (
    <section className="relative h-[400px] flex items-center overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={ukImg}
          alt="Study in UK"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b2a4a]/95 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-xl">

          {/* Tag */}
          <p className="text-[#c5a46d] text-sm tracking-wide mb-2">
            🇬🇧 STUDY IN UK
          </p>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-3">
            Study at Top
            <span className="block text-[#c5a46d]">
              UK Universities
            </span>
          </h1>

          {/* Description */}
          <p className="text-white/90 text-base mb-4">
            World-class education with global career opportunities.
          </p>

          {/* CTA */}
          <button className="px-6 py-3 bg-[#c5a46d] text-[#0b2a4a] text-sm font-medium rounded-md hover:bg-opacity-90 transition">
            Apply Now
          </button>

        </div>
      </div>
    </section>
  );
}