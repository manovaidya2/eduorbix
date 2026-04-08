import React from "react";
import img from "../images/hero-bg.jpg";

export default function StudyInIndia() {
  return (
    <section className="relative h-[450px] md:h-[400px] flex items-center overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={img}
          alt="Students" 
          className="w-full h-full object-cover object-center"
        />

        {/* Overlay */}
        <div className="
          absolute inset-0 
          bg-gradient-to-b from-[#1e2a38]/95 via-[#1e2a38]/85 to-[#1e2a38]/80
          md:bg-gradient-to-r md:from-[#1e2a38] md:via-[#1e2a38]/90 md:to-transparent
        "></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 md:px-15 relative z-10">
        
        {/* 👇 Mobile center | Desktop left */}
        <div className="max-w-3xl py-6 sm:py-8 md:py-0 text-center md:text-left">

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
            Study in 
            <span className="text-[#c5a46d] block">
              Top Indian Universities
            </span>
          </h1>
          
          {/* Description */}
          <p className="text-white/90 text-sm sm:text-base md:text-base max-w-xl leading-relaxed mx-auto md:mx-0">
            India offers world-class education across Engineering, Management, Medical, Law, and Humanities.
          </p>
          
          <p className="text-white/70 text-xs sm:text-sm md:text-sm mt-2 max-w-xl mx-auto md:mx-0">
            Eduorbit helps you find the right university based on your profile, budget & goals.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-5 justify-center md:justify-start">
            <button className="w-full sm:w-auto px-5 py-2.5 bg-[#c5a46d] text-[#1e2a38] font-medium rounded-md text-sm hover:bg-opacity-90 transition-all">
              Explore Universities
            </button>

            <button className="w-full sm:w-auto px-5 py-2.5 bg-white/10 backdrop-blur-sm text-white rounded-md text-sm border border-white/20 hover:bg-white/20 transition-all">
              Talk to an Expert
            </button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
            {["Engineering", "Management", "Medical", "Law", "Humanities"].map((item, i) => (
              <span 
                key={i} 
                className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-xs sm:text-sm"
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