// Header.jsx (updated with individual category dropdowns for mobile)
import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, ChevronRight, GraduationCap, Globe, BookOpen, Building, Settings, Heart, Phone, MapPin, Clock, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import logo from "../images/White logo (1).png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [studyIndiaPrograms, setStudyIndiaPrograms] = useState([]);
  const [studyAbroadCountries, setStudyAbroadCountries] = useState([]);
  const [categorizedPrograms, setCategorizedPrograms] = useState({});
  const [isStudyIndiaOpen, setIsStudyIndiaOpen] = useState(false);
  const [isMobileStudyIndiaOpen, setIsMobileStudyIndiaOpen] = useState(false);
  const [isStudyAbroadOpen, setIsStudyAbroadOpen] = useState(false);
  const [isMobileStudyAbroadOpen, setIsMobileStudyAbroadOpen] = useState(false);
  const [isProgramsHorizonOpen, setIsProgramsHorizonOpen] = useState(false);
  const [isMobileProgramsOpen, setIsMobileProgramsOpen] = useState(false);
  
  // State for individual category dropdowns in mobile
  const [mobileOpenCategories, setMobileOpenCategories] = useState({});
  
  let studyIndiaTimeoutRef = useRef(null);
  let studyAbroadTimeoutRef = useRef(null);
  let programsHorizonTimeoutRef = useRef(null);
  const dropdownRef = useRef(null);
  const studyAbroadDropdownRef = useRef(null);
  const programsHorizonRef = useRef(null);

  // Program headings data
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

  // Toggle individual category in mobile
  const toggleMobileCategory = (heading) => {
    setMobileOpenCategories(prev => ({
      ...prev,
      [heading]: !prev[heading]
    }));
  };

  // Scroll detect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Hover handlers for Study in India
  const handleStudyIndiaMouseEnter = () => {
    if (studyIndiaTimeoutRef.current) {
      clearTimeout(studyIndiaTimeoutRef.current);
    }
    setIsStudyIndiaOpen(true);
  };

  const handleStudyIndiaMouseLeave = () => {
    studyIndiaTimeoutRef.current = setTimeout(() => {
      setIsStudyIndiaOpen(false);
    }, 200);
  };

  // Hover handlers for Study Abroad
  const handleStudyAbroadMouseEnter = () => {
    if (studyAbroadTimeoutRef.current) {
      clearTimeout(studyAbroadTimeoutRef.current);
    }
    setIsStudyAbroadOpen(true);
  };

  const handleStudyAbroadMouseLeave = () => {
    studyAbroadTimeoutRef.current = setTimeout(() => {
      setIsStudyAbroadOpen(false);
    }, 200);
  };

  // Hover handlers for Programs Horizon - Now shows categorized dropdown
  const handleProgramsHorizonMouseEnter = () => {
    if (programsHorizonTimeoutRef.current) {
      clearTimeout(programsHorizonTimeoutRef.current);
    }
    setIsProgramsHorizonOpen(true);
  };

  const handleProgramsHorizonMouseLeave = () => {
    programsHorizonTimeoutRef.current = setTimeout(() => {
      setIsProgramsHorizonOpen(false);
    }, 200);
  };

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (studyIndiaTimeoutRef.current) {
        clearTimeout(studyIndiaTimeoutRef.current);
      }
      if (studyAbroadTimeoutRef.current) {
        clearTimeout(studyAbroadTimeoutRef.current);
      }
      if (programsHorizonTimeoutRef.current) {
        clearTimeout(programsHorizonTimeoutRef.current);
      }
    };
  }, []);

  // Navigation items configuration
  const navItems = [
    { path: "/", label: "Home", icon: <GraduationCap size={20} /> },
    { path: "/about-us", label: "About Us", icon: <User size={20} /> },
    { path: "/services", label: "Services", icon: <Settings size={20} /> },
    { path: "/scholarships", label: "Scholarships", icon: <Heart size={20} /> },
    { path: "/blogs", label: "Blog", icon: <BookOpen size={20} /> },
    { path: "/contact", label: "Contact", icon: <Phone size={20} /> },
  ];

  return (
    <>
      <header className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0d2f52]/95 backdrop-blur shadow-lg" : "bg-transparent"
      }`}>
        {/* Top Bar */}
        <div className="bg-[#0b2a4a] text-white text-xs md:text-sm px-4 md:px-6 py-2 flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <span className="flex items-center gap-1">📞 +971 528313726 </span>
          </div>
          <div className="flex gap-3 text-[11px] sm:text-sm">
            <Link to="/partner"><span className="cursor-pointer hover:text-yellow-400 transition">Partner With Us</span></Link>
            <Link to="/for-agents"><span className="cursor-pointer hover:text-yellow-400 transition">For Agents</span></Link>
          </div>
        </div>

        {/* Main Navbar */}
        <div className={`text-white px-4 md:px-8 py-4 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "bg-[#0b2a4a]" : "bg-[#0b2a4a]"
        }`}>
          {/* Logo - Size Increased */}
          <Link to="/" className="flex items-center">
            <img 
              src={logo} 
              alt="Eduorbix Logo" 
              className="h-12 md:h-16 lg:h-15 object-contain" // Increased from h-10 md:h-15 to h-12 md:h-16 lg:h-20
            />
          </Link>
          
          {/* Desktop Menu - NO CHANGES */}
          <nav className="hidden md:flex items-center gap-4 text-[16px] font-medium">
            <Link to="/" className="hover:text-yellow-400">Home</Link>
            <Link to="/about-us" className="hover:text-yellow-400">About Us</Link>

            {/* PROGRAMS HORIZON - Categorized dropdown with programs */}
            <div 
              className="relative" 
              ref={programsHorizonRef}
              onMouseEnter={handleProgramsHorizonMouseEnter}
              onMouseLeave={handleProgramsHorizonMouseLeave}
            >
              <button className="flex items-center gap-1 hover:text-yellow-400 focus:outline-none cursor-pointer">
                Programs <ChevronDown size={16} />
              </button>

              {isProgramsHorizonOpen && (
                <div className="fixed top-[100px] left-5 right-5 z-50 animate-slideDown">            
                  <div className="bg-white rounded-lg shadow-2xl border-t-4 border-yellow-400">                    
                    <div className="max-h-[80vh] overflow-y-auto">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-3 p-3">
                        {programHeadings.map((heading, index) => {
                          const programsInCategory = categorizedPrograms[heading] || [];
                          return (
                            <div key={index} className="space-y-2">
                              <Link
                                to={`/programs/category/${encodeURIComponent(heading)}`}
                                className="block"
                              >
                                <h3 className="inline-block font-semibold text-[14px] text-[#0b2a4a] border-b border-yellow-400 pb-[2px] mb-1 hover:text-yellow-600 transition-colors">    
                                  {heading}
                                </h3>
                              </Link>
                              {programsInCategory.length > 0 ? (
                                <ul className="space-y-2">
                                  {/* Display ALL programs - removed the slice limit */}
                                  {programsInCategory.map((program) => (
                                    <li key={program._id}>
                                      <Link
                                        to={`/program/${program._id}`}
                                        onClick={() => setIsProgramsHorizonOpen(false)}
                                        className="text-[12px] text-gray-600 hover:text-yellow-600 hover:pl-2 transition-all duration-200 block"
                                      >
                                        {program.title.length > 40 ? program.title.slice(0, 40) + "..." : program.title}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-sm text-gray-400 italic">No programs yet</p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Study Abroad Dropdown */}
            <div className="relative" ref={studyAbroadDropdownRef} onMouseEnter={handleStudyAbroadMouseEnter} onMouseLeave={handleStudyAbroadMouseLeave}>
              <button className="flex items-center gap-1 hover:text-yellow-400 focus:outline-none cursor-pointer">
                Overseas Education <ChevronDown size={16} />
              </button>
              {isStudyAbroadOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-lg py-2 z-50 animate-slideDown max-h-96 overflow-y-auto">
                  <Link to="/study-abroad" onClick={() => setIsStudyAbroadOpen(false)} className="block px-4 py-2 text-yellow-600 hover:bg-gray-100 font-semibold border-b border-gray-200">
                    📚 View All Countries
                  </Link>
                  {studyAbroadCountries.length > 0 ? (
                    studyAbroadCountries.map((country) => (
                      <Link key={country._id} to={`/study/${country.country.toLowerCase()}`} onClick={() => setIsStudyAbroadOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-yellow-600 transition-colors">
                        {country.flag ? `${country.flag} ` : "🌍 "}{country.country}
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500 text-sm">Loading countries...</div>
                  )}
                </div>
              )}
            </div>

            <Link to="/services" className="hover:text-yellow-400">Services</Link>
            <Link to="/associates" className="hover:text-yellow-400">Associate</Link>
            <Link to="/scholarships" className="hover:text-yellow-400">Scholarships</Link>
            <Link to="/blogs" className="hover:text-yellow-400">Blog</Link>
            <Link to="/contact" className="hover:text-yellow-400">Contact</Link>
          </nav>

          {/* Apply Button */}
          <Link to="/application-form" className="hidden md:block bg-[#c5a46d] text-black px-5 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition">
            Apply Now
          </Link>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(true)} className="p-2 hover:bg-white/10 rounded-lg transition">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar - UPDATED with individual category dropdowns */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden" onClick={() => setIsOpen(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300" onClick={() => setIsOpen(false)} />
          <div className="absolute top-0 right-0 h-full w-[85%] max-w-[320px] bg-gradient-to-b from-[#0a2a48] to-[#0d2f52] shadow-2xl transform transition-all duration-500 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="relative overflow-hidden bg-gradient-to-r from-[#c5a46d] to-[#d4b88c] px-6 pt-8 pb-3">
              <div className="relative">
                <div className="flex justify-between items-start mb-3">
                  <div className="text-2xl font-bold tracking-wide">
                    <span className="text-white">EDU</span>
                    <span className="text-[#0a2a48]">ORBIX</span>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="text-white hover:rotate-90 transition-transform duration-300 bg-black/20 p-2 rounded-full">
                    <X size={22} />
                  </button>
                </div>
              </div>
            </div>

            {/* Regular Nav Items */}
            <div className="px-5 py-6 space-y-1">
              {navItems.map((item, index) => (
                <Link key={item.path} to={item.path} className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 group" onClick={() => setIsOpen(false)}>
                  <span className="text-yellow-400 group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                  <ChevronRight size={16} className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0" />
                </Link>
              ))}
            </div>

            {/* Mobile Programs Section - UPDATED with individual dropdowns for each category */}
            <div className="px-5 mt-2">
              <button 
                onClick={() => setIsMobileProgramsOpen(!isMobileProgramsOpen)} 
                className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-white bg-white/5 hover:bg-white/10 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <BookOpen size={20} className="text-yellow-400" />
                  <span className="font-medium">Programs</span>
                </div>
                <ChevronDown size={18} className={`text-yellow-400 transition-transform duration-300 ${isMobileProgramsOpen ? "rotate-180" : ""}`} />
              </button>
              
              {isMobileProgramsOpen && (
                <div className="mt-3 space-y-3 ml-2 overflow-hidden animate-slideDown">
                  {programHeadings.map((heading, idx) => {
                    const programsInCategory = categorizedPrograms[heading] || [];
                    return (
                      <div key={idx} className="space-y-1">
                        {/* Category Header with its own dropdown toggle */}
                        <button
                          onClick={() => toggleMobileCategory(heading)}
                          className="flex items-center justify-between w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 transition-colors group"
                        >
                          <Link 
                            to={`/programs/category/${encodeURIComponent(heading)}`} 
                            onClick={(e) => e.stopPropagation()}
                            className="text-yellow-400 font-semibold text-sm hover:text-yellow-300 transition-colors flex-1"
                          >
                            {heading}
                          </Link>
                          <ChevronDown 
                            size={16} 
                            className={`text-yellow-400 transition-transform duration-200 ${mobileOpenCategories[heading] ? "rotate-180" : ""}`}
                          />
                        </button>
                        
                        {/* Programs list for this category (visible when dropdown is open) - Display ALL programs */}
                        {mobileOpenCategories[heading] && (
                          <div className="pl-4 space-y-1 pb-2 overflow-hidden animate-slideDown">
                            {programsInCategory.length > 0 ? (
                              <>
                                {/* Display ALL programs - removed the slice limit */}
                                {programsInCategory.map((program) => (
                                  <Link 
                                    key={program._id}
                                    to={`/program/${program._id}`} 
                                    onClick={() => setIsOpen(false)} 
                                    className="block text-white/70 hover:text-yellow-400 text-xs py-2 px-3 transition-colors rounded-lg hover:bg-white/5"
                                  >
                                    • {program.title.length > 35 ? program.title.slice(0, 35) + "..." : program.title}
                                  </Link>
                                ))}
                              </>
                            ) : (
                              <p className="text-xs text-white/40 px-3 py-2 italic">No programs available</p>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  
                  {/* View All Programs Link */}
                  <Link 
                    to="/study-in-india" 
                    onClick={() => setIsOpen(false)} 
                    className="block text-center text-sm text-yellow-400 hover:text-yellow-300 pt-3 pb-2 border-t border-white/10 mt-2"
                  >
                    📚 View All Programs
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Study in India Section */}
            <div className="px-5 mt-3">
              <button onClick={() => setIsMobileStudyIndiaOpen(!isMobileStudyIndiaOpen)} className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-white bg-white/5 hover:bg-white/10 transition-all duration-200 group">
                <div className="flex items-center gap-3">
                  <GraduationCap size={20} className="text-yellow-400" />
                  <span className="font-medium">Study in India</span>
                </div>
                <ChevronDown size={18} className={`text-yellow-400 transition-transform duration-300 ${isMobileStudyIndiaOpen ? "rotate-180" : ""}`} />
              </button>
              {isMobileStudyIndiaOpen && (
                <div className="mt-3 ml-8 space-y-2 pl-4 overflow-hidden animate-slideDown">
                  <Link to="/study-in-india" onClick={() => { setIsOpen(false); setIsMobileStudyIndiaOpen(false); }} className="flex items-center gap-2 text-sm bg-white/10 rounded-lg mb-2 text-white/70 hover:text-yellow-400 py-2 transition-colors px-3">
                    📚 View All Programs
                  </Link>
                  {studyIndiaPrograms.length > 0 ? (
                    // Display ALL study india programs - removed the slice limit
                    studyIndiaPrograms.map((program) => (
                      <Link key={program._id} to={`/program/${program._id}`} onClick={() => { setIsOpen(false); setIsMobileStudyIndiaOpen(false); }} className="block text-sm bg-white/10 rounded-lg text-white/70 hover:text-yellow-400 py-2 transition-colors px-3">
                        {program.title.length > 35 ? program.title.slice(0, 35) + "..." : program.title}
                      </Link>
                    ))
                  ) : (
                    <div className="text-sm text-white/50 py-2 pl-2 animate-pulse">Loading programs...</div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Study Abroad Section */}
            <div className="px-5 mt-3">
              <button onClick={() => setIsMobileStudyAbroadOpen(!isMobileStudyAbroadOpen)} className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-white bg-white/5 hover:bg-white/10 transition-all duration-200 group">
                <div className="flex items-center gap-3">
                  <Globe size={20} className="text-yellow-400" />
                  <span className="font-medium">OVERSEAS EDUCATION</span>
                </div>
                <ChevronDown size={18} className={`text-yellow-400 transition-transform duration-300 ${isMobileStudyAbroadOpen ? "rotate-180" : ""}`} />
              </button>
              {isMobileStudyAbroadOpen && (
                <div className="mt-3 ml-8 space-y-2 pl-4 overflow-hidden animate-slideDown">
                  {studyAbroadCountries.length > 0 ? (
                    // Display ALL study abroad countries - removed the slice limit
                    studyAbroadCountries.map((country) => (
                      <Link key={country._id} to={`/study/${country.country.toLowerCase()}`} onClick={() => { setIsOpen(false); setIsMobileStudyAbroadOpen(false); }} className="flex items-center gap-2 text-sm bg-white/10 rounded-lg mb-2 text-white/70 hover:text-yellow-400 px-3 py-2 transition-colors">
                        <span className="text-base">{country.flag || "🌍"}</span>
                        <span>{country.country}</span>
                      </Link>
                    ))
                  ) : (
                    <div className="text-sm text-white/50 py-2 animate-pulse">Loading countries...</div>
                  )}
                  <Link to="/study-abroad" onClick={() => setIsOpen(false)} className="flex items-center gap-2 bg-white/10 rounded-lg text-sm text-yellow-400 hover:text-yellow-300 py-2 transition-colors pt-2 border-t border-white/10 px-3">
                    📚 View All Countries
                  </Link>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="px-5 mt-8 space-y-3">
              <Link to="/partner" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 w-full bg-white/10 backdrop-blur-sm text-white py-3 rounded-xl font-medium hover:bg-white/20 transition-all duration-200 border border-white/20">
                <User size={18} /> Partner With Us
              </Link>
              <Link to="/for-agents" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 w-full bg-white/10 backdrop-blur-sm text-white py-3 rounded-xl font-medium hover:bg-white/20 transition-all duration-200 border border-white/20">
                <LogOut size={18} /> For Agents
              </Link>
              <Link to="/application-form" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-3 rounded-xl font-bold shadow-lg hover:shadow-yellow-500/25 hover:scale-[1.02] transition-all duration-200">
                Apply Now →
              </Link>
            </div>

            {/* Footer Info */}
            <div className="px-5 mt-8 pb-8 pt-4 border-t border-white/10">
              <div className="flex items-center gap-3 text-white/60 text-xs"><Phone size={14} /><span>+91 XXXXXXXXXX</span></div>
              <div className="flex items-center gap-3 text-white/60 text-xs mt-2"><MapPin size={14} /><span>Your Education Partner</span></div>
              <div className="flex items-center gap-3 text-white/60 text-xs mt-2"><Clock size={14} /><span>Mon - Sat: 9AM - 7PM</span></div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown { animation: slideDown 0.2s ease-out; }
      `}</style>
    </>
  );
}