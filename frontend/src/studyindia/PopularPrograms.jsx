// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function PopularPrograms() {
//   const navigate = useNavigate();
//   const programs = [
//     {
//       title: "Engineering (B.Tech / M.Tech)",
//       desc: "Top engineering colleges across India with placement support.",
//       students: "5000+ students placed →"
//     },
//     {
//       title: "Management (MBA / BBA)",
//       desc: "Premier business schools with industry connections.",
//       students: "3500+ students placed →"
//     },
//     {
//       title: "Medical & Allied Health (MBBS)",
//       desc: "Government and private medical colleges.",
//       students: "2000+ students placed →"
//     },
//     {
//       title: "Law (LLB / LLM)",
//       desc: "National law universities and top law colleges.",
//       students: "1200+ students placed →"
//     },
//     {
//       title: "Computer Science & IT",
//       desc: "BCA, MCA, B.Sc CS and related programs.",
//       students: "2800+ students placed →"
//     },
//     {
//       title: "Commerce (B.Com / M.Com)",
//       desc: "Top commerce programs with CA/CMA pathways.",
//       students: "1500+ students placed →"
//     },
//     {
//       title: "Arts & Humanities",
//       desc: "BA, MA programs in leading universities.",
//       students: "900+ students placed →"
//     },
//     {
//       title: "PhD Programs",
//       desc: "Doctoral research programs across disciplines.",
//       students: "800+ students placed →"
//     },
//     {
//       title: "Hotel Management",
//       desc: "Top hospitality schools in India.",
//       students: "600+ students placed →"
//     },
//     {
//       title: "Pharmacy",
//       desc: "B.Pharm and M.Pharm programs.",
//       students: "700+ students placed →"
//     },
//     {
//       title: "Distance / Online Programs",
//       desc: "Flexible learning from recognized universities.",
//       students: "1000+ students placed →"
//     },
//     {
//       title: "Agriculture",
//       desc: "B.Sc and M.Sc agriculture programs.",
//       students: "400+ students placed →"
//     }
//   ];

//   return (
//     <section className="py-10 px-6 md:px-8 lg:px-12 bg-white">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//        <div className="text-center mb-12">
//   <h1 className="text-4xl md:text-4xl font-bold mb-2">
//     <span className="text-[#1e2a38]"># Popular</span>{' '}
//     <span className="text-[#c5a46d]">Programs</span>
//   </h1>
//   <div className="w-24 h-1 bg-[#c5a46d] mx-auto rounded-full"></div>
// </div>
//         {/* Programs Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
//           {programs.map((program, index) => (
//         <div 
//   key={index}
//   onClick={() => {
//     if (program.title.includes("Engineering")) {
//       navigate("/program/engineering");
//     }
//   }}
//   className="cursor-pointer bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-[#c5a46d] group"
// >
//               <h3 className="text-lg font-bold group-hover:text-[#b3925a] mb-2  transition-colors">
//                 {program.title}
//               </h3>
//               <p className="text-gray-600 text-sm mb-3 leading-relaxed">{program.desc}</p>
//               <p className="text-[#c5a46d] font-medium text-sm hover:underline cursor-pointer inline-block">
//                 {program.students}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function PopularPrograms() {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch programs from API
  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/study-india-programs");
      if (response.data.success) {
        setPrograms(response.data.data);
      } else {
        setError("Failed to fetch programs");
      }
    } catch (err) {
      console.error("Error fetching programs:", err);
      setError(err.response?.data?.message || "Failed to fetch programs");
    } finally {
      setLoading(false);
    }
  };

  const handleProgramClick = (programId) => {
    navigate(`/program/${programId}`);
  };

  // Helper function to truncate text
  const truncateText = (text, maxLength = 100) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  if (loading) {
    return (
      <section className="py-10 px-6 md:px-8 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-4xl font-bold mb-2">
              <span className="text-[#1e2a38]"># Popular</span>{' '}
              <span className="text-[#c5a46d]">Programs</span>
            </h1>
            <div className="w-24 h-1 bg-[#c5a46d] mx-auto rounded-full"></div>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c5a46d]"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-10 px-6 md:px-8 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-4xl font-bold mb-2">
              <span className="text-[#1e2a38]"># Popular</span>{' '}
              <span className="text-[#c5a46d]">Programs</span>
            </h1>
            <div className="w-24 h-1 bg-[#c5a46d] mx-auto rounded-full"></div>
          </div>
          <div className="text-red-500">
            <p>{error}</p>
            <button 
              onClick={fetchPrograms}
              className="mt-4 px-4 py-2 bg-[#c5a46d] text-white rounded-md hover:bg-[#b3925a] transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 px-6 md:px-8 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-4xl font-bold mb-2">
            <span className="text-[#1e2a38]"># Popular</span>{' '}
            <span className="text-[#c5a46d]">Programs</span>
          </h1>
          <div className="w-24 h-1 bg-[#c5a46d] mx-auto rounded-full"></div>
        </div>

        {/* Programs Grid */}
        {programs.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <p>No programs available at the moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => (
              <div 
                key={program._id}
                onClick={() => handleProgramClick(program._id)}
                className="cursor-pointer bg-white border border-gray-200 rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:border-[#c5a46d] group flex flex-col h-full"
              >
                {/* Title */}
                <h3 className="text-xl font-bold group-hover:text-[#c5a46d] mb-3 transition-colors line-clamp-2">
                  {program.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {truncateText(program.description, 120)}
                </p>
                
                {/* Footer with fee and learn more */}
                <div className="mt-auto pt-3 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-[#c5a46d] font-medium text-sm hover:underline inline-flex items-center gap-1">
                      Learn more
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    {program.fee && (
                      <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded">
                        {program.fee}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}