import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  FaPlus, 
  FaTrash, 
  FaArrowLeft,
  FaSpinner,
  FaExclamationTriangle,
  FaGlobe,
  FaUniversity,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaPassport,
  FaGraduationCap,
  FaHeart,
  FaStar,
  FaSave
} from "react-icons/fa";

const API = "http://localhost:5003/api/study-abroad"; // change in production

export default function AdminDestinations() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
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
      "New Zealand": "NZ",
      "Italy": "IT",
      "Spain": "ES"
    };

    const code = codeMap[country] || "";
    if (!code) return "🌍";

    return code
      .toUpperCase()
      .replace(/./g, (char) =>
        String.fromCodePoint(127397 + char.charCodeAt())
      );
  };

  const handleAdd = async () => {
    if (!form.country) {
      setError("Country is required");
      return;
    }

    setSubmitting(true);
    setError(null);

    const newItem = {
      ...form,
      flag: getFlagEmoji(form.country),
      features: features.filter((f) => f.trim() !== ""),
      universities: universities.filter((u) => u.trim() !== "")
    };

    try {
      await axios.post(API, newItem);
      setSuccess("Destination added successfully!");
      
      // reset form
      setForm({
        country: "",
        desc: "",
        whyStudy: "",
        cost: "",
        intakes: "",
        visa: "",
        scholarships: ""
      });
      setFeatures([""]);
      setUniversities([""]);
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to add destination");
      setTimeout(() => setError(null), 3000);
    } finally {
      setSubmitting(false);
    }
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
              <h1 className="text-2xl sm:text-3xl font-bold">Add Study Abroad Destination</h1>
              <p className="text-gray-300 mt-1 text-sm">Add new international study destinations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Alert */}
        {success && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 rounded-lg p-4 flex items-center gap-3 shadow-sm">
            <FaStar className="text-green-500 text-lg flex-shrink-0" />
            <p className="text-green-700 flex-1 text-sm">{success}</p>
            <button onClick={() => setSuccess(null)} className="text-green-500 hover:text-green-700 flex-shrink-0">
              <FaTrash />
            </button>
          </div>
        )}

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

        {/* Add Destination Form */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 px-6 sm:px-8 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-xl flex items-center justify-center">
                <FaGlobe className="text-[#0A1A2F] text-lg" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Destination Details</h2>
                <p className="text-xs text-gray-500">Fill in the details to add a new study abroad destination</p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="grid md:grid-cols-2 gap-5">
              {/* Country */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="e.g., United Kingdom, USA, Canada"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description
                </label>
                <textarea
                  name="desc"
                  value={form.desc}
                  onChange={handleChange}
                  placeholder="Brief description about studying in this country..."
                  rows="2"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
                />
              </div>

              {/* Features */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaStar className="inline mr-1 text-[#FFD700] text-xs" /> Key Features
                </label>
                {features.map((f, i) => (
                  <div key={i} className="flex gap-2 mt-2">
                    <input
                      value={f}
                      onChange={(e) => handleListChange(i, e.target.value, "features")}
                      placeholder={`Feature ${i + 1}`}
                      className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
                    />
                    {features.length > 1 && (
                      <button
                        onClick={() => removeField(i, "features")}
                        className="px-3 text-red-500 hover:text-red-700 transition-colors"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => addField("features")}
                  className="mt-2 text-sm text-[#FFD700] hover:text-[#FFA500] flex items-center gap-1 font-medium"
                >
                  <FaPlus className="text-xs" /> Add Feature
                </button>
              </div>

              {/* Why Study */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaHeart className="inline mr-1 text-[#FFD700] text-xs" /> Why Study Here?
                </label>
                <textarea
                  name="whyStudy"
                  value={form.whyStudy}
                  onChange={handleChange}
                  placeholder="Reasons to study in this country..."
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
                />
              </div>

              {/* Cost & Intakes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaMoneyBillWave className="inline mr-1 text-[#FFD700] text-xs" /> Cost of Living
                </label>
                <input
                  name="cost"
                  value={form.cost}
                  onChange={handleChange}
                  placeholder="e.g., £1,200 - £1,800 per month"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaCalendarAlt className="inline mr-1 text-[#FFD700] text-xs" /> Intakes
                </label>
                <input
                  name="intakes"
                  value={form.intakes}
                  onChange={handleChange}
                  placeholder="e.g., September, January"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
                />
              </div>

              {/* Universities */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaUniversity className="inline mr-1 text-[#FFD700] text-xs" /> Top Universities
                </label>
                {universities.map((u, i) => (
                  <div key={i} className="flex gap-2 mt-2">
                    <input
                      value={u}
                      onChange={(e) => handleListChange(i, e.target.value, "universities")}
                      placeholder={`University ${i + 1}`}
                      className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
                    />
                    {universities.length > 1 && (
                      <button
                        onClick={() => removeField(i, "universities")}
                        className="px-3 text-red-500 hover:text-red-700 transition-colors"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => addField("universities")}
                  className="mt-2 text-sm text-[#FFD700] hover:text-[#FFA500] flex items-center gap-1 font-medium"
                >
                  <FaPlus className="text-xs" /> Add University
                </button>
              </div>

              {/* Visa & Scholarships */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaPassport className="inline mr-1 text-[#FFD700] text-xs" /> Visa Information
                </label>
                <input
                  name="visa"
                  value={form.visa}
                  onChange={handleChange}
                  placeholder="Visa requirements and process..."
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaGraduationCap className="inline mr-1 text-[#FFD700] text-xs" /> Scholarships
                </label>
                <input
                  name="scholarships"
                  value={form.scholarships}
                  onChange={handleChange}
                  placeholder="Available scholarships..."
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate("/admin-study-abroad")}
                className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                disabled={submitting}
                className="px-6 py-2.5 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#0A1A2F] rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
              >
                {submitting ? <FaSpinner className="animate-spin" /> : <FaSave />}
                Add Destination
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}