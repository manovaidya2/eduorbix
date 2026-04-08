import React from "react";
import img from "../images/hero-bg.jpg";

export default function StudyInAbroad() {
  return (
    <section className="relative min-h-[500px] sm:min-h-[400px] md:min-h-[420px] lg:min-h-[420px] flex items-center overflow-hidden">
      
      {/* Background Image with custom CSS for mobile */}
      <style jsx>{`
        @media (max-width: 640px) {
          .hero-image {
            object-fit: cover;
            object-position: 25% center;
            transform: scale(1.1);
          }
          .hero-overlay {
            background: linear-gradient(
              to bottom,
              #1e2a38 0%,
              rgba(30, 42, 56, 0.9) 50%,
              rgba(30, 42, 56, 0.7) 100%
            );
          }
        }
        @media (min-width: 641px) {
          .hero-overlay {
            background: linear-gradient(
              to right,
              #1e2a38 0%,
              rgba(30, 42, 56, 0.9) 50%,
              transparent 100%
            );
          }
        }
      `}</style>

      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src={img}
          alt="Students" 
          className="w-full h-full object-cover hero-image"
        />

        <div className="absolute inset-0 hero-overlay"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10 py-10 md:py-0">
        <div className="max-w-3xl">
          
          {/* Heading (Mobile center only) */}
          <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3 text-center md:text-left">
            Unlock Global
            <span className="text-[#c5a46d] block mt-1">
              Opportunities
            </span>
          </h1>

          {/* Description */}
          <p className="text-white/90 text-base sm:text-base md:text-lg max-w-xl leading-relaxed">
            Studying abroad enhances career prospects and provides valuable global exposure.
          </p>

          <p className="text-white/70 text-sm sm:text-sm md:text-base mt-2 max-w-xl">
            Eduorbix assists students in selecting the right country, university, and program for their future success.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button className="w-full sm:w-auto px-5 py-3 md:py-2.5 bg-[#c5a46d] text-[#1e2a38] font-medium rounded-md text-base md:text-sm lg:text-base hover:bg-opacity-90 transition-all shadow-lg">
              Explore Countries
            </button>

            <button className="w-full sm:w-auto px-5 py-3 md:py-2.5 bg-white/10 backdrop-blur-sm text-white rounded-md text-base md:text-sm lg:text-base border border-white/20 hover:bg-white/20 transition-all">
              Talk to an Expert
            </button>
          </div>

          {/* Countries */}
          <div className="flex flex-wrap gap-2 mt-5">
            {["USA", "UK", "Canada", "Australia", "Germany", "France", "New Zealand"].map((item, i) => (
              <span
                key={i}
                className="px-3 py-1.5 md:py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm md:text-xs lg:text-sm"
              >
                {item}
              </span>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}