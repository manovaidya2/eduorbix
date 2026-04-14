import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function AdminEditUniversity() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState({
    name: "",
    location: "",
    type: "",
    website: "",
    logo: null,
    existingLogo: "",
    documents: [],
    existingDocuments: [],
  });

  useEffect(() => {
    fetchAssociate();
  }, [id]);

  const fetchAssociate = async () => {
    try {
      const response = await axiosInstance.get(`/associates/${id}`);
      const data = response.data.data;
      setForm({
        name: data.name,
        location: data.location,
        type: data.type,
        website: data.website || "",
        logo: null,
        existingLogo: data.logo || "",
        documents: [],
        existingDocuments: data.documents || [],
      });
    } catch (error) {
      console.error("Error fetching associate:", error);
      alert("Failed to fetch associate details");
      navigate("/admin/dashboard");
    } finally {
      setFetching(false);
    }
  };

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

  const removeExistingDocument = async (docIndex, docName) => {
    if (window.confirm(`Delete "${docName}"?`)) {
      try {
        await axiosInstance.delete(`/associates/${id}/documents/${docIndex}`);
        const updatedDocs = form.existingDocuments.filter((_, i) => i !== docIndex);
        setForm({ ...form, existingDocuments: updatedDocs });
        alert("Document deleted successfully");
      } catch (error) {
        console.error("Error deleting document:", error);
        alert("Failed to delete document");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
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

      await axiosInstance.put(`/associates/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Associate updated successfully ✅");
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-1xl space-y-5"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Edit Associate
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

        {/* Current Logo Display */}
        {form.existingLogo && (
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Current Logo
            </label>
            <img
              src={`http://localhost:5003/uploads/${form.existingLogo}`}
              alt="Current logo"
              className="h-20 w-auto object-contain border rounded p-2"
            />
          </div>
        )}

        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Change Logo (Optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="w-full border p-2 rounded-lg bg-gray-50"
          />
          {form.logo && (
            <p className="text-sm text-green-600 mt-1">
              New selected: {form.logo.name}
            </p>
          )}
        </div>

        {/* Existing Documents */}
        {form.existingDocuments.length > 0 && (
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Current Documents ({form.existingDocuments.length})
            </label>
            <div className="space-y-2">
              {form.existingDocuments.map((doc, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span className="text-sm text-gray-600 truncate flex-1">
                    📄 {doc}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeExistingDocument(index, doc)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add New Documents */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Add New Documents (PDF)
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

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin/dashboard")}
            className="flex-1 bg-gray-500 text-white py-2 rounded-lg font-semibold hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Associate"}
          </button>
        </div>
      </form>
    </div>
  );
}