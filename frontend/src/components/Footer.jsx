"use client";

import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "../images/White logo (1).png";

export default function Footer() {
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
                <span>+91 XXXXXXXX</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail size={16} className="text-yellow-400" />
                <span>info@eduorbix.com</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-yellow-400" />
                <span>Your Office Address</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Quick Links
              <span className="block w-10 h-[2px] bg-yellow-400 mt-1"></span>
            </h3>

            <ul className="space-y-2 text-sm text-gray-300">
              <li className="hover:text-yellow-400 cursor-pointer">About Us</li>
              <li className="hover:text-yellow-400 cursor-pointer">Services</li>
              <li className="hover:text-yellow-400 cursor-pointer">Courses</li>
              <li className="hover:text-yellow-400 cursor-pointer">Universities</li>
              <li className="hover:text-yellow-400 cursor-pointer">Scholarships</li>
              <li className="hover:text-yellow-400 cursor-pointer">Blog</li>
              <li className="hover:text-yellow-400 cursor-pointer">Contact Us</li>
            </ul>
          </div>

          {/* Study Destinations */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Study Destinations
              <span className="block w-10 h-[2px] bg-yellow-400 mt-1"></span>
            </h3>

            <ul className="space-y-2 text-sm text-gray-300">
              <li className="hover:text-yellow-400 cursor-pointer">Study in India</li>
              <li className="hover:text-yellow-400 cursor-pointer">Study in UK</li>
              <li className="hover:text-yellow-400 cursor-pointer">Study in Canada</li>
              <li className="hover:text-yellow-400 cursor-pointer">Study in USA</li>
              <li className="hover:text-yellow-400 cursor-pointer">Study in Australia</li>
              <li className="hover:text-yellow-400 cursor-pointer">Study in Germany</li>
            </ul>
          </div>

          {/* Popular Programs */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Popular Programs
              <span className="block w-10 h-[2px] bg-yellow-400 mt-1"></span>
            </h3>

            <ul className="space-y-2 text-sm text-gray-300">
              <li className="hover:text-yellow-400 cursor-pointer">MBA / BBA</li>
              <li className="hover:text-yellow-400 cursor-pointer">B.Tech / M.Tech</li>
              <li className="hover:text-yellow-400 cursor-pointer">Medical / MBBS</li>
              <li className="hover:text-yellow-400 cursor-pointer">Law (LLB / LLM)</li>
              <li className="hover:text-yellow-400 cursor-pointer">PhD Programs</li>
              <li className="hover:text-yellow-400 cursor-pointer">Apply Now</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#254a7a] mt-10 pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© 2026 Eduorbix. All rights reserved.</p>

          <div className="flex gap-6 mt-2 md:mt-0">
            <span className="hover:text-yellow-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-yellow-400 cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-yellow-400 cursor-pointer">Refund Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
}