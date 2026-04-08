// import React from "react";
// import { MapPin } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const universities = [
//   {
//     country: "IN",
//     rank: "Top 10",
//     name: "IIT Delhi",
//     location: "New Delhi, India",
//     type: "Public",
//     tags: ["Engineering", "Science", "Management"],
//   },
//   {
//     country: "IN",
//     rank: "Top 20",
//     name: "BITS Pilani",
//     location: "Rajasthan, India",
//     type: "Private",
//     tags: ["Engineering", "Science", "Pharmacy"],
//   },
//   {
//     country: "IN",
//     rank: "Top 15",
//     name: "VIT Vellore",
//     location: "Tamil Nadu, India",
//     type: "Private",
//     tags: ["Engineering", "Management", "Law"],
//   },
//   {
//     country: "GB",
//     rank: "Top 5 Global",
//     name: "University of Oxford",
//     location: "Oxford, UK",
//     type: "Public",
//     tags: ["All Disciplines"],
//   },
//   {
//     country: "CA",
//     rank: "Top 25 Global",
//     name: "University of Toronto",
//     location: "Toronto, Canada",
//     type: "Public",
//     tags: ["Engineering", "Business", "Arts"],
//   },
//   {
//     country: "US",
//     rank: "Top 3 Global",
//     name: "MIT",
//     location: "Massachusetts, USA",
//     type: "Private",
//     tags: ["Engineering", "Science", "Business"],
//   },
//   {
//     country: "AU",
//     rank: "Top 35 Global",
//     name: "University of Melbourne",
//     location: "Melbourne, Australia",
//     type: "Public",
//     tags: ["Business", "Engineering", "Arts"],
//   },
//   {
//     country: "DE",
//     rank: "Top 50 Global",
//     name: "TU Munich",
//     location: "Munich, Germany",
//     type: "Public",
//     tags: ["Engineering", "Science", "IT"],
//   },
// ];

// export default function Universitylist() {
//   const navigate = useNavigate();

//   // Separate data
//   const indianUniversities = universities.filter((u) => u.country === "IN");
//   const abroadUniversities = universities.filter((u) => u.country !== "IN");

//   const renderCards = (data, applyRoute) => (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//       {data.map((uni, index) => (
//         <div
//           key={index}
//           className="group bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition relative"
//         >
//           {/* Top Row */}
//           <div className="flex justify-between items-center mb-3">
//             <span className="text-sm font-semibold text-gray-700">
//               {uni.country}
//             </span>
//             <span className="text-xs text-[#c5a46d] font-medium">
//               ⭐ {uni.rank}
//             </span>
//           </div>

//           {/* Name */}
//           <h3 className="text-md font-semibold text-gray-900 mb-1">
//             {uni.name}
//           </h3>

//           {/* Location */}
//           <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
//             <MapPin size={14} />
//             <span>{uni.location}</span>
//           </div>

//           {/* Type */}
//           <span className="inline-block text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md mb-3">
//             {uni.type}
//           </span>

//           {/* Tags */}
//           <div className="flex flex-wrap gap-2 mb-6">
//             {uni.tags.map((tag, i) => (
//               <span
//                 key={i}
//                 className="text-xs bg-[#fbf3e6] text-yellow-700 px-2 py-1 rounded-full"
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>

//           {/* Apply Button */}
//           <button
//             onClick={() => navigate(applyRoute)}
//             className="absolute bottom-4 left-5 text-sm text-[#c5a46d] font-medium opacity-0 group-hover:opacity-100 transition"
//           >
//             Apply Now →
//           </button>
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <section className="bg-[#f5f5f5] py-12 px-6 md:px-12">
//       <div className="max-w-7xl mx-auto">

//         {/* 🇮🇳 Indian Universities */}
//         <h2 className="text-2xl font-bold mb-6">🇮🇳 Indian Universities</h2>
//         {renderCards(indianUniversities, "/apply-india")}

//         {/* 🌍 Abroad Universities */}
//         <h2 className="text-2xl font-bold mt-12 mb-6">🌍 Abroad Universities</h2>
//         {renderCards(abroadUniversities, "/apply-abroad")}

//         {/* Bottom Buttons */}
//         <div className="flex flex-col md:flex-row gap-4 justify-center mt-12">
//           <button
//             onClick={() => navigate("/apply-india")}
//             className="bg-green-600 text-white px-6 py-3 rounded-lg"
//           >
//             Apply for Indian Universities →
//           </button>

