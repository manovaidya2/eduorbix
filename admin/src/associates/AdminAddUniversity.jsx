import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function AdminAddUniversity() {
  const [form, setForm] = useState({
    name: "",
    location: "",
    type: "",
    website: "",
    logo: null,
    documents: [],
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogoChange = (e) => {
    setForm({ ...form, logo: e.target.files[0] || null });
  };

  const handleDocChange = (index, file) => {
    const updatedDocs = [...form.documents];
    updatedDocs[index] = file;
    setForm({ ...form, documents: updatedDocs });
  };

  const addDocumentField = () => {
    setForm({ ...form, documents: [...form.documents, null] });
  };

  const removeDocument = (index) => {
    const updatedDocs = form.documents.filter((_, i) => i !== index);
    setForm({ ...form, documents: updatedDocs });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("location", form.location);
      formData.append("type", form.type);
      formData.append("website", form.website);

      if (form.logo) {
        formData.append("logo", form.logo);
      }

      form.documents.forEach((doc) => {
        if (doc) {
          formData.append("documents", doc);
        }
      });

      const res = await axiosInstance.post("/associates", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(res.data.message || "Associates added successfully ✅");

      setForm({
        name: "",
        location: "",
        type: "",
        website: "",
        logo: null,
        documents: [],
      });

      e.target.reset();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-1xl space-y-5"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Add Associates
        </h2>

        <input
          type="text"
          name="name"
          placeholder="University Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />

        <input
          type="text"
          name="type"
          placeholder="Type (Private/Government)"
          value={form.type}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />

        <input
          type="text"
          name="website"
          placeholder="Website URL"
          value={form.website}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Upload Logo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="w-full border p-2 rounded-lg bg-gray-50"
          />
          {form.logo && (
            <p className="text-sm text-green-600 mt-1">
              Selected: {form.logo.name}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Upload Documents (PDF)
          </label>

          {form.documents.map((doc, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => handleDocChange(index, e.target.files[0])}
                className="w-full border p-2 rounded-lg bg-gray-50"
              />

              <button
                type="button"
                onClick={() => removeDocument(index)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addDocumentField}
            className="mt-2 text-blue-600 font-medium hover:underline"
          >
            ➕ Add More Documents
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Associates"}
        </button>
      </form>
    </div>
  );
}