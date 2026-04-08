import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { 
  FaArrowLeft, 
  FaSave, 
  FaPlus, 
  FaTrash, 
  FaSpinner, 
  FaExclamationTriangle,
  FaBook,
  FaClock,
  FaMoneyBillWave,
  FaUniversity,
  FaList,
  FaCheckCircle,
  FaTag,
  FaEye,
  FaBullhorn
} from "react-icons/fa";

export default function EditStudyIndiaProgram() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    programOverview: "",
    programOutcomes: "",
    duration: "",
    fee: "",
    category: "REGULAR PROGRAMS",
    eligibility: [""],
    universities: [""],
    admission: [""],
  });

  const programCategories = [
    "REGULAR PROGRAMS",
    "COUNCIL APPROVED PROGRAMS",
    "SKILLED BASED INDUSTRY INTEGRATED PROGRAMS",
    "ONLINE & DISTANCE MODE EDUCATION",
    "BOARD EDUCATION"
  ];

  useEffect(() => {
    fetchProgram();
  }, [id]);

  const fetchProgram = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/study-india-programs/${id}`);
      if (response.data.success) {
        const program = response.data.data;
        setForm({
          title: program.title || "",
          description: program.description || "",
          programOverview: program.programOverview || "",
          programOutcomes: program.programOutcomes || "",
          duration: program.duration || "",
          fee: program.fee || "",
          category: program.category || "REGULAR PROGRAMS",
          eligibility: program.eligibility?.length ? program.eligibility : [""],
          universities: program.universities?.length ? program.universities : [""],
          admission: program.admission?.length ? program.admission : [""],
        });
      } else {
        setError("Failed to fetch program");
      }
    } catch (error) {
      console.error("Error fetching program:", error);
      setError(error.response?.data?.message || "Failed to fetch program");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (type, index, value) => {
    const updated = [...form[type]];
    updated[index] = value;
    setForm(prev => ({ ...prev, [type]: updated }));
  };

  const addField = (type) => {
    setForm(prev => ({ ...prev, [type]: [...prev[type], ""] }));
  };

  const removeField = (type, index) => {
    const updated = [...form[type]];
    updated.splice(index, 1);
    setForm(prev => ({ ...prev, [type]: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Validate required fields
      if (!form.title || !form.title.trim()) {
        throw new Error("Program title is required");
      }
      
      if (!form.programOverview || !form.programOverview.trim()) {
        throw new Error("Program overview is required");
      }
      
      if (!form.programOutcomes || !form.programOutcomes.trim()) {
        throw new Error("Program outcomes is required");
      }

      // Remove empty fields from arrays
      const cleanedForm = {
        title: form.title.trim(),
        description: form.description ? form.description.trim() : "",
        programOverview: form.programOverview.trim(),
        programOutcomes: form.programOutcomes.trim(),
        duration: form.duration ? form.duration.trim() : "",
        fee: form.fee ? form.fee.trim() : "",
        category: form.category,
        eligibility: form.eligibility.filter((i) => i && i.trim() !== ""),
        universities: form.universities.filter((i) => i && i.trim() !== ""),
        admission: form.admission.filter((i) => i && i.trim() !== ""),
      };

      const response = await axiosInstance.put(`/study-india-programs/${id}`, cleanedForm);

      if (response.data.success) {
        alert("✅ Program Updated Successfully!");
navigate("/study-india-dashboard");
      } else {
        setError(response.data.message || "Failed to update program");
      }
    } catch (error) {
      console.error("Error updating program:", error);
      setError(error.response?.data?.message || error.message || "Failed to update program. Please check your connection.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-[#FFD700]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A1A2F] to-[#0E1F38] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <button
                onClick={() => navigate("/admin/study-india-programs")}
                className="mb-2 flex items-center gap-2 text-[#FFD700] hover:text-white transition-colors"
              >
                <FaArrowLeft className="text-sm" />
                <span className="text-sm">Back to Programs</span>
              </button>
              <h1 className="text-2xl sm:text-3xl font-bold">Edit Program</h1>
              <p className="text-gray-300 mt-1 text-sm">Update program details</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 px-6 sm:px-8 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-xl flex items-center justify-center">
                <FaBook className="text-[#0A1A2F] text-lg" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Edit Program Information</h2>
                <p className="text-xs text-gray-500">Update the details of the program</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Basic Information Section */}
            <div className="space-y-5">
              <div className="border-b border-gray-200 pb-2">
                <h3 className="text-md font-semibold text-gray-800 flex items-center gap-2">
                  <div className="w-1 h-4 bg-[#FFD700] rounded-full"></div>
                  Basic Information
                </h3>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Program Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g., Engineering (B.Tech / M.Tech)"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
                />
              </div>

              {/* Category Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaTag className="inline mr-1 text-[#FFD700] text-xs" /> Program Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all bg-white"
                >
                  {programCategories.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Select which category this program belongs to</p>
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description
                </label>
                <textarea
                  name="description"
                  placeholder="Brief description of the program..."
                  value={form.description}
                  onChange={handleChange}
                  rows="2"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
                />
              </div>

              {/* Program Overview - Large Text Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaEye className="inline mr-1 text-blue-500 text-xs" /> Program Overview <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="programOverview"
                  placeholder="Write a detailed overview of the program including curriculum, teaching methodology, facilities, etc..."
                  value={form.programOverview}
                  onChange={handleChange}
                  required
                  rows="8"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">Provide comprehensive information about what this program offers</p>
              </div>

              {/* Program Outcomes - Large Text Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaBullhorn className="inline mr-1 text-green-500 text-xs" /> Program Outcomes <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="programOutcomes"
                  placeholder="Describe what students will achieve after completing this program - career opportunities, skills gained, further education options, etc..."
                  value={form.programOutcomes}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">Explain the learning outcomes, career prospects, and benefits for students</p>
              </div>

              {/* Duration and Fee */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaClock className="inline mr-1 text-[#FFD700] text-xs" /> Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    placeholder="e.g., 4 years (B.Tech) / 2 years (M.Tech)"
                    value={form.duration}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaMoneyBillWave className="inline mr-1 text-[#FFD700] text-xs" /> Fee Range
                  </label>
                  <input
                    type="text"
                    name="fee"
                    placeholder="e.g., ₹2 lakhs – ₹20 lakhs per year"
                    value={form.fee}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Eligibility Section */}
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-2">
                <h3 className="text-md font-semibold text-gray-800 flex items-center gap-2">
                  <div className="w-1 h-4 bg-green-500 rounded-full"></div>
                  <FaCheckCircle className="text-green-500 text-sm" />
                  Eligibility Criteria
                </h3>
              </div>

              {form.eligibility.map((item, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    placeholder={`Eligibility ${i + 1}`}
                    value={item}
                    onChange={(e) => handleArrayChange("eligibility", i, e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
                  />
                  {form.eligibility.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeField("eligibility", i)}
                      className="px-3 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addField("eligibility")}
                className="text-sm text-[#FFD700] hover:text-[#FFA500] flex items-center gap-1 font-medium"
              >
                <FaPlus className="text-xs" />
                Add Eligibility
              </button>
            </div>

            {/* Universities Section */}
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-2">
                <h3 className="text-md font-semibold text-gray-800 flex items-center gap-2">
                  <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                  <FaUniversity className="text-blue-500 text-sm" />
                  Top Program
                </h3>
              </div>

              {form.universities.map((item, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    placeholder={`Program ${i + 1}`}
                    value={item}
                    onChange={(e) => handleArrayChange("universities", i, e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
                  />
                  {form.universities.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeField("universities", i)}
                      className="px-3 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addField("universities")}
                className="text-sm text-[#FFD700] hover:text-[#FFA500] flex items-center gap-1 font-medium"
              >
                <FaPlus className="text-xs" />
                Add Program
              </button>
            </div>

            {/* Admission Process Section */}
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-2">
                <h3 className="text-md font-semibold text-gray-800 flex items-center gap-2">
                  <div className="w-1 h-4 bg-purple-500 rounded-full"></div>
                  <FaList className="text-purple-500 text-sm" />
                  Admission Process
                </h3>
              </div>

              {form.admission.map((item, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    placeholder={`Step ${i + 1}`}
                    value={item}
                    onChange={(e) => handleArrayChange("admission", i, e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
                  />
                  {form.admission.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeField("admission", i)}
                      className="px-3 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addField("admission")}
                className="text-sm text-[#FFD700] hover:text-[#FFA500] flex items-center gap-1 font-medium"
              >
                <FaPlus className="text-xs" />
                Add Step
              </button>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate("/admin/study-india-programs")}
                className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium text-gray-700"
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#0A1A2F] rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
              >
                {submitting ? <FaSpinner className="animate-spin" /> : <FaSave />}
                Update Program
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}