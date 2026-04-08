import React from "react";
import { Link } from "react-router-dom";

export default function ApplySection() {
  return (
    <section className="py-16 px-6 md:px-8 bg-[#f8f7f3]">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e2a38] mb-4">
            Apply for Admission in India
          </h2>
          
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Start your application process with expert guidance from Eduorbix.
          </p>
          
          <Link to="/application-form">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#c5a46d] text-[#1e2a38] font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md hover:shadow-lg">
              Apply Now
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}