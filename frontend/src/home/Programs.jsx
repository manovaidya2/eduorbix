import React, { useState, useEffect } from "react";
import {
  Cpu,
  Briefcase,
  Stethoscope,
  Scale,
  Monitor,
  BookOpen,
  ArrowRight,
  GraduationCap,
  Globe,
  Heart,
  Building,
  Code,
  Database,
  Shield,
  Music,
  Camera,
  Truck,
  Leaf,
  BarChart
} from "lucide-react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

// Expanded icon mapping for different program categories
const getIconForCategory = (category, title) => {
  const categoryLower = category?.toLowerCase() || "";
  const titleLower = title?.toLowerCase() || "";
  
  // Engineering & Technology
  if (categoryLower.includes("engineering") || titleLower.includes("engineering") || 
      titleLower.includes("b.tech") || titleLower.includes("m.tech")) {
    return <Cpu size={24} />;
  }
  
  // Management & Business
  if (categoryLower.includes("management") || titleLower.includes("mba") || 
      titleLower.includes("bba") || titleLower.includes("business")) {
    return <Briefcase size={24} />;
  }
  
  // Medical & Healthcare
  if (categoryLower.includes("medical") || titleLower.includes("mbbs") || 
      titleLower.includes("bds") || titleLower.includes("nursing") || 
      titleLower.includes("pharmacy")) {
    return <Stethoscope size={24} />;
  }
  
  // Law
  if (categoryLower.includes("law") || titleLower.includes("llb") || 
      titleLower.includes("llm") || titleLower.includes("legal")) {
    return <Scale size={24} />;
  }
  
  // Computer Science & IT
  if (categoryLower.includes("computer") || titleLower.includes("bca") || 
      titleLower.includes("mca") || titleLower.includes("it") || 
      titleLower.includes("software")) {
    return <Monitor size={24} />;
  }
  
  // Research & PhD
  if (categoryLower.includes("research") || titleLower.includes("phd") || 
      titleLower.includes("doctorate")) {
    return <BookOpen size={24} />;
  }
  
  // Science
  if (categoryLower.includes("science") || titleLower.includes("b.sc") || 
      titleLower.includes("m.sc") || titleLower.includes("physics") || 
      titleLower.includes("chemistry") || titleLower.includes("biology")) {
    return <GraduationCap size={24} />;
  }
  
  // Commerce
  if (categoryLower.includes("commerce") || titleLower.includes("b.com") || 
      titleLower.includes("m.com") || titleLower.includes("accounting") || 
      titleLower.includes("finance")) {
    return <BarChart size={24} />;
  }
  
  // Arts & Humanities
  if (categoryLower.includes("arts") || titleLower.includes("ba") || 
      titleLower.includes("humanities") || titleLower.includes("history") || 
      titleLower.includes("literature")) {
    return <BookOpen size={24} />;
  }
  
  // Design
  if (categoryLower.includes("design") || titleLower.includes("fashion") || 
      titleLower.includes("interior") || titleLower.includes("graphic")) {
    return <Camera size={24} />;
  }
  
  // Agriculture
  if (categoryLower.includes("agriculture") || titleLower.includes("farming")) {
    return <Leaf size={24} />;
  }
  
  // Default icons based on index for variety
  const defaultIcons = [
    <GraduationCap size={24} />,
    <Building size={24} />,
    <Code size={24} />,
    <Database size={24} />,
    <Shield size={24} />,
    <Heart size={24} />,
    <Globe size={24} />
  ];
  
  // Use title length to determine which default icon to show
  const index = (title?.length || 0) % defaultIcons.length;
  return defaultIcons[index];
};

// Get hover color based on category
const getHoverColor = (category) => {
  const categoryLower = category?.toLowerCase() || "";
  
  if (categoryLower.includes("engineering")) return "hover:bg-blue-50";
  if (categoryLower.includes("management")) return "hover:bg-green-50";
  if (categoryLower.includes("medical")) return "hover:bg-red-50";
  if (categoryLower.includes("law")) return "hover:bg-purple-50";
  if (categoryLower.includes("computer")) return "hover:bg-cyan-50";
  if (categoryLower.includes("research")) return "hover:bg-yellow-50";
  if (categoryLower.includes("science")) return "hover:bg-indigo-50";
  if (categoryLower.includes("commerce")) return "hover:bg-orange-50";
  if (categoryLower.includes("arts")) return "hover:bg-pink-50";
  
  return "hover:bg-gray-50";
};

// Get stats text based on category
const getStatsText = (category) => {
  const categoryLower = category?.toLowerCase() || "";
  
  if (categoryLower.includes("engineering")) return "5000+ placed";
  if (categoryLower.includes("management")) return "3500+ placed";
  if (categoryLower.includes("medical")) return "2000+ placed";
  if (categoryLower.includes("law")) return "1200+ placed";
  if (categoryLower.includes("computer")) return "2800+ placed";
  if (categoryLower.includes("research")) return "800+ placed";
  if (categoryLower.includes("science")) return "3000+ students";
  if (categoryLower.includes("commerce")) return "2500+ placed";
  if (categoryLower.includes("arts")) return "1800+ students";
  
  return "1000+ students";
};

