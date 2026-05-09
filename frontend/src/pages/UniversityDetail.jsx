// import React, { useState, useEffect } from 'react';
// import { Helmet } from "react-helmet-async";
// import { useParams, useNavigate } from 'react-router-dom';
// import { ArrowLeft, Globe, MapPin, Building2 } from 'lucide-react';

// const BACKEND_URL = "https://api.eduglobe.ae";
// const API_URL = "https://api.eduglobe.ae/api/associates";

// export default function UniversityDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [university, setUniversity] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchUniversityDetails();
//   }, [id]);

//   const fetchUniversityDetails = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await fetch(`${API_URL}/${id}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       setUniversity(data.data);

//     } catch (error) {
//       console.error("Error fetching university details:", error);
//       setError("Failed to load university details");

//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDownload = async (doc) => {
//     const fileName = typeof doc === 'object' ? doc.file : doc;
//     const docName = typeof doc === 'object' ? doc.name : doc;

//     const url = `${BACKEND_URL}/uploads/${fileName}`;

//     try {
//       const response = await fetch(url);

//       if (!response.ok) {
//         throw new Error('Download failed');
//       }

//       const blob = await response.blob();

//       const blobUrl = window.URL.createObjectURL(blob);

//       const link = document.createElement('a');

//       link.href = blobUrl;
//       link.download = docName || fileName;

//       document.body.appendChild(link);
//       link.click();

//       document.body.removeChild(link);

//       window.URL.revokeObjectURL(blobUrl);

//     } catch (err) {
//       window.open(url, '_blank');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c5a46d]"></div>
//       </div>
//     );
//   }

//   if (error || !university) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center px-4">

//         <Helmet>
//           <title>University Not Found | EduGlobe</title>
//         </Helmet>

//         <div className="text-center">
//           <div className="text-red-600 text-5xl mb-4">
//             ⚠️
//           </div>

//           <p className="text-gray-800 mb-4">
//             {error || "University not found"}
//           </p>

//           <button
//             onClick={() => navigate(-1)}
//             className="bg-[#c5a46d] text-white px-6 py-2 rounded-lg hover:bg-[#b8945d] transition"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Helmet>

//         {/* TITLE */}
//         <title>
//           {university.name} | Partner University | Eduorbix
//         </title>

//         {/* DESCRIPTION */}
//         <meta
//           name="description"
//           content={
//             university.details?.[0]?.description?.slice(0, 160) ||
//             `${university.name} partner university details, admissions, programs, documents and study opportunities with EduGlobe.`
//           }
//         />

//         {/* KEYWORDS */}
//         <meta
//           name="keywords"
//           content={`${university.name}, study abroad university, partner university, university admission, EduGlobe`}
//         />

//         {/* AUTHOR */}
//         <meta
//           name="author"
//           content="EduGlobe"
//         />

//         {/* ROBOTS */}
//         <meta
//           name="robots"
//           content="index, follow"
//         />

//         {/* CANONICAL */}
//         <link
//           rel="canonical"
//           href={`https://eduglobe.ae/associates/${id}`}
//         />

//         {/* OG */}
//         <meta
//           property="og:title"
//           content={`${university.name} | EduGlobe`}
//         />

//         <meta
//           property="og:description"
//           content={
//             university.details?.[0]?.description?.slice(0, 160) ||
//             `${university.name} university profile and admission details.`
//           }
//         />

//         <meta
//           property="og:url"
//           content={`https://eduglobe.ae/associates/${id}`}
//         />

//         <meta
//           property="og:type"
//           content="website"
//         />

//         <meta
//           property="og:image"
//           content={
//             university.logo
//               ? `${BACKEND_URL}/uploads/${university.logo}`
//               : "https://eduglobe.ae/favicon.png"
//           }
//         />

//         {/* TWITTER */}
//         <meta
//           name="twitter:card"
//           content="summary_large_image"
//         />

//         <meta
//           name="twitter:title"
//           content={`${university.name} | EduGlobe`}
//         />

//         <meta
//           name="twitter:description"
//           content={
//             university.details?.[0]?.description?.slice(0, 160) ||
//             `${university.name} admission and university details with EduGlobe.`
//           }
//         />

//         <meta
//           name="twitter:image"
//           content={
//             university.logo
//               ? `${BACKEND_URL}/uploads/${university.logo}`
//               : "https://eduglobe.ae/favicon.png"
//           }
//         />

//       </Helmet>

//       <div className="min-h-screen bg-white">

//         {/* Header */}
//         <div className="bg-[#0d2f52] text-white w-full">

