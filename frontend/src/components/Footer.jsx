"use client";

import React, { useState, useEffect } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../images/White logo (1).png";
import axiosInstance from "../api/axiosInstance";

export default function Footer() {
  const [studyIndiaPrograms, setStudyIndiaPrograms] = useState([]);
  const [studyAbroadCountries, setStudyAbroadCountries] = useState([]);
  const [categorizedPrograms, setCategorizedPrograms] = useState({});

  // Program headings data (same as Header)
  const programHeadings = [
    "REGULAR PROGRAMS",
    "COUNCIL APPROVED PROGRAMS",
    "SKILLED BASED INDUSTRY INTEGRATED PROGRAMS",
    "ONLINE & DISTANCE MODE EDUCATION",
    "BOARD EDUCATION"
  ];

  // Fetch Study in India programs
  useEffect(() => {
    fetchStudyIndiaPrograms();
    fetchStudyAbroadCountries();
  }, []);

  const fetchStudyIndiaPrograms = async () => {
    try {
      const response = await axiosInstance.get("/study-india-programs");
      if (response.data.success) {
        const programs = response.data.data;
        setStudyIndiaPrograms(programs);
        
        // Categorize programs
        const categorized = {};
        programHeadings.forEach(heading => {
          categorized[heading] = programs.filter(program => program.category === heading);
        });
        setCategorizedPrograms(categorized);
      }
    } catch (error) {
      console.error("Error fetching study india programs:", error);
    }
  };

  const fetchStudyAbroadCountries = async () => {
    try {
      const response = await axiosInstance.get("/study-abroad");
      if (Array.isArray(response.data)) {
        setStudyAbroadCountries(response.data);
      }
    } catch (error) {
      console.error("Error fetching study abroad countries:", error);
    }
  };

  return (
    <footer className="bg-[#0f2f57] text-white pt-14 pb-6 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Top Grid */}
        <div className="grid md:grid-cols-4 gap-10">

          {/* Left Section */}
          <div>
            <img src={logo} alt="Eduorbix Logo" className="h-12 md:h-16 lg:h-15 object-contain mb-4" />

            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Professional education consultancy dedicated to helping students
              secure admission in reputed universities across India and globally.
            </p>

            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-yellow-400" />
                <span>+971 528313726</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail size={16} className="text-yellow-400" />
                <span>info@eduorbix.com</span>
              </div>

              <div className="flex flex-col gap-3 text-sm md:text-base text-gray-300">
                {/* Head Office */}
                <div className="flex items-start gap-2">
                  <MapPin size={16} className="text-yellow-400 mt-1" />
                  <div>
                    <p className="font-semibold text-white">Head Office:</p>
                    <p>EduGlobe Services FZ-LLC, Ras Al Khaimah (RAK), UAE</p>
                  </div>
                </div>

                {/* Coordinating Office */}
                <div className="flex items-start gap-2">
                  <MapPin size={16} className="text-yellow-400 mt-1" />
                  <div>
                    <p className="font-semibold text-white">Coordinating Office:</p>
                    <p>Unit No. 209-04, Al Kazim, 2nd Floor, Hor Al Anz, Dubai, UAE</p>
                    <p className="text-gray-400 text-xs md:text-sm">
                      (Near Al Qiyadah Metro Station)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links - Dynamic from navItems */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Quick Links
              <span className="block w-10 h-[2px] bg-yellow-400 mt-1"></span>
            </h3>

            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/" className="hover:text-yellow-400 transition cursor-pointer block">Home</Link></li>
              <li><Link to="/about-us" className="hover:text-yellow-400 transition cursor-pointer block">About Us</Link></li>
              <li><Link to="/services" className="hover:text-yellow-400 transition cursor-pointer block">Services</Link></li>
              <li><Link to="/scholarships" className="hover:text-yellow-400 transition cursor-pointer block">Scholarships</Link></li>
              <li><Link to="/blogs" className="hover:text-yellow-400 transition cursor-pointer block">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-yellow-400 transition cursor-pointer block">Contact Us</Link></li>
              <li><Link to="/partner" className="hover:text-yellow-400 transition cursor-pointer block">Partner With Us</Link></li>
              <li><Link to="/for-agents" className="hover:text-yellow-400 transition cursor-pointer block">For Agents</Link></li>
            </ul>
          </div>

          {/* Study Destinations / Overseas Education - Dynamic from API */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Overseas Education
              <span className="block w-10 h-[2px] bg-yellow-400 mt-1"></span>
            </h3>

            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/study-abroad" className="hover:text-yellow-400 transition cursor-pointer block">📚 All Countries</Link></li>
              {studyAbroadCountries.slice(0, 6).map((country) => (
                <li key={country._id}>
                  <Link 
                    to={`/study/${country.country.toLowerCase()}`} 
                    className="hover:text-yellow-400 transition cursor-pointer block"
                  >
                    {country.flag ? `${country.flag} ` : "🌍 "}{country.country}
                  </Link>
                </li>
              ))}
              {studyAbroadCountries.length === 0 && (
                <li className="text-gray-400 text-sm">Loading countries...</li>
              )}
            </ul>
          </div>

          {/* Popular Programs / Study in India - Dynamic from API */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Study in India
              <span className="block w-10 h-[2px] bg-yellow-400 mt-1"></span>
            </h3>

            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/study-in-india" className="hover:text-yellow-400 transition cursor-pointer block">📚 All Programs</Link></li>
              {studyIndiaPrograms.slice(0, 6).map((program) => (
                <li key={program._id}>
                  <Link 
                    to={`/program/${program._id}`} 
                    className="hover:text-yellow-400 transition cursor-pointer block truncate"
                  >
                    {program.title.length > 35 ? program.title.slice(0, 35) + "..." : program.title}
                  </Link>
                </li>
              ))}
              {studyIndiaPrograms.length === 0 && (
                <li className="text-gray-400 text-sm">Loading programs...</li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#254a7a] mt-10 pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© 2026 Eduorbix. All rights reserved.</p>

          <div className="flex gap-6 mt-2 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-yellow-400 transition cursor-pointer">Privacy Policy</Link>
            <Link to="/terms-conditions" className="hover:text-yellow-400 transition cursor-pointer">Terms & Conditions</Link>
            <Link to="/refund-policy" className="hover:text-yellow-400 transition cursor-pointer">Refund Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}