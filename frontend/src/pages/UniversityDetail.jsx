import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe, MapPin, Building2 } from 'lucide-react';

const BACKEND_URL = "https://api.eduglobe.ae";
const API_URL = "https://api.eduglobe.ae/api/associates";

export default function UniversityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUniversityDetails();
  }, [id]);

  const fetchUniversityDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUniversity(data.data);
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
      if (!response.ok) throw new Error('Download failed');
      
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
      // Fallback: open in new tab
      window.open(url, '_blank');
    }
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
        <div className="text-center">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <p className="text-gray-800 mb-4">{error || "University not found"}</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-[#c5a46d] text-white px-6 py-2 rounded-lg hover:bg-[#b8945d] transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <div className="bg-[#0d2f52] text-white w-full">
        <div className="w-full px-6 py-4 flex items-center gap-3">
          <button onClick={() => navigate(-1)}
            className="p-2 hover:bg-white/10 rounded-lg transition flex-shrink-0">
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
                <a href={university.website} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 text-[#0d2f52] hover:text-[#c5a46d] hover:underline transition">
                  <Globe size={15} />
                  Visit Website
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Detail Sections */}
        {university.details?.filter(d => d.heading).map((detail, i) => (
          <React.Fragment key={i}>
            <hr className="border-t border-gray-200 mx-6 md:mx-12 lg:mx-20" />
            <div className="w-full px-6 md:px-12 lg:px-20 py-10">
              <h3 className="text-xl font-bold text-[#0d2f52] mb-4">
                {detail.heading}
              </h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-base">
                {detail.description}
              </p>
            </div>
          </React.Fragment>
        ))}

        {/* Important Files */}
        {university.documents?.length > 0 && (
          <>
            <hr className="border-t border-gray-200 mx-6 md:mx-12 lg:mx-20" />
            <div className="w-full px-6 md:px-12 lg:px-20 py-10">
              <h3 className="text-xl font-bold text-[#0d2f52] mb-6 uppercase tracking-widest">
                Important Files
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-0 border border-gray-200 rounded-xl overflow-hidden w-full">
                {university.documents.map((doc, i) => {
                  const docName = typeof doc === 'object' ? doc.name : doc;
                  return (
                    <button
                      key={i}
                      onClick={() => handleDownload(doc)}
                      className="flex items-center justify-between gap-3 bg-[#0d2f52] text-white px-5 py-5
                        hover:bg-[#c5a46d] active:bg-[#b8945d] transition text-left
                        border-r border-b border-[#1a3a5c] last:border-r-0"
                    >
                      <span className="text-sm font-semibold leading-snug flex-1">{docName}</span>
                      <div className="flex-shrink-0">
                        <svg width="36" height="36" viewBox="0 0 38 38" fill="none">
                          <rect x="4" y="2" width="22" height="28" rx="3"
                            fill="white" opacity=".2"/>
                          <rect x="4" y="2" width="22" height="28" rx="3"
                            stroke="white" strokeWidth="1.2"/>
                          <path d="M9 12h12M9 16h12M9 20h8"
                            stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
                          <rect x="20" y="20" width="14" height="14" rx="3" fill="white" opacity=".25"/>
                          <path d="M27 24v5M24.5 26.5L27 29l2.5-2.5"
                            stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}