//           <div className="w-full px-6 py-4 flex items-center gap-3">

//             <button
//               onClick={() => navigate(-1)}
//               className="p-2 hover:bg-white/10 rounded-lg transition flex-shrink-0"
//             >
//               <ArrowLeft size={20} />
//             </button>

//             <h1 className="text-lg font-semibold truncate">
//               {university.name}
//             </h1>

//           </div>

//         </div>

//         {/* Main Content */}
//         <div className="w-full">

//           {/* University Info */}
//           <div className="w-full px-6 md:px-12 lg:px-20 py-10 flex flex-row gap-6 items-start">

//             {university.logo && (
//               <img
//                 src={`${BACKEND_URL}/uploads/${university.logo}`}
//                 alt={university.name}
//                 className="w-24 h-24 object-contain border border-gray-200 rounded-xl p-2 flex-shrink-0"
//                 onError={(e) => {
//                   e.target.src =
//                     "https://via.placeholder.com/96?text=Logo";
//                 }}
//               />
//             )}

//             <div className="flex-1 space-y-3">

//               <h2 className="text-3xl font-bold text-gray-900">
//                 {university.name}
//               </h2>

//               <div className="flex flex-wrap gap-5 text-sm text-gray-500">

//                 {university.location && (
//                   <span className="flex items-center gap-1.5">
//                     <MapPin
//                       size={15}
//                       className="text-[#c5a46d]"
//                     />
//                     {university.location}
//                   </span>
//                 )}

//                 {university.type && (
//                   <span className="flex items-center gap-1.5">
//                     <Building2
//                       size={15}
//                       className="text-[#c5a46d]"
//                     />
//                     {university.type}
//                   </span>
//                 )}

//                 {university.website && (
//                   <a
//                     href={university.website}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="flex items-center gap-1.5 text-[#0d2f52] hover:text-[#c5a46d] hover:underline transition"
//                   >
//                     <Globe size={15} />
//                     Visit Website
//                   </a>
//                 )}

//               </div>

//             </div>

//           </div>

//           {/* Dynamic Detail Sections */}
//           {university.details?.filter(d => d.heading).map((detail, i) => (
//             <React.Fragment key={i}>

//               <hr className="border-t border-gray-200 mx-6 md:mx-12 lg:mx-20" />

//               <div className="w-full px-6 md:px-12 lg:px-20 py-10">

//                 <h3 className="text-xl font-bold text-[#0d2f52] mb-4">
//                   {detail.heading}
//                 </h3>

//                 <p className="text-gray-600 leading-relaxed whitespace-pre-line text-base">
//                   {detail.description}
//                 </p>

//               </div>

//             </React.Fragment>
//           ))}

//           {/* Important Files */}
//           {university.documents?.length > 0 && (
//             <>
//               <hr className="border-t border-gray-200 mx-6 md:mx-12 lg:mx-20" />

//               <div className="w-full px-6 md:px-12 lg:px-20 py-10">

//                 <h3 className="text-xl font-bold text-[#0d2f52] mb-6 uppercase tracking-widest">
//                   Important Files
//                 </h3>

//                 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-0 border border-gray-200 rounded-xl overflow-hidden w-full">

//                   {university.documents.map((doc, i) => {

//                     const docName =
//                       typeof doc === 'object'
//                         ? doc.name
//                         : doc;

//                     return (
//                       <button
//                         key={i}
//                         onClick={() => handleDownload(doc)}
//                         className="flex items-center justify-between gap-3 bg-[#0d2f52] text-white px-5 py-5 hover:bg-[#c5a46d] active:bg-[#b8945d] transition text-left border-r border-b border-[#1a3a5c] last:border-r-0"
//                       >

//                         <span className="text-sm font-semibold leading-snug flex-1">
//                           {docName}
//                         </span>

//                         <div className="flex-shrink-0">

//                           <svg
//                             width="36"
//                             height="36"
//                             viewBox="0 0 38 38"
//                             fill="none"
//                           >

//                             <rect
//                               x="4"
//                               y="2"
//                               width="22"
//                               height="28"
//                               rx="3"
//                               fill="white"
//                               opacity=".2"
//                             />

//                             <rect
//                               x="4"
//                               y="2"
//                               width="22"
//                               height="28"
//                               rx="3"
//                               stroke="white"
//                               strokeWidth="1.2"
//                             />

//                             <path
//                               d="M9 12h12M9 16h12M9 20h8"
//                               stroke="white"
//                               strokeWidth="1.2"
//                               strokeLinecap="round"
//                             />

