import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { 
  Pencil, Trash2, Plus, Search, Eye, Loader2, 
  BookOpen, Calendar, Image as ImageIcon, TrendingUp,
  Filter, Download, ChevronLeft, ChevronRight,
  X, AlertCircle, Clock, CheckCircle, XCircle
} from 'lucide-react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

// Simple Delete Modal Component (defined outside to avoid re-renders)
const DeleteModal = ({ isOpen, onClose, onConfirm, title, isDeleting }) => {
  if (!isOpen) return null;

  // Stop event propagation to prevent backdrop click issues
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] overflow-y-auto" 
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={handleBackdropClick}
    >
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Modal */}
        <div 
          className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          onClick={e => e.stopPropagation()}
        >
          <div className="bg-white px-6 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-semibold text-gray-900">
                  Delete Case Study
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete <span className="font-medium text-gray-900">"{title}"</span>? 
                    This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-3">
            <button
              type="button"
              onClick={onConfirm}
              disabled={isDeleting}
              className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:w-auto sm:text-sm transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Skeleton Loader for Table (optimized)
const TableSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4">
      <div className="flex gap-4">
        <div className="h-4 bg-gray-200 rounded w-16"></div>
        <div className="h-4 bg-gray-200 rounded w-32"></div>
        <div className="h-4 bg-gray-200 rounded w-48"></div>
        <div className="h-4 bg-gray-200 rounded w-24"></div>
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
    
    {[1, 2, 3, 4, 5].map((item) => (
      <div key={item} className="border-t border-gray-100 px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gray-200 rounded-xl"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-48 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-32 hidden lg:block"></div>
          <div className="h-4 bg-gray-200 rounded w-24 hidden md:block"></div>
          <div className="flex gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
            <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
            <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// Quick Stats Card
const StatsCard = ({ icon: Icon, label, value, color, trend, delay }) => (
  <div 
    className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300 hover:scale-105"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600 font-medium">{label}</p>
        <p className="text-2xl font-bold text-gray-800 mt-2">{value}</p>
        {trend && (
          <div className="flex items-center mt-2 text-xs text-green-600">
            <TrendingUp className="w-3 h-3 mr-1" />
            <span>{trend}</span>
          </div>
        )}
      </div>
      <div className={`p-3 rounded-lg ${color} shadow-lg`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

// Table Row Component
const TableRow = ({ cs, index, onView, onEdit, onDelete }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const getImageSrc = () => {
    if (!cs.image) return null;
    if (cs.image.startsWith('data:')) return cs.image;
    if (cs.image.startsWith('http')) return cs.image;
    return `https://api.drankushgarg.com/${cs.image}`;
  };

  const getStatusColor = () => {
    if (cs.image && cs.shortDescription) return 'text-green-600 bg-green-50';
    if (cs.image || cs.shortDescription) return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  const getStatusIcon = () => {
    if (cs.image && cs.shortDescription) return <CheckCircle className="w-3 h-3" />;
    if (cs.image || cs.shortDescription) return <Clock className="w-3 h-3" />;
    return <XCircle className="w-3 h-3" />;
  };

  return (
    <tr className="hover:bg-gray-50 transition-all duration-200 group border-b border-gray-100 last:border-0">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="relative">
          {cs.image && !imageError ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl">
                  <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                </div>
              )}
              <img
                src={getImageSrc()}
                alt={cs.title}
                className={`w-14 h-14 object-cover rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-105 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                loading="lazy"
              />
            </>
          ) : (
            <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <ImageIcon className="w-6 h-6 text-purple-400" />
            </div>
          )}
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
              {cs.title}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor()}`}>
              {getStatusIcon()}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-500 font-mono bg-gray-50 px-2 py-0.5 rounded-full">
              /{cs.slug}
            </span>
            {cs.createdAt && (
              <span className="text-xs text-gray-400 flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {new Date(cs.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            )}
          </div>
        </div>
      </td>

      <td className="px-6 py-4 hidden lg:table-cell">
        <div className="max-w-xs">
          <p className="text-sm text-gray-600 line-clamp-2">
            {cs.shortDescription || (
              <span className="text-gray-400 italic">No description added</span>
            )}
          </p>
        </div>
      </td>

      <td className="px-6 py-4 hidden md:table-cell">
        <div className="flex flex-col gap-1">
          <div className="flex items-center text-xs text-gray-500">
            <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
              cs.image ? 'bg-green-500' : 'bg-gray-300'
            }`}></span>
            {cs.image ? 'Has image' : 'No image'}
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
              cs.shortDescription ? 'bg-green-500' : 'bg-gray-300'
            }`}></span>
            {cs.shortDescription ? 'Has description' : 'No description'}
          </div>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-1">
          <button
            onClick={() => onView(cs.slug)}
            className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 hover:scale-110"
            title="View"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onEdit(cs._id)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-110"
            title="Edit"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(cs)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

// Main Component
const CaseStudiesList = () => {
  const navigate = useNavigate();
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, title: '' });
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Filter states
  const [filterDate, setFilterDate] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  // Fetch case studies with 2-second loading simulation
  const fetchCaseStudies = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate 2 second loading
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const response = await axiosInstance.get('/case-studies');
      console.log('Fetched case studies:', response.data);
      setCaseStudies(response.data);
    } catch (error) {
      toast.error('Failed to fetch case studies');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCaseStudies();
  }, [fetchCaseStudies]);

  // Delete case study
  const handleDelete = async () => {
    if (!deleteModal.id) return;
    
    setIsDeleting(true);
    try {
      await axiosInstance.delete(`/case-studies/${deleteModal.id}`);
      toast.success('Case study deleted successfully');
      
      // Update state
      setCaseStudies(prev => prev.filter(cs => cs._id !== deleteModal.id));
      
      // Close modal
      setDeleteModal({ isOpen: false, id: null, title: '' });
    } catch (error) {
      toast.error('Failed to delete case study');
      console.error('Delete error:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Filter and search logic
  const filteredCaseStudies = useMemo(() => {
    return caseStudies.filter(cs => {
      const matchesSearch = searchTerm === '' || 
        cs.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cs.slug?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (cs.shortDescription?.toLowerCase() || '').includes(searchTerm.toLowerCase());
      
      const matchesDate = filterDate ? 
        new Date(cs.createdAt).toISOString().split('T')[0] === filterDate : 
        true;

      const matchesStatus = filterStatus === 'all' ? true :
        filterStatus === 'withImage' ? cs.image :
        filterStatus === 'withDescription' ? cs.shortDescription :
        true;
      
      return matchesSearch && matchesDate && matchesStatus;
    });
  }, [caseStudies, searchTerm, filterDate, filterStatus]);

  // Pagination
  const paginatedData = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredCaseStudies.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredCaseStudies, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredCaseStudies.length / itemsPerPage);

  // Calculate stats
  const stats = useMemo(() => {
    const total = caseStudies.length;
    const withImages = caseStudies.filter(cs => cs.image).length;
    const withDescription = caseStudies.filter(cs => cs.shortDescription).length;
    const thisMonth = new Date().getMonth();
    const thisMonthCount = caseStudies.filter(cs => new Date(cs.createdAt).getMonth() === thisMonth).length;
    
    return { total, withImages, withDescription, thisMonthCount };
  }, [caseStudies]);

  // Handlers
  const handleView = (slug) => window.open(`/case-studies/${slug}`, '_blank');
  
  const handleEdit = (id) => {
    console.log('Navigating to edit page with ID:', id);
    navigate(`/case-studies/edit/${id}`);
  };
  
  const handleDeleteClick = (cs) => {
    console.log('Delete clicked for:', cs);
    setDeleteModal({ isOpen: true, id: cs._id, title: cs.title });
  };

  const handleCloseModal = () => {
    setDeleteModal({ isOpen: false, id: null, title: '' });
  };

  // Export function
  const exportToCSV = useCallback(() => {
    const headers = ['Title', 'Slug', 'Description', 'Has Image', 'Created At'];
    const data = filteredCaseStudies.map(cs => [
      cs.title,
      cs.slug,
      cs.shortDescription || '',
      cs.image ? 'Yes' : 'No',
      new Date(cs.createdAt).toLocaleDateString()
    ]);
    
    const csvContent = [headers, ...data]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `case-studies-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }, [filteredCaseStudies]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Case Studies Dashboard
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Manage and analyze your case studies content
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              <button
                onClick={exportToCSV}
                className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              <button
                onClick={() => navigate('/add-casestudy')}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard 
            icon={BookOpen}
            label="Total Studies"
            value={stats.total}
            color="bg-gradient-to-br from-purple-500 to-purple-600"
            trend={`${stats.thisMonthCount} this month`}
            delay={0}
          />
          <StatsCard 
            icon={ImageIcon}
            label="With Images"
            value={stats.withImages}
            color="bg-gradient-to-br from-blue-500 to-blue-600"
            trend={`${((stats.withImages / stats.total) * 100 || 0).toFixed(0)}% of total`}
            delay={100}
          />
          <StatsCard 
            icon={BookOpen}
            label="With Description"
            value={stats.withDescription}
            color="bg-gradient-to-br from-green-500 to-green-600"
            trend={`${((stats.withDescription / stats.total) * 100 || 0).toFixed(0)}% complete`}
            delay={200}
          />
          <StatsCard 
            icon={TrendingUp}
            label="Completion"
            value={`${((stats.withImages + stats.withDescription) / (stats.total * 2) * 100 || 0).toFixed(0)}%`}
            color="bg-gradient-to-br from-orange-500 to-orange-600"
            trend="Overall quality score"
            delay={300}
          />
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by title, slug, or description..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            >
              <option value="all">All Studies</option>
              <option value="withImage">With Images</option>
              <option value="withDescription">With Description</option>
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center px-4 py-3 border rounded-xl transition-all ${
                showFilters 
                  ? 'bg-purple-50 border-purple-300 text-purple-700' 
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {showFilters && <X className="w-4 h-4 ml-2" onClick={() => setShowFilters(false)} />}
            </button>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filter by Date
                  </label>
                  <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => {
                      setFilterDate(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {loading ? (
            <TableSkeleton />
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Image
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Title & Details
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">
                        Description
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {paginatedData.length > 0 ? (
                      paginatedData.map((cs, index) => (
                        <TableRow
                          key={cs._id}
                          cs={cs}
                          index={index}
                          onView={handleView}
                          onEdit={handleEdit}
                          onDelete={handleDeleteClick}
                        />
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
                              <BookOpen className="w-10 h-10 text-gray-400" />
                            </div>
                            <p className="text-gray-500 text-lg font-medium">
                              {searchTerm || filterDate || filterStatus !== 'all' 
                                ? 'No matching case studies found' 
                                : 'No case studies available'}
                            </p>
                            <p className="text-gray-400 text-sm mt-1">
                              {searchTerm || filterDate || filterStatus !== 'all'
                                ? 'Try adjusting your filters'
                                : 'Click "Add New" to create your first case study'}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {filteredCaseStudies.length > 0 && (
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="text-sm text-gray-600">
                      Showing <span className="font-semibold text-gray-900">
                        {(currentPage - 1) * itemsPerPage + 1}
                      </span> to{' '}
                      <span className="font-semibold text-gray-900">
                        {Math.min(currentPage * itemsPerPage, filteredCaseStudies.length)}
                      </span>{' '}
                      of <span className="font-semibold text-gray-900">{filteredCaseStudies.length}</span> studies
                    </div>

                    {totalPages > 1 && (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className="p-2 border border-gray-300 rounded-lg bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        
                        <div className="flex gap-1">
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
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
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                                  currentPage === pageNum
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          })}
                        </div>

                        <button
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className="p-2 border border-gray-300 rounded-lg bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      {deleteModal.isOpen && (
        <DeleteModal
          isOpen={deleteModal.isOpen}
          onClose={handleCloseModal}
          onConfirm={handleDelete}
          title={deleteModal.title}
          isDeleting={isDeleting}
        />
      )}

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default CaseStudiesList;