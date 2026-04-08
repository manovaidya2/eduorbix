import React, { useState, useEffect } from "react";
import { FaBars, FaBell, FaUserCircle, FaSearch, FaSignOutAlt, FaUser, FaCog } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
        setIsProfileOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileOpen && !event.target.closest(".profile-menu")) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isProfileOpen]);

  const handleLogout = () => {
    // Add logout logic here
    navigate("/login");
  };

  return (
    <>
      {/* Top Navbar (Sticky with glassmorphism) */}
      <nav
        className={`
          bg-gradient-to-r from-[#0A1A2F] to-[#0E1F38] 
          text-white flex justify-between items-center 
          fixed top-0 left-0 right-0 z-40
          transition-all duration-300
          ${scrolled ? "shadow-lg backdrop-blur-lg bg-opacity-95" : "shadow-md"}
          md:ml-64 px-4 md:px-6 py-3
        `}
      >
        {/* Left Section - Menu Icon and Brand */}
        <div className="flex items-center gap-4">
          {/* Menu Icon for mobile */}
          <button
            className="md:hidden text-2xl hover:text-[#FFD700] transition-colors duration-200"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open menu"
          >
            <FaBars />
          </button>

          {/* Mobile Brand */}
          <div className="md:hidden flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-lg flex items-center justify-center">
              <span className="text-[#0A1A2F] font-bold text-sm">E</span>
            </div>
            <span className="font-bold text-sm bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
              EDUORBIX
            </span>
          </div>

          {/* Desktop Welcome Message */}
          <div className="hidden md:block">
            <h2 className="text-lg font-semibold">
              Welcome back, <span className="text-[#FFD700]">Dr. Ankush</span>
            </h2>
            <p className="text-xs text-gray-400">Empowering education journey</p>
          </div>
        </div>

        {/* Right Section - Search, Notifications, Profile */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex items-center bg-white/10 rounded-lg px-3 py-1.5 hover:bg-white/20 transition-all duration-300">
            <FaSearch className="text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search courses..."
              className="bg-transparent outline-none text-sm px-2 py-1 text-white placeholder-gray-400 w-48"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-white/10 rounded-lg transition-all duration-200 group">
            <FaBell className="text-lg group-hover:text-[#FFD700] transition-colors" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative profile-menu">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 hover:bg-white/10 rounded-lg px-2 py-1.5 transition-all duration-200 group"
              aria-label="Profile menu"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full flex items-center justify-center">
                <FaUserCircle className="text-[#0A1A2F] text-xl" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">Dr. Ankush Garg</p>
                <p className="text-xs text-gray-400">Administrator</p>
              </div>
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#0E1F38] rounded-xl shadow-2xl border border-[#FFD700]/20 overflow-hidden z-50 animate-slideDown">
                <div className="p-4 border-b border-[#FFD700]/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full flex items-center justify-center">
                      <FaUserCircle className="text-[#0A1A2F] text-2xl" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Dr. Ankush Garg</p>
                      <p className="text-xs text-gray-400">dr.ankush@eduorbix.com</p>
                    </div>
                  </div>
                </div>
                
                <div className="py-2">
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-white/10 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <FaUser className="text-[#FFD700] text-sm" />
                    <span className="text-sm text-gray-300">My Profile</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-white/10 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <FaCog className="text-[#FFD700] text-sm" />
                    <span className="text-sm text-gray-300">Settings</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-white/10 transition-colors border-t border-[#FFD700]/20 mt-1"
                  >
                    <FaSignOutAlt className="text-red-400 text-sm" />
                    <span className="text-sm text-red-400">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar always visible on desktop */}
      <div className="hidden md:block fixed left-0 top-0 h-screen w-64 z-30">
        <Sidebar />
      </div>

      {/* Sidebar overlay on mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="relative w-64">
            <Sidebar />
            <button
              className="absolute top-4 right-4 text-white hover:text-[#FFD700] transition-colors"
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Close menu"
            >
              <MdClose size={24} />
            </button>
          </div>
          <div
            className="flex-1 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        </div>
      )}

      {/* Mobile Search Bar - Visible only on mobile */}
      <div className="md:hidden fixed top-14 left-0 right-0 z-30 px-4 pt-2 pb-3 bg-gradient-to-r from-[#0A1A2F] to-[#0E1F38] shadow-md">
        <div className="flex items-center bg-white/10 rounded-lg px-3 py-2">
          <FaSearch className="text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search courses, lessons..."
            className="bg-transparent outline-none text-sm px-2 text-white placeholder-gray-400 flex-1"
          />
        </div>
      </div>

      {/* Spacer for navbar and mobile search */}
      <div className="h-16 md:h-20"></div>
      <div className="md:hidden h-12"></div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;