//                             <rect
//                               x="20"
//                               y="20"
//                               width="14"
//                               height="14"
//                               rx="3"
//                               fill="white"
//                               opacity=".25"
//                             />

//                             <path
//                               d="M27 24v5M24.5 26.5L27 29l2.5-2.5"
//                               stroke="white"
//                               strokeWidth="1.6"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             />

//                           </svg>

//                         </div>

//                       </button>
//                     );
//                   })}

//                 </div>

//               </div>
//             </>
//           )}

//         </div>

//       </div>
//     </>
//   );
// }



import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe, MapPin, Building2, FileText, Download, Eye } from 'lucide-react';

const BACKEND_URL = "https://api.eduglobe.ae";
const API_URL = "https://api.eduglobe.ae/api/associates";

export default function UniversityDetail2() {
  const { name } = useParams();
  const navigate = useNavigate();

  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to create slug from name for matching
  const createSlug = (str) => {
    if (!str) return "";
    return str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  useEffect(() => {
    if (name) {
      fetchUniversityByName();
    }
  }, [name]);

  const fetchUniversityByName = async () => {
    try {
      setLoading(true);
      setError(null);

      // First fetch all universities
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const allUniversities = data.data || [];

      // Find university where slug matches the name parameter
      const foundUniversity = allUniversities.find(uni => {
        const uniSlug = createSlug(uni.name);
        return uniSlug === name;
      });

      if (foundUniversity) {
        setUniversity(foundUniversity);
      } else {
        // If not found by slug, try direct API call with name
        try {
          const directResponse = await fetch(`${API_URL}/name/${name}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (directResponse.ok) {
            const directData = await directResponse.json();
            if (directData.data) {
              setUniversity(directData.data);
            } else {
              setError("University not found");
            }
          } else {
            setError("University not found");
          }
        } catch (err) {
          console.error("Error fetching by name:", err);
          setError("University not found");
        }
      }
    } catch (error) {
      console.error("Error fetching university details:", error);
      setError("Failed to load university details");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (doc) => {
    const fileName = typeof doc === 'object' ? doc.file : doc;
    const docName = typeof doc === 'object' ? doc.name : doc;

    const url = `${BACKEND_URL}/uploads/${fileName}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = blobUrl;
      link.download = docName || fileName;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

    } catch (err) {
      window.open(url, '_blank');
    }
  };

  const handlePreview = (doc) => {
    const fileName = typeof doc === 'object' ? doc.file : doc;
    const url = `${BACKEND_URL}/uploads/${fileName}`;
    window.open(url, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c5a46d]"></div>
      </div>
    );
  }

  if (error || !university) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <Helmet>
          <title>University Not Found | EduGlobe</title>
        </Helmet>

        <div className="text-center">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <p className="text-gray-800 mb-4">{error || "University not found"}</p>
          <button
            onClick={() => navigate('/associates')}
            className="bg-[#c5a46d] text-white px-6 py-2 rounded-lg hover:bg-[#b8945d] transition"
          >
            Back to Universities
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        {/* TITLE */}
        <title>{university.name} | Partner University | Eduorbix</title>

        {/* DESCRIPTION */}
        <meta
          name="description"
          content={
            university.details?.[0]?.description?.slice(0, 160) ||
            `${university.name} partner university details, admissions, programs, documents and study opportunities with EduGlobe.`
          }
        />

        {/* KEYWORDS */}
        <meta
          name="keywords"
          content={`${university.name}, study abroad university, partner university, university admission, EduGlobe`}
        />

        {/* AUTHOR */}
        <meta name="author" content="EduGlobe" />

        {/* ROBOTS */}
        <meta name="robots" content="index, follow" />

        {/* CANONICAL */}
        <link
          rel="canonical"
          href={`https://eduglobe.ae/associates/${createSlug(university.name)}`}
        />

        {/* OG */}
        <meta property="og:title" content={`${university.name} | EduGlobe`} />
        <meta
          property="og:description"
          content={
            university.details?.[0]?.description?.slice(0, 160) ||
            `${university.name} university profile and admission details.`
          }
        />
        <meta
          property="og:url"
          content={`https://eduglobe.ae/associates/${createSlug(university.name)}`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={
            university.logo
              ? `${BACKEND_URL}/uploads/${university.logo}`
              : "https://eduglobe.ae/favicon.png"
          }
        />

        {/* TWITTER */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${university.name} | EduGlobe`} />
        <meta
          name="twitter:description"
          content={
            university.details?.[0]?.description?.slice(0, 160) ||
            `${university.name} admission and university details with EduGlobe.`
          }
        />
        <meta
          name="twitter:image"
          content={
            university.logo
              ? `${BACKEND_URL}/uploads/${university.logo}`
              : "https://eduglobe.ae/favicon.png"
          }
        />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Header Bar - Using UniversityDetail2 color */}
        <div className="bg-[#0d2f52] text-white w-full">
          <div className="w-full px-6 py-4 flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-white/10 rounded-lg transition flex-shrink-0"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-semibold truncate">{university.name}</h1>
          </div>
        </div>

        {/* Full width single page — no cards, just sections with dividers */}
        <div className="w-full">

          {/* University Info */}
          <div className="w-full px-6 md:px-12 lg:px-20 py-10 flex flex-row gap-6 items-start">
            {university.logo && (
              <img
                src={`${BACKEND_URL}/uploads/${university.logo}`}
                alt={university.name}
                className="w-24 h-24 object-contain border border-gray-200 rounded-xl p-2 flex-shrink-0"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/96?text=Logo";
                }}
              />
            )}
            <div className="flex-1 space-y-3">
              <h2 className="text-3xl font-bold text-gray-900">{university.name}</h2>
              <div className="flex flex-wrap gap-5 text-sm text-gray-500">
                {university.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin size={15} className="text-[#c5a46d]" />
                    {university.location}
                  </span>
                )}
                {university.type && (
                  <span className="flex items-center gap-1.5">
                    <Building2 size={15} className="text-[#c5a46d]" />
                    {university.type}
                  </span>
                )}
                {university.website && (
                  <a 
                    href={university.website} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-blue-600 hover:underline"
                  >
                    <Globe size={15} />
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Details Sections - Using UniversityDetail2 colors */}
          {university.details?.filter((d) => d.heading && d.description).map((detail, i) => (
            <React.Fragment key={i}>
              <hr className="border-t border-gray-200 mx-6 md:mx-12 lg:mx-20" />
              <div className="w-full px-6 md:px-12 lg:px-20 py-10">
                <div className="border-l-4 border-[#c5a46d] pl-4 mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0d2f52]">
                    {detail.heading}
                  </h3>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {detail.description}
                  </p>
                </div>
              </div>
            </React.Fragment>
          ))}

          {/* Documents Section */}
          {university.documents?.length > 0 && (
            <>
              <hr className="border-t border-gray-200 mx-6 md:mx-12 lg:mx-20" />
              <div className="w-full px-6 md:px-12 lg:px-20 py-10">
                <div className="border-l-4 border-[#c5a46d] pl-4 mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0d2f52]">
                    Important Documents
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Download or preview important files related to {university.name}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {university.documents.map((doc, i) => {
                    const docName = typeof doc === "object" ? doc.name : doc;
                    const docFile = typeof doc === "object" ? doc.file : doc;

                    return (
                      <div
                        key={i}
                        className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 group"
                      >
                        <div className="flex items-start gap-3">
                          {/* Document Icon */}
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-[#c5a46d]/10 rounded-lg flex items-center justify-center">
                              <FileText size={24} className="text-[#c5a46d]" />
                            </div>
                          </div>

                          {/* Document Info */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                              {docName}
                            </h4>
                            
                            <div className="flex gap-2">
                              <button
                                onClick={() => handlePreview(doc)}
                                className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                              >
                                <Eye size={14} />
                                Preview
                              </button>
                              <button
                                onClick={() => handleDownload(doc)}
                                className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-[#0d2f52] text-white rounded-lg hover:bg-[#c5a46d] transition text-sm font-medium"
                              >
                                <Download size={14} />
                                Download
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* No Documents Message */}
          {(!university.documents || university.documents.length === 0) && (
            <>
              <hr className="border-t border-gray-200 mx-6 md:mx-12 lg:mx-20" />
              <div className="w-full px-6 md:px-12 lg:px-20 py-10">
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                  <FileText size={48} className="text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">No documents available for this university</p>
                </div>
              </div>
            </>
          )}

          {/* Back Button */}
          <hr className="border-t border-gray-200 mx-6 md:mx-12 lg:mx-20" />
          <div className="w-full px-6 md:px-12 lg:px-20 py-10 text-center">
            <button
              onClick={() => navigate("/associates")}
              className="inline-flex items-center gap-2 text-[#0d2f52] hover:text-[#c5a46d] font-semibold transition"
            >
              ← Back to All Universities
            </button>
          </div>
        </div>
      </div>
    </>
  );
}