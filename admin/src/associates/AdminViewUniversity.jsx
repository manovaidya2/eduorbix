import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { Link } from "react-router-dom";

export default function AdminViewUniversity() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [associate, setAssociate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssociate();
  }, [id]);

  const fetchAssociate = async () => {
    try {
      const response = await axiosInstance.get(`/associates/${id}`);
      setAssociate(response.data.data);
    } catch (error) {
      console.error("Error fetching associate:", error);
      alert("Failed to fetch associate details");
      navigate("/admin/dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!associate) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Associate not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">University Details</h1>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Logo */}
              <div className="md:w-1/3">
                {associate.logo ? (
                  <img
                    src={`http://localhost:5003/uploads/${associate.logo}`}
                    alt={associate.name}
                    className="w-full rounded-lg shadow-md"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">No Logo</span>
                  </div>
                )}
              </div>
              
              {/* Details */}
              <div className="md:w-2/3 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{associate.name}</h2>
                  <p className="text-gray-600 mt-1">
                    <span className="font-semibold">Location:</span> {associate.location}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Type:</span>{" "}
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      associate.type?.toLowerCase() === "private" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-purple-100 text-purple-800"
                    }`}>
                      {associate.type}
                    </span>
                  </p>
                  {associate.website && (
                    <p className="text-gray-600">
                      <span className="font-semibold">Website:</span>{" "}
                      <a
                        href={associate.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {associate.website}
                      </a>
                    </p>
                  )}
                  <p className="text-gray-600">
                    <span className="font-semibold">Created:</span>{" "}
                    {new Date(associate.createdAt).toLocaleString()}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Last Updated:</span>{" "}
                    {new Date(associate.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Documents Section */}
            {associate.documents && associate.documents.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {associate.documents.map((doc, index) => (
                    <a
                      key={index}
                      href={`http://localhost:5003/uploads/${doc}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition"
                    >
                      <span className="text-2xl">📄</span>
                      <span className="text-blue-600 hover:underline flex-1">
                        {doc}
                      </span>
                      <span className="text-gray-400">↗️</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="mt-8 flex gap-3">
              <button
                onClick={() => navigate("/admin/dashboard")}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              >
                Back to Dashboard
              </button>
              <Link
                to={`/admin/edit-university/${associate._id}`}
                className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
              >
                Edit University
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}