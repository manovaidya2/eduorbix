import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { 
  FaPlus, 
  FaTrash, 
  FaEdit, 
  FaEye,
  FaArrowLeft,
  FaSpinner,
  FaExclamationTriangle,
  FaGlobe,
  FaUniversity,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaPassport,
  FaGraduationCap,
  FaChartLine,
  FaFlag,
  FaBuilding,
  FaUsers,
  FaTrophy,
  FaHeart,
  FaStar,
  FaSearch
} from "react-icons/fa";

export default function AdminStudyAbroadDashboard() {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Fetch destinations on component mount
  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/study-abroad");
      setDestinations(response.data);
    } catch (error) {
      console.error("Error fetching destinations:", error);
      setError(error.response?.data?.message || "Failed to fetch destinations");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this destination?")) {
      try {
        await axiosInstance.delete(`/study-abroad/${id}`);
        await fetchDestinations();
      } catch (error) {
        console.error("Error deleting destination:", error);
        setError(error.response?.data?.message || "Failed to delete destination");
      }
    }
  };

  const handleView = (destination) => {
    setSelectedDestination(destination);
    setIsViewModalOpen(true);
  };

  // Filter destinations based on search
  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (dest.desc && dest.desc.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  // Calculate statistics
  const stats = {
    total: destinations.length,
    totalUniversities: destinations.reduce((sum, d) => sum + (d.universities?.length || 0), 0),
    totalFeatures: destinations.reduce((sum, d) => sum + (d.features?.length || 0), 0),
    countriesWithScholarships: destinations.filter(d => d.scholarships && d.scholarships.trim() !== "").length,
    avgUniversities: destinations.length > 0 ? 
      Math.round(destinations.reduce((sum, d) => sum + (d.universities?.length || 0), 0) / destinations.length) : 0
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A1A2F] to-[#0E1F38] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <button
                onClick={() => navigate(-1)}
                className="mb-2 flex items-center gap-2 text-[#FFD700] hover:text-white transition-colors"
              >
                <FaArrowLeft className="text-sm" />
                <span className="text-sm">Back</span>
              </button>
              <h1 className="text-2xl sm:text-3xl font-bold">Study Abroad Destinations</h1>
              <p className="text-gray-300 mt-1 text-sm">Manage international study destinations</p>
            </div>
            <button
              onClick={() => navigate("/admin-destinations")}
              className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#0A1A2F] px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
            >
              <FaPlus className="text-sm" />
              Add New Destination
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 rounded-lg p-4 flex items-center gap-3 shadow-sm">
            <FaExclamationTriangle className="text-red-500 text-lg flex-shrink-0" />
            <p className="text-red-700 flex-1 text-sm">{error}</p>
            <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700 flex-shrink-0">
              <FaTrash />
            </button>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border-l-4 border-[#FFD700] hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs sm:text-sm">Total Countries</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <FaGlobe className="text-2xl sm:text-3xl text-[#FFD700] opacity-50" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border-l-4 border-green-500 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs sm:text-sm">Total Universities</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-800">{stats.totalUniversities}</p>
              </div>
              <FaUniversity className="text-2xl sm:text-3xl text-green-500 opacity-50" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border-l-4 border-blue-500 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs sm:text-sm">Total Features</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-800">{stats.totalFeatures}</p>
              </div>
              <FaStar className="text-2xl sm:text-3xl text-blue-500 opacity-50" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border-l-4 border-purple-500 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs sm:text-sm">Avg. Universities</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-800">{stats.avgUniversities}</p>
              </div>
              <FaChartLine className="text-2xl sm:text-3xl text-purple-500 opacity-50" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border-l-4 border-orange-500 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs sm:text-sm">Scholarships Available</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-800">{stats.countriesWithScholarships}</p>
              </div>
              <FaTrophy className="text-2xl sm:text-3xl text-orange-500 opacity-50" />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by country or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20"
            />
          </div>
        </div>

        {/* Table View */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <FaSpinner className="animate-spin text-4xl text-[#FFD700]" />
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Description</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Universities</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Features</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Cost</th>
                      <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredDestinations.map((destination, index) => (
                      <tr key={destination._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-500">
                          {index + 1}
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{destination.flag || "🌍"}</span>
                            <span className="text-sm font-medium text-gray-900">{destination.country}</span>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 hidden md:table-cell">
                          <div className="text-sm text-gray-600 max-w-xs truncate">
                            {destination.desc || "N/A"}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs whitespace-nowrap">
                            {destination.universities?.length || 0} Universities
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 hidden lg:table-cell">
                          <div className="flex flex-wrap gap-1">
                            {destination.features?.slice(0, 2).map((feature, idx) => (
                              <span key={idx} className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded-full">
                                {feature.length > 15 ? feature.substring(0, 12) + '...' : feature}
                              </span>
                            ))}
                            {destination.features?.length > 2 && (
                              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                                +{destination.features.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 hidden lg:table-cell">
                          <div className="text-sm text-gray-600 truncate max-w-[150px]">
                            {destination.cost || "N/A"}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-1 sm:gap-2">
                            <button
                              onClick={() => handleView(destination)}
                              className="text-green-600 hover:text-green-800 transition-colors p-1"
                              title="View Details"
                            >
                              <FaEye className="text-xs sm:text-sm" />
                            </button>
                            <button
                              onClick={() => navigate(`/admin/study-abroad/edit/${destination._id}`)}
                              className="text-blue-600 hover:text-blue-800 transition-colors p-1"
                              title="Edit"
                            >
                              <FaEdit className="text-xs sm:text-sm" />
                            </button>
                            <button
                              onClick={() => handleDelete(destination._id)}
                              className="text-red-600 hover:text-red-800 transition-colors p-1"
                              title="Delete"
                            >
                              <FaTrash className="text-xs sm:text-sm" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredDestinations.length === 0 && (
                <div className="text-center py-12">
                  <FaGlobe className="text-6xl text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No destinations found</p>
                  <p className="text-sm text-gray-400 mt-1">Click "Add New Destination" to get started</p>
                </div>
              )}
              
              {filteredDestinations.length > 0 && (
                <div className="px-4 sm:px-6 py-3 bg-gray-50 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Showing {filteredDestinations.length} of {destinations.length} destinations
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* View Modal */}
      {isViewModalOpen && selectedDestination && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{selectedDestination.flag || "🌍"}</span>
                <h2 className="text-2xl font-bold text-gray-800">{selectedDestination.country}</h2>
              </div>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTrash />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Description */}
              {selectedDestination.desc && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">{selectedDestination.desc}</p>
                </div>
              )}

              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedDestination.cost && (
                  <div className="bg-gradient-to-r from-blue-50 to-white rounded-lg p-4">
                    <div className="flex items-center gap-2 text-blue-600 mb-2">
                      <FaMoneyBillWave />
                      <span className="font-semibold">Cost of Living</span>
                    </div>
                    <p className="text-gray-700">{selectedDestination.cost}</p>
                  </div>
                )}
                {selectedDestination.intakes && (
                  <div className="bg-gradient-to-r from-green-50 to-white rounded-lg p-4">
                    <div className="flex items-center gap-2 text-green-600 mb-2">
                      <FaCalendarAlt />
                      <span className="font-semibold">Intakes</span>
                    </div>
                    <p className="text-gray-700">{selectedDestination.intakes}</p>
                  </div>
                )}
              </div>

              {/* Why Study */}
              {selectedDestination.whyStudy && (
                <div className="bg-gradient-to-r from-purple-50 to-white rounded-lg p-4">
                  <div className="flex items-center gap-2 text-purple-600 mb-2">
                    <FaHeart />
                    <span className="font-semibold">Why Study Here?</span>
                  </div>
                  <p className="text-gray-700">{selectedDestination.whyStudy}</p>
                </div>
              )}

              {/* Features */}
              {selectedDestination.features && selectedDestination.features.length > 0 && (
                <div className="bg-white border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <FaStar className="text-[#FFD700]" />
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedDestination.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Universities */}
              {selectedDestination.universities && selectedDestination.universities.length > 0 && (
                <div className="bg-white border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <FaUniversity className="text-blue-500" />
                    Top Universities
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedDestination.universities.map((uni, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-blue-500">🎓</span>
                        <span className="text-gray-700">{uni}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedDestination.visa && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-orange-600 mb-2">
                      <FaPassport />
                      <span className="font-semibold">Visa Information</span>
                    </div>
                    <p className="text-gray-700">{selectedDestination.visa}</p>
                  </div>
                )}
                {selectedDestination.scholarships && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-green-600 mb-2">
                      <FaGraduationCap />
                      <span className="font-semibold">Scholarships</span>
                    </div>
                    <p className="text-gray-700">{selectedDestination.scholarships}</p>
                  </div>
                )}
              </div>

              {/* Metadata */}
              <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-500">
                <p>Created: {new Date(selectedDestination.createdAt).toLocaleString()}</p>
                <p>Last Updated: {new Date(selectedDestination.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}