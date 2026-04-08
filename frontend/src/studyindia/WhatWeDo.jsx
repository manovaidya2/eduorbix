import React from "react";
import { Link } from "react-router-dom";


export default function WhatWeDo() {
  const services = [
    "University comparison",
    "Eligibility verification",
    "Entrance guidance", 
    "Direct admission support",
    "Documentation processing"
  ];

  return (
    <section className="py-10 px-4 bg-[#f8f7f3]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#c5a46d] text-sm font-semibold uppercase tracking-[0.2em]">Our Services</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e2a38] mt-3">What We Do</h2>
          <div className="w-20 h-1 bg-[#c5a46d] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Simple Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-[#c5a46d]/10 rounded-lg flex items-center justify-center group-hover:bg-[#c5a46d] transition-colors duration-300">
                <span className="text-[#c5a46d] group-hover:text-white text-base font-bold">✓</span>
              </div>
              <span className="text-[#1e2a38] font-medium">{service}</span>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
         <Link to="/application-form">
  <button className="px-6 py-3 bg-[#c5a46d] text-white rounded-lg text-sm font-medium hover:bg-[#c5a46d] transition-all duration-300">
    Get Free Consultation →
  </button>
</Link>
        </div>
      </div>
    </section>
  );
}