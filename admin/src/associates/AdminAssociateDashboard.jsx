import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { Link } from "react-router-dom";

export default function AdminAssociateDashboard() {
  const [associates, setAssociates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    private: 0,
    government: 0,
    totalDocuments: 0,
  });

  useEffect(() => {
    fetchAssociates();
  }, []);

  const fetchAssociates = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/associates");
      const data = response.data.data;
      setAssociates(data);
      
      // Calculate stats
      const privateCount = data.filter(a => a.type?.toLowerCase() === "private").length;
      const governmentCount = data.filter(a => a.type?.toLowerCase() === "government").length;
      const totalDocs = data.reduce((sum, a) => sum + (a.documents?.length || 0), 0);
      
      setStats({
        total: data.length,
        private: privateCount,
        government: governmentCount,
        totalDocuments: totalDocs,
      });
    } catch (error) {
      console.error("Error fetching associates:", error);
      alert("Failed to fetch associates");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await axiosInstance.delete(`/associates/${id}`);
        alert("Associate deleted successfully");
        fetchAssociates();
      } catch (error) {
        console.error("Error deleting associate:", error);
        alert("Failed to delete associate");
      }
    }
  };

  const filteredAssociates = associates.filter(associate =>
    associate.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    associate.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    associate.type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <Link
            to="/add-associate"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <span>+</span> Add New Associate
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Associates</p>
                <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <div className="text-blue-500 text-3xl">🏫</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Private Universities</p>
                <p className="text-3xl font-bold text-gray-800">{stats.private}</p>
              </div>
              <div className="text-green-500 text-3xl">🏛️</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Government Universities</p>
                <p className="text-3xl font-bold text-gray-800">{stats.government}</p>
              </div>
              <div className="text-purple-500 text-3xl">🏢</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Documents</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalDocuments}</p>
              </div>
              <div className="text-orange-500 text-3xl">📄</div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name, location, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <button
            onClick={() => setSearchTerm("")}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            Clear
          </button>
        </div>

        {/* Associates Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    S.No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Logo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Website
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Documents
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAssociates.map((associate, index) => (
                  <tr key={associate._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {associate.logo ? (
                        <img
                          src={`http://localhost:5003/uploads/${associate.logo}`}
                          alt={associate.name}
                          className="h-10 w-10 object-cover rounded-full"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/40?text=No+Logo";
                          }}
                        />
                      ) : (
                        <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-gray-500 text-xs">N/A</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {associate.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {associate.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        associate.type?.toLowerCase() === "private" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-purple-100 text-purple-800"
                      }`}>
                        {associate.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {associate.website ? (
                        <a
                          href={associate.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Visit
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <span>📄</span>
                        <span>{associate.documents?.length || 0}</span>
                        {associate.documents?.length > 0 && (
                          <button
                            onClick={() => {
                              const docs = associate.documents.join("\n");
                              alert(`Documents:\n${docs}`);
                            }}
                            className="ml-2 text-blue-600 hover:underline text-xs"
                          >
                            View
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(associate.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <Link
                          to={`/admin/edit-university/${associate._id}`}
                          className="text-yellow-600 hover:text-yellow-900 transition"
                          title="Edit"
                        >
                          ✏️
                        </Link>
                        <button
                          onClick={() => handleDelete(associate._id, associate.name)}
                          className="text-red-600 hover:text-red-900 transition"
                          title="Delete"
                        >
                          🗑️
                        </button>
                        <Link
                          to={`/admin/view-university/${associate._id}`}
                          className="text-blue-600 hover:text-blue-900 transition"
                          title="View"
                        >
                          👁️
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* No Results */}
          {filteredAssociates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No associates found</p>
            </div>
          )}
          
          {/* Table Footer with Pagination (Optional) */}
          {filteredAssociates.length > 0 && (
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{filteredAssociates.length}</span> of{" "}
                  <span className="font-medium">{associates.length}</span> associates
                </p>
                <div className="flex gap-2">
                  <button className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100">
                    Previous
                  </button>
                  <button className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}