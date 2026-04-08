// Agent.jsx
import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance"; 

export default function Agent() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    interest: 'Agent'
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
      const response = await axiosInstance.post('/agents/register', formData);
      
      if (response.data.success) {
        setSubmitStatus({ 
          type: 'success', 
          message: 'Registration submitted successfully! We will contact you soon.' 
        });
        // Reset form
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          city: '',
          interest: 'Agent'
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Failed to submit registration. Please try again.' 
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
          Become an <span className="text-[#c5a46d]">Agent / Franchise</span>
        </h1>
        <p className="text-gray-200 mt-4 text-base md:text-lg max-w-2xl mx-auto">
          Join the Eduorbix network as an education agent or franchise partner and grow your business with us.
        </p>
      </div>

      {/* Features Cards */}
      <div className="max-w-6xl mx-auto px-4 -mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[
          {
            title: "Franchise Model",
            desc: "Start your own education consultancy under Eduorbix brand.",
          },
          {
            title: "Agent Registration",
            desc: "Register as an independent education agent.",
          },
          {
            title: "Revenue Sharing",
            desc: "Attractive commission and revenue sharing model.",
          },
          {
            title: "Training Support",
            desc: "Complete training and marketing support provided.",
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
          Agent Registration
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
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full mt-2 border rounded-md px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-[#1f3b6d]"
            />
          </div>

          <div>
            <label className="text-base text-gray-700">
              Phone *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full mt-2 border rounded-md px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-[#1f3b6d]"
            />
          </div>

          <div>
            <label className="text-base text-gray-700">
              Email *
            </label>
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
            <label className="text-base text-gray-700">
              City / Location *
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full mt-2 border rounded-md px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-[#1f3b6d]"
            />
          </div>

          <div>
            <label className="text-base text-gray-700">
              Interest
            </label>
            <select 
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              className="w-full mt-2 border rounded-md px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-[#1f3b6d]"
            >
              <option value="Franchise">Franchise</option>
              <option value="Agent">Agent</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#c5a46d] hover:bg-[#b0915a] text-white py-3 text-base rounded-md font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Submit Registration'}
          </button>
        </form>
      </div>
    </div>
  );
}