import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance"; // Adjust path based on your project structure

export default function AdminUniversities() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    country: "",
    category: "Indian",
    rank: "",
    name: "",
    location: "",
    type: "",
  });

  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);

  // Fetch universities on component mount
  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/universities");
      setUniversities(response.data.data);
    } catch (err) {
      setError("Failed to fetch universities");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    setTags([...tags, tagInput.trim()]);
    setTagInput("");
  };

  const handleDeleteTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleAdd = async () => {
    if (!form.name) {
      alert("University name is required");
      return;
    }

    setLoading(true);
    try {
      const newUni = {
        ...form,
        tags: tags,
      };

      const response = await axiosInstance.post("/universities", newUni);
      
      // Add new university to list
      setUniversities([...universities, response.data.data]);
      
      // Reset form
      setForm({
        country: "",
        category: "Indian",
        rank: "",
        name: "",
        location: "",
        type: "",
      });
      setTags([]);
      
      alert("University added successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add university");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this university?")) return;
    
    setLoading(true);
    try {
      await axiosInstance.delete(`/universities/${id}`);
      setUniversities(universities.filter(uni => uni._id !== id));
      alert("University deleted successfully!");
    } catch (err) {
      alert("Failed to delete university");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && universities.length === 0) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Admin - Manage Universities</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Form */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          name="country" 
          value={form.country} 
          onChange={handleChange} 
          placeholder="Country Code (IN, US)" 
          className="border p-2 rounded" 
          disabled={loading}
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 rounded"
          disabled={loading}
        >
          <option value="Indian">Indian</option>
          <option value="Abroad">Abroad</option>
        </select>

        <input 
          name="rank" 
          value={form.rank} 
          onChange={handleChange} 
          placeholder="Rank" 
          className="border p-2 rounded" 
          disabled={loading}
        />
        
        <input 
          name="name" 
          value={form.name} 
          onChange={handleChange} 
          placeholder="University Name" 
          className="border p-2 rounded" 
          disabled={loading}
        />
        
        <input 
          name="location" 
          value={form.location} 
          onChange={handleChange} 
          placeholder="Location" 
          className="border p-2 rounded" 
          disabled={loading}
        />
        
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border p-2 rounded"
          disabled={loading}
        >
          <option value="">Select Type</option>
          <option value="Public">Public</option>
          <option value="Private">Private</option>
          <option value="Deemed">Deemed</option>
          <option value="Central">Central</option>
          <option value="State">State</option>
        </select>

        {/* TAG INPUT */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex gap-2">
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Enter tag"
              className="border p-2 rounded w-full"
              disabled={loading}
            />
            <button
              onClick={handleAddTag}
              className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
              disabled={loading}
            >
              Add
            </button>
          </div>

          {/* TAG LIST */}
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full flex items-center gap-2"
              >
                {tag}
                <button 
                  onClick={() => handleDeleteTag(index)}
                  className="hover:text-red-600"
                  disabled={loading}
                >
                  ❌
                </button>
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={handleAdd}
          className="col-span-1 md:col-span-2 bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:bg-green-400"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add University"}
        </button>
      </div>

      {/* List */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">University List</h2>

        {universities.length === 0 ? (
          <p>No universities added yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Name</th>
                  <th className="p-2">Country</th>
                  <th className="p-2">Category</th>
                  <th className="p-2">Rank</th>
                  <th className="p-2">Tags</th>
                  <th className="p-2">Actions</th>
                 </tr>
              </thead>
              <tbody>
                {universities.map((uni) => (
                  <tr key={uni._id} className="border-t">
                    <td className="p-2">{uni.name}</td>
                    <td className="p-2">{uni.country}</td>
                    <td className="p-2">{uni.category}</td>
                    <td className="p-2">{uni.rank}</td>
                    <td className="p-2">
                      {uni.tags?.map((t, i) => (
                        <span key={i} className="mr-2 text-xs bg-gray-200 px-2 py-1 rounded">
                          {t}
                        </span>
                      ))}
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => handleDelete(uni._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:bg-red-300"
                        disabled={loading}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}