export default function Programs() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axiosInstance.get("/study-india-programs");
      console.log("Programs API Response:", response.data);
      
      if (response.data.success) {
        const allPrograms = response.data.data;
        
        // Fetch only 9 programs (first 9 from the API response)
        const firstNinePrograms = allPrograms.slice(0, 9);
        setPrograms(firstNinePrograms);
      } else {
        setError("Failed to fetch programs");
      }
    } catch (err) {
      console.error("Error fetching programs:", err);
      setError(err.response?.data?.message || "Failed to fetch programs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get course type from program title/category
  const getCourseType = (program) => {
    const title = program.title?.toLowerCase() || "";
    const category = program.category?.toLowerCase() || "";
    
    if (title.includes("b.tech") || title.includes("btech") || category.includes("engineering")) return "B.Tech / M.Tech";
    if (title.includes("mba") || title.includes("bba") || category.includes("management")) return "MBA / BBA";
    if (title.includes("mbbs") || title.includes("bds") || category.includes("medical")) return "MBBS / BDS";
    if (title.includes("llb") || title.includes("llm") || category.includes("law")) return "LLB / LLM";
    if (title.includes("bca") || title.includes("mca") || category.includes("computer")) return "BCA / MCA / B.Sc IT";
    if (title.includes("phd") || category.includes("research")) return "PhD Programs";
    if (title.includes("b.sc") || title.includes("m.sc") || category.includes("science")) return "B.Sc / M.Sc";
    if (title.includes("b.com") || title.includes("m.com") || category.includes("commerce")) return "B.Com / M.Com";
    if (title.includes("ba") || category.includes("arts")) return "BA / MA";
    
    return "Professional Program";
  };

  if (loading) {
    return (
      <section className="bg-[#f5f7fb] py-10 md:py-10 px-4 md:px-10">
        <div className="text-center mb-12 md:mb-14">
          <p className="text-[#c5a46d] text-xs md:text-sm tracking-widest font-semibold mb-2">
            EXPLORE PROGRAMS
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0b2a4a]">
            Popular <span className="text-[#c5a46d]">Programs</span>
          </h2>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c5a46d]"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-[#f5f7fb] py-10 md:py-10 px-4 md:px-10">
        <div className="text-center mb-12 md:mb-14">
          <p className="text-[#c5a46d] text-xs md:text-sm tracking-widest font-semibold mb-2">
            EXPLORE PROGRAMS
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0b2a4a]">
            Popular <span className="text-[#c5a46d]">Programs</span>
          </h2>
        </div>
        <div className="text-center py-12 bg-white rounded-xl max-w-2xl mx-auto">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={fetchPrograms}
            className="bg-[#c5a46d] text-white px-6 py-2 rounded-lg hover:bg-yellow-500 transition"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#f5f7fb] py-10 md:py-10 px-4 md:px-10">

      {/* Heading */}
      <div className="text-center mb-12 md:mb-14">
        <p className="text-[#c5a46d] text-xs md:text-sm tracking-widest font-semibold mb-2">
          EXPLORE PROGRAMS
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0b2a4a]">
          Popular <span className="text-[#c5a46d]">Programs</span>
        </h2>

        <p className="text-gray-500 mt-3 md:mt-4 max-w-2xl mx-auto text-sm md:text-base px-2">
          Explore programs that match your career goals across top universities.
        </p>
      </div>

      {/* Cards - Showing exactly 9 programs */}
      {programs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No programs available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
          {programs.map((program, i) => (
            <Link 
              key={program._id || i}
              to={`/program/${program._id}`}
              className="block"
            >
              <div
                className={`group p-6 rounded-2xl border border-gray-200 bg-white 
                transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${getHoverColor(program.category)}`}
              >
                {/* Top Row */}
                <div className="flex items-center justify-between mb-4">
                  {/* Icon - Different for each program */}
                  <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#fbf3e6] text-[#c5a46d] 
                  group-hover:scale-110 transition">
                    {getIconForCategory(program.category, program.title)}
                  </div>

                  {/* Arrow */}
                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 
                  group-hover:bg-[#c5a46d] group-hover:text-black transition">
                    <ArrowRight size={16} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-[#c5a46d]  min-h-[36px]">
                  {program.title?.length > 40 ? program.title.slice(0, 40) + "..." : program.title}
                </h3>

                {/* Courses/Program Type */}
                <p className="text-sm text-gray-500 mb-3">
                  {getCourseType(program)}
                </p>

                {/* Stats Badge */}
                <span className="inline-block text-xs font-semibold bg-[#faf3e3] text-[#c5a46d] px-3 py-1 rounded-full">
                  {getStatsText(program.category || program.title)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* View All Courses Button - Redirects to study-in-india page */}
      <div className="text-center mt-10">
        <Link to="/study-in-india">
          <button className="border border-[#c5a46d] text-[#c5a46d] px-6 py-2.5 rounded-lg font-medium 
          hover:bg-yellow-400 hover:text-black transition">
            View All Courses →
          </button>
        </Link>
      </div>

    </section>
  );
}