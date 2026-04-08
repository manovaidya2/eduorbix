import React from 'react';

const ScholarshipHero = () => {
  return (
    <div
      className="w-full max-w-7xl mx-auto shadow-xl relative min-h-[450px] md:min-h-[450px] flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop')",
        backgroundPosition: "center 20%",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#000F1E] via-[#0A1E32]/95 to-[#002846]/90"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl px-6 md:px-10 lg:px-14 text-white py-6 md:py-8 text-center">
        
        {/* Badge */}
        <div className="mb-2">
          <span className="inline-block bg-yellow-400/20 text-yellow-400 text-[10px] md:text-xs px-3 py-1 rounded-full border border-yellow-400/30 uppercase tracking-wider">
            Eduorbix
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
          <span className="block text-white">Scholarship</span>
          <span className="block text-[#c5a46d] mt-1">Opportunities</span>
        </h1>

        {/* Description */}
        <p className="text-base md:text-lg text-gray-200 max-w-2xl mx-auto mt-4">
          Eduorbix helps students explore and secure scholarships for studying in India and abroad.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 items-center justify-center mt-6">
          <button className="bg-[#c5a46d] hover:bg-yellow-500 text-gray-900 font-semibold px-6 md:px-7 py-2.5 rounded-full text-base md:text-lg shadow-md hover:shadow-lg transition-all duration-200">
            Find scholarships →
          </button>
          <button className="bg-transparent hover:bg-white/10 text-white font-semibold px-6 md:px-7 py-2.5 rounded-full text-base md:text-lg border border-white/70 hover:border-white backdrop-blur-sm transition-all duration-200">
            Explore countries
          </button>
        </div>

        {/* Tags */}
        <div className="flex gap-5 mt-6 text-xs md:text-sm text-gray-300 justify-center">
          <span className="flex items-center gap-1.5">
            <span className="text-base">🇮🇳</span> India
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-base">🌍</span> Abroad
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-base">🎓</span> 100+ programs
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipHero;