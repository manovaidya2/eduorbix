import React, { useState, useEffect } from 'react';
import axiosInstance from "../api/axiosInstance";
import { Link, useNavigate } from 'react-router-dom';
import {
  FiBookOpen,
  FiEye,
  FiUser,
  FiFolder,
  FiEdit,
  FiTrash2,
  FiPlusCircle,
  FiTrendingUp,
  FiCalendar,
  FiCheckCircle,
  FiClock
} from 'react-icons/fi';

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalViews: 0,
    totalCategories: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
    recentBlogs: []
  });
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/blogs');
      
      if (response.data.success) {
        const allBlogs = response.data.data;
        setBlogs(allBlogs);
        
        // Calculate statistics
        const totalViews = allBlogs.reduce((sum, blog) => sum + (blog.views || 0), 0);
        const uniqueCategories = [...new Set(allBlogs.map(blog => blog.category).filter(cat => cat))];
        const publishedCount = allBlogs.filter(blog => blog.status === 'published').length;
        const draftCount = allBlogs.filter(blog => blog.status === 'draft').length;
        const recentBlogs = [...allBlogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
        
        setStats({
          totalBlogs: allBlogs.length,
          totalViews: totalViews,
          totalCategories: uniqueCategories.length,
          publishedBlogs: publishedCount,
          draftBlogs: draftCount,
          recentBlogs: recentBlogs
        });
        
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const response = await axiosInstance.delete(`/blogs/${id}`);
        if (response.data.success) {
          alert('Blog deleted successfully!');
          fetchDashboardData();
        }
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert('Failed to delete blog');
      }
    }
  };

  const handleEditBlog = (id) => {
    navigate(`/admin/edit-blog/${id}`);
  };

  const filteredBlogs = selectedCategory === 'all' 
    ? blogs 
    : blogs.filter(blog => blog.category === selectedCategory);

  const StatCard = ({ icon: Icon, title, value, color, bgColor }) => (
    <div className="bg-white rounded-xl shadow-md p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${bgColor}`}>
          <Icon className="text-2xl" style={{ color }} />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Blog Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your blog posts and analytics</p>
            </div>
            <Link
              to="/admin-blogs"
              className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition shadow-md"
            >
              <FiPlusCircle />
              <span>Create New Blog</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatCard
            icon={FiBookOpen}
            title="Total Blogs"
            value={stats.totalBlogs}
            color="#10B981"
            bgColor="bg-green-50"
          />
          <StatCard
            icon={FiEye}
            title="Total Views"
            value={stats.totalViews.toLocaleString()}
            color="#3B82F6"
            bgColor="bg-blue-50"
          />
          <StatCard
            icon={FiFolder}
            title="Categories"
            value={stats.totalCategories}
            color="#F59E0B"
            bgColor="bg-yellow-50"
          />
          <StatCard
            icon={FiCheckCircle}
            title="Published"
            value={stats.publishedBlogs}
            color="#10B981"
            bgColor="bg-green-50"
          />
          <StatCard
            icon={FiClock}
            title="Drafts"
            value={stats.draftBlogs}
            color="#EF4444"
            bgColor="bg-red-50"
          />
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FiTrendingUp className="text-green-600" />
              Recent Activity
            </h2>
            <span className="text-sm text-gray-500">Last 5 blogs</span>
          </div>
          <div className="space-y-3">
            {stats.recentBlogs.map((blog, index) => (
              <div key={blog._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 text-sm">#{index + 1}</span>
                  <div>
                    <h3 className="font-medium text-gray-800">{blog.title}</h3>
                    <p className="text-sm text-gray-500">
                      By {blog.authorName} • {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    <FiEye className="inline mr-1" /> {blog.views || 0}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    blog.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {blog.status || 'published'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blog List with Filters */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <h2 className="text-xl font-bold text-gray-800">All Blogs</h2>
              <div className="flex gap-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  <option value="all">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Search blogs..."
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  onChange={(e) => {
                    const searchTerm = e.target.value.toLowerCase();
                    // Implement search functionality
                  }}
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blog</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBlogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{blog.title}</div>
                        <div className="text-sm text-gray-500">Slug: {blog.slug}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FiUser className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{blog.authorName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                        {blog.category || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FiEye className="text-gray-400 mr-1" />
                        <span className="text-sm text-gray-900">{blog.views || 0}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FiCalendar className="text-gray-400 mr-1" />
                        <span className="text-sm text-gray-900">
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        blog.status === 'published' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {blog.status || 'published'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditBlog(blog._id)}
                          className="text-blue-600 hover:text-blue-800 transition"
                          title="Edit"
                        >
                          <FiEdit className="text-lg" />
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(blog._id)}
                          className="text-red-600 hover:text-red-800 transition"
                          title="Delete"
                        >
                          <FiTrash2 className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBlogs.length === 0 && (
            <div className="text-center py-12">
              <FiBookOpen className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No blogs found</p>
              <Link
                to="/admin/add-blog"
                className="inline-block mt-4 text-green-600 hover:text-green-700"
              >
                Create your first blog →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}