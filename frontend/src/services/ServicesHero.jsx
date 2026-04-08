import React from "react";
import bgImg from "../images/courseimg.png";

export default function ServicesHero() {
  return (
    <section className="relative h-[380px] md:h-[400px] flex items-center justify-center text-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            `url(${bgImg})`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#1f3a6e]/90" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-6">
        <p className="text-sm tracking-widest text-[#c5a46d] mb-3 font-semibold">
          WHAT WE DO
        </p>

        <h1 className="text-5xl md:text-6xl font-semibold text-white leading-tight">
          Our <span className="text-[#c5a46d]">Services</span>
        </h1>

        <p className="text-gray-300 mt-4 text-lg leading-relaxed">
          Comprehensive admission support services to make your education
          journey smooth and successful.
        </p>
      </div>
    </section>
  );
}
