// import React from "react";
// import { useNavigate } from "react-router-dom";
// import UKHero from "./UKHero";

// export default function StudyUK() {
//   const navigate = useNavigate();

//   return (
//     <>
//       {/* Hero Section */}
//       <UKHero />

//       {/* Main Content */}
//       <section className="py-10 px-6 md:px-8 lg:px-12 bg-[#f0f0f0] min-h-screen">
//         <div className="max-w-4xl mx-auto">

//           {/* Why Study Card */}
//           <div className="bg-white rounded-xl shadow-md p-6 mb-6">
//             <h1 className="text-2xl font-bold text-[#1e2a38] mb-2">
//               Why Study in United Kingdom?
//             </h1>
//             <div className="w-12 h-0.5 bg-[#c5a46d] mb-3"></div>
//             <p className="text-gray-700 leading-relaxed">
//               The UK offers globally recognized degrees with shorter course duration.
//               Home to Oxford, Cambridge, and world-class research institutions,
//               it's a top destination for Indian students seeking quality education.
//             </p>
//           </div>

//           {/* Cost + Intake */}
//           <div className="grid md:grid-cols-2 gap-6 mb-6">
            
//             <div className="bg-white rounded-xl shadow-md p-6">
//               <h2 className="text-lg font-bold text-[#1e2a38] mb-2">
//                 Cost of Living
//               </h2>
//               <div className="w-12 h-0.5 bg-[#c5a46d] mb-3"></div>
//               <p className="text-gray-800 text-lg">
//                 £1,000 – £1,500 per month
//               </p>
//             </div>

//             <div className="bg-white rounded-xl shadow-md p-6">
//               <h2 className="text-lg font-bold text-[#1e2a38] mb-2">
//                 Intakes
//               </h2>
//               <div className="w-12 h-0.5 bg-[#c5a46d] mb-3"></div>
//               <p className="text-gray-800">
//                 September (Main), January (Limited)
//               </p>
//             </div>

//           </div>

//           {/* Universities */}
//           <div className="bg-white rounded-xl shadow-md p-6 mb-6">
//             <h2 className="text-xl font-bold text-[#1e2a38] mb-2">
//               Top Universities
//             </h2>
//             <div className="w-12 h-0.5 bg-[#c5a46d] mb-4"></div>

//             <div className="grid md:grid-cols-2 gap-4">
              
//               <div className="space-y-2">
//                 <p className="bg-gray-200 px-3 py-2 rounded-md">• University of Oxford</p>
//                 <p className="bg-gray-200 px-3 py-2 rounded-md">• Imperial College London</p>
//                 <p className="bg-gray-200 px-3 py-2 rounded-md">• University of Manchester</p>
//               </div>

//               <div className="space-y-2">
//                 <p className="bg-gray-200 px-3 py-2 rounded-md">• University of Cambridge</p>
//                 <p className="bg-gray-200 px-3 py-2 rounded-md">• UCL</p>
//                 <p className="bg-gray-200 px-3 py-2 rounded-md">• University of Edinburgh</p>
//               </div>

//             </div>
//           </div>

//           {/* Visa + Scholarships */}
//           <div className="grid md:grid-cols-2 gap-6 mb-6">
            
//             <div className="bg-white rounded-xl shadow-md p-6">
//               <h2 className="text-lg font-bold text-[#1e2a38] mb-2">
//                 Visa Process
//               </h2>
//               <div className="w-12 h-0.5 bg-[#c5a46d] mb-3"></div>
//               <p className="text-gray-800">
//                 Tier 4 Student Visa with CAS letter from university
//               </p>
//             </div>

//             <div className="bg-white rounded-xl shadow-md p-6">
//               <h2 className="text-lg font-bold text-[#1e2a38] mb-2">
//                 Scholarships
//               </h2>
//               <div className="w-12 h-0.5 bg-[#c5a46d] mb-3"></div>
//               <p className="text-gray-800">
//                 Chevening, GREAT Scholarships, Commonwealth Scholarships
//               </p>
//             </div>

//           </div>

//           {/* Apply Button */}
//           <div className="text-center mt-8">
//             <button
//               onClick={() => navigate("/apply")}
//               className="px-10 py-3 bg-[#c5a46d] text-white font-semibold rounded-md hover:bg-[#b3925a] transition-all duration-300 shadow-md"
//             >
//               Apply Now
//             </button>
//           </div>

//           {/* Bottom Line */}
//           <div className="mt-8 flex justify-center">
//             <div className="w-16 h-0.5 bg-[#c5a46d]"></div>
//           </div>

//         </div>
//       </section>
//     </>
//   );
// }


