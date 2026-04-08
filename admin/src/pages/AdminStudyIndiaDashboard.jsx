import React, { useState, useEffect } from "react";
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaTimes, 
  FaSearch,
  FaFilter,
  FaDownload,
  FaEye,
  FaArrowLeft,
  FaClock,
  FaMoneyBillWave,
  FaGraduationCap,
  FaUniversity,
  FaCheckCircle,
  FaList,
  FaSpinner,
  FaBook,
  FaExclamationTriangle
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function AdminStudyIndiaDashboard() {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch programs on component mount
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
    } catch (error) {
      console.error("Error fetching programs:", error);
      setError(error.response?.data?.message || "Failed to fetch programs. Please check if the server is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleView = (program) => {
    setSelectedProgram(program);
    setIsViewModalOpen(true);
  };

const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this program?")) {
    try {
      setLoading(true);
      setError(null); // Clear any previous errors
      
      const response = await axiosInstance.delete(`/study-india-programs/${id}`);
      
      if (response.data.success) {
        // Remove the deleted program from the state immediately
        setPrograms(prevPrograms => prevPrograms.filter(program => program._id !== id));
        alert("Program deleted successfully!");
      } else {
        setError(response.data.message || "Failed to delete program");
      }
    } catch (error) {
      console.error("Error deleting program:", error);
      const errorMessage = error.response?.data?.message || "Failed to delete program. Please try again.";
      setError(errorMessage);
      alert(errorMessage); // Show alert for better user feedback
    } finally {
      setLoading(false);
    }
  }
};
  // Filter programs based on search
  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (program.description && program.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  // Calculate statistics
  const stats = {
    total: programs.length,
    totalUniversities: programs.reduce((sum, p) => sum + (p.universities?.length || 0), 0),
    totalEligibilityItems: programs.reduce((sum, p) => sum + (p.eligibility?.length || 0), 0),
    avgDuration: programs.length > 0 ? 
      programs.reduce((sum, p) => sum + (parseInt(p.duration) || 0), 0) / programs.length + " years" : "N/A"
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
              <h1 className="text-2xl sm:text-3xl font-bold">Study India Programs</h1>
              <p className="text-gray-300 mt-1 text-sm">Manage programs for studying in India</p>
            </div>
            <button
              onClick={() => navigate("/study-india-program")}
              className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#0A1A2F] px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
            >
              <FaPlus className="text-sm" />
              Add New Program
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
            <FaExclamationTriangle className="text-red-500 flex-shrink-0" />
            <p className="text-red-700 flex-1">{error}</p>
            <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700 flex-shrink-0">
              <FaTimes />
            </button>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border-l-4 border-[#FFD700]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs sm:text-sm">Total decipline</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <FaBook className="text-2xl sm:text-3xl text-[#FFD700] opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs sm:text-sm">Total Program</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-800">{stats.totalUniversities}</p>
              </div>
              <FaGraduationCap className="text-2xl sm:text-3xl text-green-500 opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs sm:text-sm">Eligibility Criteria</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-800">{stats.totalEligibilityItems}</p>
              </div>
              <FaCheckCircle className="text-2xl sm:text-3xl text-blue-500 opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs sm:text-sm">Avg. Duration</p>
                <p className="text-base sm:text-xl font-bold text-gray-800 truncate">{stats.avgDuration}</p>
              </div>
              <FaClock className="text-2xl sm:text-3xl text-purple-500 opacity-50" />
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search programs by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700]"
              />
            </div>
            <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors justify-center sm:justify-start">
              <FaDownload className="text-sm" />
              Export Data
            </button>
          </div>
        </div>

        {/* Programs Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <FaSpinner className="animate-spin text-4xl text-[#FFD700]" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program Title</th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Duration</th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Fee Range</th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Created At</th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPrograms.map((program, index) => (
                    <tr key={program._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 sm:px-6 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500">{index + 1}</td>
                      <td className="px-3 sm:px-6 py-2 sm:py-3">
                        <div className="text-xs sm:text-sm font-medium text-gray-900 max-w-[200px] sm:max-w-none truncate">
                          {program.title}
                        </div>
                        {program.description && (
                          <div className="text-[10px] sm:text-xs text-gray-500 truncate max-w-[180px] sm:max-w-[250px]">
                            {program.description}
                          </div>
                        )}
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-600 hidden md:table-cell">
                        {program.duration ? (program.duration.length > 20 ? program.duration.substring(0, 20) + '...' : program.duration) : "N/A"}
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-600 hidden lg:table-cell">
                        {program.fee ? (program.fee.length > 20 ? program.fee.substring(0, 20) + '...' : program.fee) : "N/A"}
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-600">
                        <span className="px-2 py-0.5 sm:py-1 bg-blue-100 text-blue-800 rounded-full text-[10px] sm:text-xs whitespace-nowrap">
                          {program.universities?.length || 0} Program{program.universities?.length === 1 ? '' : 's'}  
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden lg:table-cell">
                        {new Date(program.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-3 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                        <div className="flex items-center justify-end gap-1 sm:gap-2">
                          <button
                            onClick={() => handleView(program)}
                            className="text-green-600 hover:text-green-800 transition-colors p-1"
                            title="View Details"
                          >
                            <FaEye className="text-xs sm:text-sm" />
                          </button>
                          <button
                            onClick={() => navigate(`/admin/study-india-programs/edit/${program._id}`)}
                            className="text-blue-600 hover:text-blue-800 transition-colors p-1"
                            title="Edit"
                          >
                            <FaEdit className="text-xs sm:text-sm" />
                          </button>
                          <button
                            onClick={() => handleDelete(program._id)}
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
              
              {filteredPrograms.length === 0 && (
                <div className="text-center py-8 sm:py-12">
                  <p className="text-gray-500 text-sm sm:text-base">No programs found</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* View Program Modal */}
      {isViewModalOpen && selectedProgram && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 sm:p-6 border-b flex justify-between items-center">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Program Details</h2>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Hero Section */}
              <div className="bg-gradient-to-r from-[#0A1A2F] to-[#0E1F38] text-white rounded-lg p-4 sm:p-6">
                <h1 className="text-xl sm:text-3xl font-bold mb-2 break-words">{selectedProgram.title}</h1>
                <p className="text-sm sm:text-base text-gray-300 break-words">{selectedProgram.description}</p>
              </div>

              {/* Duration & Fee */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center gap-2 text-[#FFD700] mb-2">
                    <FaClock className="text-sm sm:text-base" />
                    <span className="font-semibold text-sm sm:text-base">Duration</span>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base break-words">{selectedProgram.duration || "Not specified"}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center gap-2 text-[#FFD700] mb-2">
                    <FaMoneyBillWave className="text-sm sm:text-base" />
                    <span className="font-semibold text-sm sm:text-base">Fee Range</span>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base break-words">{selectedProgram.fee || "Not specified"}</p>
                </div>
              </div>

              {/* Eligibility */}
              {selectedProgram.eligibility && selectedProgram.eligibility.length > 0 && (
                <div className="bg-white border rounded-lg p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2">
                    <FaCheckCircle className="text-green-500 text-base sm:text-xl" />
                    Eligibility Criteria
                  </h3>
                  <ul className="space-y-2">
                    {selectedProgram.eligibility.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm sm:text-base">
                        <span className="text-green-500 mt-1">✓</span>
                        <span className="text-gray-700 break-words">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Universities */}
              {selectedProgram.universities && selectedProgram.universities.length > 0 && (
                <div className="bg-white border rounded-lg p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2">
                    <FaGraduationCap className="text-blue-500 text-base sm:text-xl" />
                    Top Universities
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {selectedProgram.universities.map((uni, idx) => (
                      <div key={idx} className="bg-gray-50 px-3 sm:px-4 py-2 rounded-md flex items-center gap-2">
                        <span className="text-blue-500 text-sm sm:text-base">🎓</span>
                        <span className="text-gray-700 text-sm sm:text-base break-words">{uni}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Admission Process */}
              {selectedProgram.admission && selectedProgram.admission.length > 0 && (
                <div className="bg-white border rounded-lg p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2">
                    <FaList className="text-purple-500 text-base sm:text-xl" />
                    Admission Process
                  </h3>
                  <div className="space-y-3">
                    {selectedProgram.admission.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <span className="bg-[#FFD700] text-[#0A1A2F] w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full font-semibold text-xs sm:text-base">
                          {idx + 1}
                        </span>
                        <span className="text-gray-700 text-sm sm:text-base break-words">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Metadata */}
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 text-xs sm:text-sm text-gray-500">
                <p>Created: {new Date(selectedProgram.createdAt).toLocaleString()}</p>
                <p>Last Updated: {new Date(selectedProgram.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}