//           <button
//             onClick={() => navigate("/apply-abroad")}
//             className="bg-[#c5a46d] text-white px-6 py-3 rounded-lg"
//           >
//             Apply for Abroad Universities →
//           </button>
//         </div>

//       </div>
//     </section>
//   );
// }




import React, { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function Universitylist() {
  const navigate = useNavigate();
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch universities from API
  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/universities");
      if (response.data.success) {
        setUniversities(response.data.data);
      } else {
        setError("Failed to fetch universities");
      }
    } catch (err) {
      console.error("Error fetching universities:", err);
      setError(err.response?.data?.message || "Failed to fetch universities");
    } finally {
      setLoading(false);
    }
  };

  // Separate data based on category
  const indianUniversities = universities.filter((u) => u.category === "Indian");
  const abroadUniversities = universities.filter((u) => u.category === "Abroad");

  const renderCards = (data, type) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {data.map((uni) => (
        <div
          key={uni._id}
          className="group bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#c5a46d] relative flex flex-col h-full"
        >
          {/* Top Row */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-gray-700">
              {uni.country}
            </span>
            <span className="text-xs text-[#c5a46d] font-medium bg-[#fbf3e6] px-2 py-1 rounded-full">
              ⭐ {uni.rank}
            </span>
          </div>

          {/* Name */}
          <h3 className="text-md font-semibold text-gray-900 mb-1 line-clamp-2 min-h-[56px]">
            {uni.name}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
            <MapPin size={14} />
            <span className="truncate">{uni.location}</span>
          </div>

          {/* Type */}
          <span className="inline-block text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md mb-3 w-fit">
            {uni.type}
          </span>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6 min-h-[60px] items-start">
            {uni.tags && uni.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="text-xs font-medium bg-[#f4ede4] text-[#8a6d3b] px-3 py-1 rounded-full flex items-center justify-center whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
            {uni.tags && uni.tags.length > 3 && (
              <span className="text-xs font-medium text-gray-500 px-2 py-1 flex items-center">
                +{uni.tags.length - 3}
              </span>
            )}
          </div>

          {/* Apply Button */}
          <button
            onClick={() => {
              // Navigate based on university type
              if (type === "indian") {
                navigate("/study-in-india", { state: { selectedUniversity: uni.name } });
              } else {
                navigate("/study-abroad", { state: { selectedUniversity: uni.name } });
              }
            }}
            className="absolute bottom-4 left-5 text-sm text-[#c5a46d] font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 hover:translate-x-1"
          >
            Apply Now →
          </button>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <section className="bg-[#f5f5f5] py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c5a46d]"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="university" className="bg-[#f5f5f5] py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-red-500">
            <p className="mb-4">{error}</p>
            <button 
              onClick={fetchUniversities}
              className="px-4 py-2 bg-[#c5a46d] text-white rounded-md hover:bg-[#b3925a] transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#f5f5f5] py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-[#1e2a38]">Top</span>{' '}
            <span className="text-[#c5a46d]">Universities</span>
          </h2>
          <div className="w-24 h-1 bg-[#c5a46d] mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Discover the best universities in India and abroad for your academic journey
          </p>
        </div>

        {/* 🇮🇳 Indian Universities */}
        {indianUniversities.length > 0 && (
          <>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">🇮🇳</span>
              <h2 className="text-2xl font-bold text-gray-800">Indian Universities</h2>
              <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                {indianUniversities.length}
              </span>
            </div>
            {renderCards(indianUniversities, "indian")}
          </>
        )}

        {/* 🌍 Abroad Universities */}
        {abroadUniversities.length > 0 && (
          <>
            <div className="flex items-center gap-2 mt-12 mb-6">
              <span className="text-2xl">🌍</span>
              <h2 className="text-2xl font-bold text-gray-800">Abroad Universities</h2>
              <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                {abroadUniversities.length}
              </span>
            </div>
            {renderCards(abroadUniversities, "abroad")}
          </>
        )}

        {/* Empty State */}
        {universities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No universities found.</p>
          </div>
        )}

        {/* Bottom Buttons */}
        {(indianUniversities.length > 0 || abroadUniversities.length > 0) && (
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-12">
            {indianUniversities.length > 0 && (
              <button
                onClick={() => navigate("/study-in-india")}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Explore Indian Universities →
              </button>
            )}
            {abroadUniversities.length > 0 && (
              <button
                onClick={() => navigate("/study-abroad")}
                className="bg-[#c5a46d] text-white px-6 py-3 rounded-lg hover:bg-[#b3925a] transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Explore Abroad Universities →
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}