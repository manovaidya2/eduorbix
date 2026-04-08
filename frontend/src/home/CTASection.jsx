import React from "react";
import { Link } from "react-router-dom";
export default function CTASection() {
  return (
    <section className="bg-gradient-to-br from-[#1f3a63] to-[#243f6b] py-10 px-4 relative overflow-hidden">
      {/* small dots */}
      <div className="absolute top-10 right-10 w-2 h-2 bg-[#c5a46d] rounded-full opacity-60"></div>
      <div className="absolute bottom-10 left-10 w-2 h-2 bg-[#c5a46d] rounded-full opacity-60"></div>

      <div className="max-w-4xl mx-auto text-center text-white">
        {/* icon circle */}
        <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center rounded-full bg-[#2f4b7c] text-[#c5a46d] text-xl">
          ✨
        </div>

        {/* heading */}
        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
          Ready to Start Your{' '}
          <span className="text-[#c5a46d]">Academic Journey?</span>
        </h2>

        {/* sub text */}
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Book your free counselling session today and take the first step
          towards your dream university.
        </p>

        {/* buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/application-form" className="bg-[#c5a46d] text-black font-semibold px-6 py-3 rounded-md hover:opacity-90 transition">
            Book Free Counselling →
          </Link>
            <Link to="/application-form" className="border border-[#c5a46d] text-white px-6 py-3 rounded-md hover:bg-[#c5a46d] hover:text-black transition">
              Apply Now
            </Link>
        </div>
      </div>
    </section>
  );
}
