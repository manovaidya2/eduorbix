// PartnerSection.jsx
import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance"; // Adjust path as needed

export default function PartnerSection() {
  const [formData, setFormData] = useState({
    institutionName: '',
    contactPerson: '',
    email: '',
    partnershipType: 'Institution',
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      const response = await axiosInstance.post('/partners/enquiry', formData);
      
      if (response.data.success) {
        setSubmitStatus({ 
          type: 'success', 
          message: 'Partnership enquiry submitted successfully! We will contact you soon.' 
        });
        // Reset form
        setFormData({
          institutionName: '',
          contactPerson: '',
          email: '',
          partnershipType: 'Institution',
          message: ''
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Failed to submit enquiry. Please try again.' 
      });
    } finally {
      setLoading(false);
      // Clear status message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: '', message: '' });
      }, 5000);
    }
  };

  return (
    <div className="w-full bg-[#f3f4f6] pt-0 pb-16">

      {/* Top Header */}
      <div className="bg-[#1f3b6d] text-center py-20 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Partner with <span className="text-[#c5a46d]">Eduorbix</span>
        </h1>
        <p className="text-gray-200 mt-4 text-base md:text-lg max-w-2xl mx-auto">
          We welcome partnerships with universities, colleges, institutions, and education agents.
        </p>
      </div>

      {/* Features Cards */}
      <div className="max-w-6xl mx-auto px-4 -mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[
          {
            title: "Student Database Access",
            desc: "Access to qualified student leads.",
          },
          {
            title: "Admission Support",
            desc: "Dedicated team for admissions.",
          },
          {
            title: "Transparent Commission",
            desc: "Clear and fair commission model.",
          },
          {
            title: "Marketing Support",
            desc: "Joint marketing initiatives.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white border rounded-xl p-6 text-center shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-semibold text-gray-800 text-base">
              {item.title}
            </h3>
            <p className="text-gray-500 text-sm mt-2">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Form Section */}
      <div className="max-w-xl mx-auto mt-14 bg-white rounded-xl shadow-md p-8 border">
        <h2 className="text-center font-semibold text-gray-800 text-xl mb-6">
          Become a Partner
        </h2>

        {submitStatus.message && (
          <div className={`mb-4 p-3 rounded-md ${
            submitStatus.type === 'success' 
              ? 'bg-green-100 text-green-700 border border-green-300' 
              : 'bg-red-100 text-red-700 border border-red-300'
          }`}>
            {submitStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-base text-gray-700">
              Institution / Organization Name *
            </label>
            <input
              type="text"
              name="institutionName"
              value={formData.institutionName}
              onChange={handleChange}
              required
              className="w-full mt-2 border rounded-md px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-[#1f3b6d]"
            />
          </div>

          <div>
            <label className="text-base text-gray-700">
              Contact Person *
            </label>
            <input
              type="text"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              required
              className="w-full mt-2 border rounded-md px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-[#1f3b6d]"
            />
          </div>

          <div>
            <label className="text-base text-gray-700">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-2 border rounded-md px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-[#1f3b6d]"
            />
          </div>

          <div>
            <label className="text-base text-gray-700">Partnership Type</label>
            <select 
              name="partnershipType"
              value={formData.partnershipType}
              onChange={handleChange}
              className="w-full mt-2 border rounded-md px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-[#1f3b6d]"
            >
              <option>University / College</option>
              <option>Agent</option>
              <option>Institution</option>
            </select>
          </div>

          <div>
            <label className="text-base text-gray-700">Message</label>
            <textarea
              name="message"
              rows="3"
              value={formData.message}
              onChange={handleChange}
              className="w-full mt-2 border rounded-md px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-[#1f3b6d]"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#c5a46d] hover:bg-[#b0915a] text-white py-3 text-base rounded-md font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Submit Enquiry'}
          </button>
        </form>
      </div>
    </div>
  );
}