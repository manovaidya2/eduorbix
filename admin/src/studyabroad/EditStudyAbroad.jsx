import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { 
  FaSave, 
  FaTimes, 
  FaArrowLeft,
  FaSpinner,
  FaExclamationTriangle,
  FaPlus,
  FaTrash,
  FaFlag,
  FaGlobe,
  FaUniversity,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaPassport,
  FaGraduationCap,
  FaHeart,
  FaStar
} from "react-icons/fa";

export default function EditStudyAbroad() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    country: "",
    desc: "",
    whyStudy: "",
    cost: "",
    intakes: "",
    visa: "",
    scholarships: ""
  });
  const [features, setFeatures] = useState([""]);
  const [universities, setUniversities] = useState([""]);

  useEffect(() => {
    fetchDestination();
  }, [id]);

  const fetchDestination = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/study-abroad/${id}`);
      const destination = response.data;
      
      setForm({
        country: destination.country || "",
        desc: destination.desc || "",
        whyStudy: destination.whyStudy || "",
        cost: destination.cost || "",
        intakes: destination.intakes || "",
        visa: destination.visa || "",
        scholarships: destination.scholarships || ""
      });
      
      setFeatures(destination.features?.length ? destination.features : [""]);
      setUniversities(destination.universities?.length ? destination.universities : [""]);
    } catch (error) {
      console.error("Error fetching destination:", error);
      setError(error.response?.data?.message || "Failed to fetch destination");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleListChange = (index, value, type) => {
    const list = type === "features" ? [...features] : [...universities];
    list[index] = value;
    type === "features" ? setFeatures(list) : setUniversities(list);
  };

  const addField = (type) => {
    type === "features"
      ? setFeatures([...features, ""])
      : setUniversities([...universities, ""]);
  };

  const removeField = (index, type) => {
    const list = type === "features" ? [...features] : [...universities];
    list.splice(index, 1);
    type === "features" ? setFeatures(list) : setUniversities(list);
  };

  const getFlagEmoji = (country) => {
    const codeMap = {
      "United Kingdom": "GB",
      "UK": "GB",
      "United States": "US",
      "USA": "US",
      "Canada": "CA",
      "Australia": "AU",
      "Germany": "DE",
      "Ireland": "IE",
      "Singapore": "SG",
      "UAE": "AE",
      "India": "IN",
      "France": "FR",
      "Netherlands": "NL",
      "Sweden": "SE",
      "New Zealand": "NZ"
    };

    const code = codeMap[country] || "";
    if (!code) return "🌍";

    return code
      .toUpperCase()
      .replace(/./g, (char) =>
        String.fromCodePoint(127397 + char.charCodeAt())
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.country) {
      setError("Country is required");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const cleanedData = {
        ...form,
        flag: getFlagEmoji(form.country),
        features: features.filter((f) => f.trim() !== ""),
        universities: universities.filter((u) => u.trim() !== "")
      };

      const response = await axiosInstance.put(`/study-abroad/${id}`, cleanedData);
      
      if (response.data) {
        navigate("/admin/study-abroad");
      }
    } catch (error) {
      console.error("Error updating destination:", error);
      setError(error.response?.data?.message || "Failed to update destination");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
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
                onClick={() => navigate("/admin/study-abroad")}
                className="mb-2 flex items-center gap-2 text-[#FFD700] hover:text-white transition-colors"
              >
                <FaArrowLeft className="text-sm" />
                <span className="text-sm">Back to Destinations</span>
              </button>
              <h1 className="text-2xl sm:text-3xl font-bold">Edit Destination</h1>
              <p className="text-gray-300 mt-1 text-sm">Update study abroad destination details</p>
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
              <FaTimes />
            </button>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 px-6 sm:px-8 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-xl flex items-center justify-center">
                <FaGlobe className="text-[#0A1A2F] text-lg" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Edit Destination</h2>
                <p className="text-xs text-gray-500">Update the details for {form.country}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Basic Information */}
            <div className="space-y-5">
              <div className="border-b border-gray-200 pb-2">
                <h3 className="text-md font-semibold text-gray-800 flex items-center gap-2">
                  <div className="w-1 h-4 bg-[#FFD700] rounded-full"></div>
                  <FaFlag className="text-[#FFD700] text-sm" />
                  Basic Information
                </h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="country"
                  placeholder="e.g., United Kingdom, USA, Canada"
                  value={form.country}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description
                </label>
                <textarea
                  name="desc"
                  placeholder="Brief description about studying in this country..."
                  value={form.desc}
                  onChange={handleChange}
                  rows="2"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
                />
              </div>
            </div>

            {/* Features Section */}
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-2">
                <h3 className="text-md font-semibold text-gray-800 flex items-center gap-2">
                  <div className="w-1 h-4 bg-green-500 rounded-full"></div>
                  <FaStar className="text-green-500 text-sm" />
                  Key Features
                </h3>
              </div>

              {features.map((feature, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    placeholder={`Feature ${i + 1}`}
                    value={feature}
                    onChange={(e) => handleListChange(i, e.target.value, "features")}
                    className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
                  />
                  {features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeField(i, "features")}
                      className="px-3 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addField("features")}
                className="text-sm text-[#FFD700] hover:text-[#FFA500] flex items-center gap-1 font-medium"
              >
                <FaPlus className="text-xs" />
                Add Feature
              </button>
            </div>

            {/* Study Details */}
            <div className="space-y-5">
              <div className="border-b border-gray-200 pb-2">
                <h3 className="text-md font-semibold text-gray-800 flex items-center gap-2">
                  <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                  <FaGraduationCap className="text-blue-500 text-sm" />
                  Study Details
                </h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Why Study Here?
                </label>
                <textarea
                  name="whyStudy"
                  placeholder="Reasons to study in this country..."
                  value={form.whyStudy}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaMoneyBillWave className="inline mr-1 text-[#FFD700] text-xs" /> Cost of Living
                  </label>
                  <input
                    type="text"
                    name="cost"
                    placeholder="e.g., £1,200 - £1,800 per month"
                    value={form.cost}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaCalendarAlt className="inline mr-1 text-[#FFD700] text-xs" /> Intakes
                  </label>
                  <input
                    type="text"
                    name="intakes"
                    placeholder="e.g., September, January"
                    value={form.intakes}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Universities Section */}
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-2">
                <h3 className="text-md font-semibold text-gray-800 flex items-center gap-2">
                  <div className="w-1 h-4 bg-purple-500 rounded-full"></div>
                  <FaUniversity className="text-purple-500 text-sm" />
                  Top Universities
                </h3>
              </div>

              {universities.map((uni, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    placeholder={`University ${i + 1}`}
                    value={uni}
                    onChange={(e) => handleListChange(i, e.target.value, "universities")}
                    className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
                  />
                  {universities.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeField(i, "universities")}
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
                Add University
              </button>
            </div>

            {/* Additional Info */}
            <div className="space-y-5">
              <div className="border-b border-gray-200 pb-2">
                <h3 className="text-md font-semibold text-gray-800 flex items-center gap-2">
                  <div className="w-1 h-4 bg-orange-500 rounded-full"></div>
                  <FaHeart className="text-orange-500 text-sm" />
                  Additional Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaPassport className="inline mr-1 text-[#FFD700] text-xs" /> Visa Information
                  </label>
                  <input
                    type="text"
                    name="visa"
                    placeholder="Visa requirements and process..."
                    value={form.visa}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaGraduationCap className="inline mr-1 text-[#FFD700] text-xs" /> Scholarships
                  </label>
                  <input
                    type="text"
                    name="scholarships"
                    placeholder="Available scholarships..."
                    value={form.scholarships}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate("/admin/study-abroad")}
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
                Update Destination
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}