import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function StudyAbroadDetails() {
  const navigate = useNavigate();
  const { country } = useParams(); // Get country from URL params
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDestinationDetails();
  }, [country]);

  const fetchDestinationDetails = async () => {
    try {
      setLoading(true);
      
      // First, get all destinations
      const response = await axiosInstance.get("/study-abroad");
      const destinations = response.data;
      
      // Find the destination matching the country (case-insensitive)
      const foundDestination = destinations.find(
        dest => dest.country.toLowerCase() === country.toLowerCase()
      );
      
      if (foundDestination) {
        setDestination(foundDestination);
        setError(null);
      } else {
        setError("Destination not found");
      }
    } catch (err) {
      console.error("Error fetching destination details:", err);
      setError("Failed to load destination details");
    } finally {
      setLoading(false);
    }
  };

  // Alternative: Fetch by ID if you have the ID stored
  // const fetchDestinationById = async () => {
  //   const id = sessionStorage.getItem("selectedDestinationId");
  //   if (id) {
  //     const response = await axiosInstance.get(`/study-abroad/${id}`);
  //     setDestination(response.data);
  //   }
  // };

  if (loading) {
    return (
      <section className="py-10 px-6 md:px-8 lg:px-12 bg-[#f0f0f0] min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#c5a46d] border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading destination details...</p>
        </div>
      </section>
    );
  }

  if (error || !destination) {
    return (
      <section className="py-10 px-6 md:px-8 lg:px-12 bg-[#f0f0f0] min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-red-600">{error || "Destination not found"}</p>
          <button 
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-[#c5a46d] text-white rounded-md"
          >
            Go Back Home
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero Section - You can create a dynamic Hero component */}
      <section className="relative bg-gradient-to-r from-[#1e2a38] to-[#2c3e50] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          {/* <span className="text-6xl mb-4 inline-block">{destination.flag || "🌍"}</span> */}
          <h1 className="text-5xl md:text-5xl font-bold mb-4">
            Study in {destination.country}
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            {destination.desc}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10 px-6 md:px-8 lg:px-12 bg-[#f0f0f0] min-h-screen">
        <div className="max-w-4xl mx-auto">

          {/* Why Study Card */}
          {destination.whyStudy && (
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h1 className="text-2xl font-bold text-[#1e2a38] mb-2">
                Why Study in {destination.country}?
              </h1>
              <div className="w-12 h-0.5 bg-[#c5a46d] mb-3"></div>
              <p className="text-gray-700 leading-relaxed">
                {destination.whyStudy}
              </p>
            </div>
          )}

          {/* Cost + Intake */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            
            {destination.cost && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg font-bold text-[#1e2a38] mb-2">
                  Cost of Living
                </h2>
                <div className="w-12 h-0.5 bg-[#c5a46d] mb-3"></div>
                <p className="text-gray-800 text-lg">
                  {destination.cost}
                </p>
              </div>
            )}

            {destination.intakes && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg font-bold text-[#1e2a38] mb-2">
                  Intakes
                </h2>
                <div className="w-12 h-0.5 bg-[#c5a46d] mb-3"></div>
                <p className="text-gray-800">
                  {destination.intakes}
                </p>
              </div>
            )}

          </div>

          {/* Universities */}
          {destination.universities && destination.universities.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-[#1e2a38] mb-2">
                Top Universities
              </h2>
              <div className="w-12 h-0.5 bg-[#c5a46d] mb-4"></div>

              <div className="grid md:grid-cols-2 gap-4">
                {destination.universities.map((university, index) => (
                  <div key={index} className="space-y-2">
                    <p className="bg-gray-200 px-3 py-2 rounded-md">
                      • {university}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Visa + Scholarships */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            
            {destination.visa && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg font-bold text-[#1e2a38] mb-2">
                  Visa Process
                </h2>
                <div className="w-12 h-0.5 bg-[#c5a46d] mb-3"></div>
                <p className="text-gray-800">
                  {destination.visa}
                </p>
              </div>
            )}

            {destination.scholarships && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg font-bold text-[#1e2a38] mb-2">
                  Scholarships
                </h2>
                <div className="w-12 h-0.5 bg-[#c5a46d] mb-3"></div>
                <p className="text-gray-800">
                  {destination.scholarships}
                </p>
              </div>
            )}

          </div>

          {/* Features Section (if any additional features) */}
          {destination.features && destination.features.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-[#1e2a38] mb-2">
                Key Highlights
              </h2>
              <div className="w-12 h-0.5 bg-[#c5a46d] mb-4"></div>
              <div className="grid md:grid-cols-2 gap-3">
                {destination.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-[#c5a46d] text-xl">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Apply Button */}
          <div className="text-center mt-8">
            
           <button
  onClick={() => navigate("/application-form")}
  className="px-10 py-3 bg-[#c5a46d] text-white font-semibold rounded-md hover:bg-[#b3925a] transition-all duration-300 shadow-md"
>
  Apply Now
</button>
          </div>

          {/* Bottom Line */}
          <div className="mt-8 flex justify-center">
            <div className="w-16 h-0.5 bg-[#c5a46d]"></div>
          </div>

        </div>
      </section>
    </>
  );
}