// AdminPartnerDashboard.jsx
import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { 
  Building2, 
  User, 
  Mail, 
  MessageCircle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  TrendingUp,
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Calendar,
  Briefcase,
  Star,
  Phone,
  MapPin,
  BarChart3,
  PieChart,
  Users,
  Send,
  RefreshCw
} from 'lucide-react';

export default function AdminPartnerDashboard() {
  const [enquiries, setEnquiries] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [enquiriesRes] = await Promise.all([
        axiosInstance.get('/partners/enquiries')
      ]);
      setEnquiries(enquiriesRes.data.data);
      calculateStats(enquiriesRes.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const total = data.length;
    const pending = data.filter(e => e.status === 'pending').length;
    const contacted = data.filter(e => e.status === 'contacted').length;
    const approved = data.filter(e => e.status === 'approved').length;
    const rejected = data.filter(e => e.status === 'rejected').length;
    
    const universityCount = data.filter(e => e.partnershipType === 'University / College').length;
    const agentCount = data.filter(e => e.partnershipType === 'Agent').length;
    const institutionCount = data.filter(e => e.partnershipType === 'Institution').length;
    
    setStats({ total, pending, contacted, approved, rejected, universityCount, agentCount, institutionCount });
  };

  const handleStatusUpdate = async (id, newStatus) => {
    setUpdatingStatus(true);
    try {
      await axiosInstance.put(`/partners/enquiry/${id}/status`, { status: newStatus });
      await fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/partners/enquiry/${deleteId}`);
      await fetchData();
      setShowDeleteModal(false);
      setDeleteId(null);
    } catch (error) {
      console.error('Error deleting enquiry:', error);
    }
  };

  const filteredEnquiries = enquiries.filter(enquiry => {
    const matchesSearch = enquiry.institutionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         enquiry.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         enquiry.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || enquiry.status === filterStatus;
    const matchesType = filterType === 'all' || enquiry.partnershipType === filterType;
    
    let matchesDate = true;
    if (dateRange.start && dateRange.end) {
      const enquiryDate = new Date(enquiry.createdAt);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      matchesDate = enquiryDate >= startDate && enquiryDate <= endDate;
    }
    
    return matchesSearch && matchesStatus && matchesType && matchesDate;
  });

  const paginatedEnquiries = filteredEnquiries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage);

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white';
      case 'contacted': return 'bg-gradient-to-r from-blue-400 to-blue-500 text-white';
      case 'approved': return 'bg-gradient-to-r from-green-400 to-green-500 text-white';
      case 'rejected': return 'bg-gradient-to-r from-red-400 to-red-500 text-white';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return <Clock size={14} />;
      case 'contacted': return <Send size={14} />;
      case 'approved': return <CheckCircle size={14} />;
      case 'rejected': return <XCircle size={14} />;
      default: return null;
    }
  };

  const getPartnershipIcon = (type) => {
    switch(type) {
      case 'University / College': return <Building2 size={16} />;
      case 'Agent': return <Users size={16} />;
      case 'Institution': return <Briefcase size={16} />;
      default: return <Building2 size={16} />;
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, bgColor, trend }) => (
    <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide">{title}</p>
          <p className="text-4xl font-bold mt-2 text-gray-800">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <TrendingUp size={14} className="text-green-500" />
              <span className="text-xs text-green-600 ml-1">{trend}</span>
            </div>
          )}
        </div>
        <div className={`${bgColor} p-4 rounded-2xl`}>
          <Icon className={`${color} w-7 h-7`} />
        </div>
      </div>
    </div>
  );

  const exportToCSV = () => {
    const headers = ['Institution Name', 'Contact Person', 'Email', 'Partnership Type', 'Status', 'Message', 'Created At'];
    const csvData = filteredEnquiries.map(e => [
      e.institutionName,
      e.contactPerson,
      e.email,
      e.partnershipType,
      e.status,
      e.message || '',
      new Date(e.createdAt).toLocaleString()
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `partnership_enquiries_${new Date().toISOString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-b-3 border-blue-600 mx-auto"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Building2 className="text-blue-600 w-6 h-6" />
            </div>
          </div>
          <p className="mt-6 text-gray-600 font-medium">Loading Partnership Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Animated Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Partnership Hub
              </h1>
              <p className="mt-3 text-blue-200 text-lg">Manage and track all partnership enquiries in one place</p>
            </div>
            <button
              onClick={fetchData}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl px-5 py-2.5 transition-all duration-200 flex items-center gap-2 border border-white/20"
            >
              <RefreshCw size={18} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Enquiries" 
            value={stats?.total || 0} 
            icon={Building2}
            color="text-blue-600"
            bgColor="bg-blue-100"
            trend="+12% this month"
          />
          <StatCard 
            title="Pending Review" 
            value={stats?.pending || 0} 
            icon={Clock}
            color="text-yellow-600"
            bgColor="bg-yellow-100"
          />
          <StatCard 
            title="Approved" 
            value={stats?.approved || 0} 
            icon={CheckCircle}
            color="text-green-600"
            bgColor="bg-green-100"
          />
          <StatCard 
            title="Universities" 
            value={stats?.universityCount || 0} 
            icon={Star}
            color="text-purple-600"
            bgColor="bg-purple-100"
          />
        </div>

        {/* Partnership Type Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Universities & Colleges</p>
                <p className="text-3xl font-bold mt-1">{stats?.universityCount || 0}</p>
              </div>
              <Building2 size={40} className="opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Education Agents</p>
                <p className="text-3xl font-bold mt-1">{stats?.agentCount || 0}</p>
              </div>
              <Users size={40} className="opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Institutions</p>
                <p className="text-3xl font-bold mt-1">{stats?.institutionCount || 0}</p>
              </div>
              <Briefcase size={40} className="opacity-80" />
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by institution, contact person or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="contacted">Contacted</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option value="all">All Types</option>
                <option value="University / College">University / College</option>
                <option value="Agent">Agent</option>
                <option value="Institution">Institution</option>
              </select>
            </div>
            <button
              onClick={exportToCSV}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Export CSV
            </button>
          </div>
          
          {/* Date Range Filter */}
          <div className="mt-4 flex gap-4">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Start Date"
            />
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="End Date"
            />
            {(dateRange.start || dateRange.end) && (
              <button
                onClick={() => setDateRange({ start: '', end: '' })}
                className="text-red-600 hover:text-red-700 text-sm"
              >
                Clear Dates
              </button>
            )}
          </div>
        </div>

        {/* Enquiries Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Institution</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact Person</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {paginatedEnquiries.map((enquiry) => (
                  <tr key={enquiry._id} className="hover:bg-gray-50 transition-all duration-200 group">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white font-bold">
                          {enquiry.institutionName.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-semibold text-gray-900">{enquiry.institutionName}</div>
                          <div className="text-xs text-gray-500">ID: {enquiry._id.slice(-6)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{enquiry.contactPerson}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-xs text-gray-600">
                          <Mail size={12} className="mr-1" />
                          {enquiry.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-100 text-indigo-800">
                        {getPartnershipIcon(enquiry.partnershipType)}
                        <span className="ml-1">{enquiry.partnershipType}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={enquiry.status}
                        onChange={(e) => handleStatusUpdate(enquiry._id, e.target.value)}
                        disabled={updatingStatus}
                        className={`inline-flex bg-blue-900 items-center px-3 py-1.5 rounded-lg text-xs font-semibold border-0 cursor-pointer transition-all ${getStatusColor(enquiry.status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar size={12} className="mr-1" />
                        {new Date(enquiry.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setSelectedEnquiry(enquiry);
                          setShowModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 transition-colors p-2 hover:bg-blue-50 rounded-lg"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setDeleteId(enquiry._id);
                          setShowDeleteModal(true);
                        }}
                        className="text-red-600 hover:text-red-800 transition-colors p-2 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-4 py-4 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                    <span className="font-medium">
                      {Math.min(currentPage * itemsPerPage, filteredEnquiries.length)}
                    </span> of{' '}
                    <span className="font-medium">{filteredEnquiries.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === pageNum
                              ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* View Details Modal */}
      {showModal && selectedEnquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Partnership Details</h2>
                  <p className="text-blue-100 mt-1">Complete enquiry information</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <XCircle size={28} />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5">
                  <label className="text-xs text-blue-600 uppercase font-bold tracking-wider">Institution Name</label>
                  <p className="text-lg font-semibold text-gray-900 mt-2 flex items-center">
                    <Building2 size={18} className="mr-2 text-blue-600" />
                    {selectedEnquiry.institutionName}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5">
                  <label className="text-xs text-green-600 uppercase font-bold tracking-wider">Contact Person</label>
                  <p className="text-lg font-semibold text-gray-900 mt-2 flex items-center">
                    <User size={18} className="mr-2 text-green-600" />
                    {selectedEnquiry.contactPerson}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5">
                  <label className="text-xs text-purple-600 uppercase font-bold tracking-wider">Email Address</label>
                  <p className="text-lg font-semibold text-gray-900 mt-2 flex items-center">
                    <Mail size={18} className="mr-2 text-purple-600" />
                    {selectedEnquiry.email}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-5">
                  <label className="text-xs text-orange-600 uppercase font-bold tracking-wider">Partnership Type</label>
                  <p className="text-lg font-semibold text-gray-900 mt-2 flex items-center">
                    {getPartnershipIcon(selectedEnquiry.partnershipType)}
                    <span className="ml-2">{selectedEnquiry.partnershipType}</span>
                  </p>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-5">
                  <label className="text-xs text-yellow-600 uppercase font-bold tracking-wider">Current Status</label>
                  <div className="mt-2">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-semibold ${getStatusColor(selectedEnquiry.status)}`}>
                      {getStatusIcon(selectedEnquiry.status)}
                      <span className="ml-1">{selectedEnquiry.status.toUpperCase()}</span>
                    </span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-5">
                  <label className="text-xs text-teal-600 uppercase font-bold tracking-wider">Registration Date</label>
                  <p className="text-lg font-semibold text-gray-900 mt-2 flex items-center">
                    <Calendar size={18} className="mr-2 text-teal-600" />
                    {new Date(selectedEnquiry.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              
              {selectedEnquiry.message && (
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5">
                  <label className="text-xs text-gray-600 uppercase font-bold tracking-wider flex items-center">
                    <MessageCircle size={14} className="mr-1" />
                    Message
                  </label>
                  <p className="text-gray-700 mt-2 leading-relaxed">{selectedEnquiry.message}</p>
                </div>
              )}
            </div>
            <div className="border-t p-6 bg-gray-50 rounded-b-2xl">
              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform transition-all">
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-red-100 rounded-full p-3 animate-pulse">
                  <AlertCircle className="text-red-600 w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center text-gray-900 mb-2">Confirm Deletion</h3>
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to delete this partnership enquiry? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}