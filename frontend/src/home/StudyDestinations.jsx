"use client";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function StudyDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axiosInstance.get("/study-abroad");
      console.log("Destinations API Response:", response.data);
      
      if (Array.isArray(response.data)) {
        // Take first 6 destinations or all if less than 6
        const destinationsData = response.data.slice(0, 6);
        setDestinations(destinationsData);
      } else {
        setError("Invalid data format received");
      }
    } catch (err) {
      console.error("Error fetching destinations:", err);
      setError(err.response?.data?.message || "Failed to fetch destinations. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get country code for flag/display
  const getCountryCode = (countryName) => {
    const countryMap = {
      "India": "IN",
      "United Kingdom": "GB",
      "UK": "GB",
      "Canada": "CA",
      "USA": "US",
      "United States": "US",
      "Australia": "AU",
      "Germany": "DE",
      "France": "FR",
      "Italy": "IT",
      "Spain": "ES",
      "Japan": "JP",
      "China": "CN",
      "Singapore": "SG",
      "UAE": "AE",
      "Dubai": "AE",
      "New Zealand": "NZ",
      "Ireland": "IE",
      "Netherlands": "NL",
      "Sweden": "SE"
    };
    return countryMap[countryName] || countryName.substring(0, 2).toUpperCase();
  };

  // Helper function to get tag based on country
  const getTagForCountry = (countryName) => {
    const countryLower = countryName?.toLowerCase() || "";
    
    if (countryLower.includes("india")) return "Affordable Excellence";
    if (countryLower.includes("uk") || countryLower.includes("united kingdom")) return "1-Year Masters";
    if (countryLower.includes("canada")) return "PR Pathway";
    if (countryLower.includes("usa") || countryLower.includes("united states")) return "Top Rankings";
    if (countryLower.includes("australia")) return "Work While Study";
    if (countryLower.includes("germany")) return "Low Tuition";
    if (countryLower.includes("france")) return "Art & Culture";
    if (countryLower.includes("singapore")) return "Asian Hub";
    if (countryLower.includes("uae") || countryLower.includes("dubai")) return "Global Hub";
    if (countryLower.includes("new zealand")) return "Quality Education";
    if (countryLower.includes("ireland")) return "Tech Hub";
    
    return "Study Abroad";
  };

  // Helper function to get university count text
  const getUniversityCount = (country) => {
    if (country.universities && Array.isArray(country.universities)) {
      const count = country.universities.length;
      return `${count}+ Universities`;
    }
    return "Multiple Universities";
  };

  if (loading) {
    return (
      <section className="bg-[#1f3b64] py-10 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#c5a46d] text-xs tracking-[3px] uppercase mb-2">
            WHERE WILL YOU STUDY?
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Overseas <span className="text-[#c5a46d]">Education</span>
          </h2>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c5a46d]"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-[#1f3b64] py-10 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#c5a46d] text-xs tracking-[3px] uppercase mb-2">
            WHERE WILL YOU STUDY?
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Overseas <span className="text-[#c5a46d]">Education</span>
          </h2>
          <div className="text-center py-12 bg-white/10 rounded-xl max-w-2xl mx-auto mt-8">
            <p className="text-red-400 mb-4">{error}</p>
            <button 
              onClick={fetchDestinations}
              className="bg-[#c5a46d] text-white px-6 py-2 rounded-lg hover:bg-yellow-500 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#1f3b64] py-10 px-4">
      <div className="max-w-7xl mx-auto text-center">

        {/* Heading */}
        <p className="text-[#c5a46d] text-xs tracking-[3px] uppercase mb-2">
          WHERE WILL YOU STUDY?
        </p>

        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Overseas <span className="text-[#c5a46d]">Education</span>
        </h2>

        <p className="text-gray-300 mt-3 mb-14">
          Explore top education destinations across the globe with Eduorbix.
        </p>

        {/* Grid */}
        {destinations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-300">No destinations available at the moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-7">
            {destinations.map((item, index) => (
              <Link
                key={item._id || index}
             to={`/study/${item.country.toLowerCase()}`}
                state={{ destination: item }}
                className="block"
              >
                <div
                  className="group relative bg-[#2a4a78] border border-[#3b5a8a] rounded-xl p-6 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
                >
                  {/* Glow Border */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 border border-yellow-400"></div>

                  {/* Badge */}
                  <span className="absolute top-4 right-4 bg-[#c5a46d] text-xs px-3 py-1 rounded-full font-medium transition-all duration-300 group-hover:shadow-md group-hover:scale-105">
                    {getTagForCountry(item.country)}
                  </span>

                  {/* Code/Flag */}
                  <h3 className="text-2xl text-gray-300 font-semibold mb-2">
                    {item.flag || getCountryCode(item.country)}
                  </h3>

                  {/* Country */}
                  <h4 className="text-white text-lg font-semibold">
                    {item.country}
                  </h4>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mt-2 mb-6 leading-relaxed line-clamp-2">
                    {item.desc || `Study in ${item.country} with world-class education and global opportunities.`}
                  </p>

                  {/* Bottom */}
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-[#c5a46d] text-sm font-medium">
                      {getUniversityCount(item)}
                    </span>

                    {/* Arrow */}
                    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#3b5a8a] text-yellow-400 transition-all duration-300 group-hover:bg-yellow-400 group-hover:text-[#1f3b64] group-hover:translate-x-1">
                      →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}