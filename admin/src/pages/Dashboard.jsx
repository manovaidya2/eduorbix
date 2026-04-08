import React, { useState, useEffect } from "react";
import { 
  FaCalendarCheck, 
  FaBlog, 
  FaFlask, 
  FaUsers, 
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaUserMd,
  FaStethoscope,
  FaBrain,
  FaHeartbeat,
  FaChartLine,
  FaSpinner,
  FaArrowUp,
  FaArrowDown,
  FaEllipsisV,
  FaSearch,
  FaBell,
  FaUserCircle
} from "react-icons/fa";
import { 
  MdAppShortcut, 
  MdOutlineArticle, 
  MdScience,
  MdOutlineTrendingUp,
  MdOutlineTrendingDown,
  MdMoreVert,
  MdRefresh
} from "react-icons/md";
import { GiHealthNormal, GiHealing, GiMeditation } from "react-icons/gi";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';
import axiosInstance from "../api/axiosInstance";
import { format, formatDistance } from "date-fns";
import { toast } from "react-hot-toast";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

const Dashboard = () => {
  const [role, setRole] = useState("admin");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    appointments: { total: 0, today: 0, upcoming: 0, completed: 0, growth: 0 },
    blogs: { total: 0, published: 0, drafts: 0, growth: 0 },
    caseStudies: { total: 0, published: 0, drafts: 0, growth: 0 },
    users: { total: 0, active: 0, new: 0, growth: 0 }
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [chartData, setChartData] = useState({
    appointments: [],
    blogs: [],
    caseStudies: [],
    labels: []
  });
  const [selectedTimeRange, setSelectedTimeRange] = useState("week");
  const [hoveredItem, setHoveredItem] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New appointment booked", time: "5 min ago", read: false },
    { id: 2, message: "Blog published successfully", time: "1 hour ago", read: false },
    { id: 3, message: "Case study updated", time: "3 hours ago", read: true },
  ]);

  // Fetch all dashboard data
  const fetchDashboardData = async () => {
    try {
      setRefreshing(true);
      
      // Fetch appointments
      const appointmentsRes = await axiosInstance.get("/appointments/admin/all");
      const appointments = appointmentsRes.data.appointments || [];
      
      // Fetch blogs
      const blogsRes = await axiosInstance.get("/blogs");
      const blogs = blogsRes.data || [];
      
      // Fetch case studies
      const caseStudiesRes = await axiosInstance.get("/blogs");
      const caseStudies = caseStudiesRes.data || [];

      // Calculate stats
      const today = new Date().toDateString();
      const todayAppointments = appointments.filter(apt => 
        new Date(apt.date).toDateString() === today
      );
      
      const upcomingAppointments = appointments.filter(apt => 
        new Date(apt.date) > new Date()
      );

      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      
      const lastMonthAppointments = appointments.filter(apt => 
        new Date(apt.createdAt) > lastMonth
      ).length;

      const previousMonth = new Date();
      previousMonth.setMonth(previousMonth.getMonth() - 2);
      
      const previousMonthAppointments = appointments.filter(apt => 
        new Date(apt.createdAt) > previousMonth && new Date(apt.createdAt) <= lastMonth
      ).length;

      const appointmentGrowth = previousMonthAppointments === 0 ? 100 : 
        ((lastMonthAppointments - previousMonthAppointments) / previousMonthAppointments * 100).toFixed(1);

      setStats({
        appointments: {
          total: appointments.length,
          today: todayAppointments.length,
          upcoming: upcomingAppointments.length,
          completed: appointments.length - upcomingAppointments.length,
          growth: appointmentGrowth
        },
        blogs: {
          total: blogs.length,
          published: blogs.filter(b => b.published !== false).length,
          drafts: blogs.filter(b => b.published === false).length,
          growth: ((blogs.length - (blogs.length * 0.8)) / (blogs.length || 1) * 100).toFixed(1)
        },
        caseStudies: {
          total: caseStudies.length,
          published: caseStudies.filter(c => c.published !== false).length,
          drafts: caseStudies.filter(c => c.published === false).length,
          growth: ((caseStudies.length - (caseStudies.length * 0.9)) / (caseStudies.length || 1) * 100).toFixed(1)
        },
        users: {
          total: 1250,
          active: 890,
          new: 45,
          growth: 12.5
        }
      });

      // Generate recent activities
      const activities = [
        ...appointments.slice(0, 5).map(apt => ({
          id: apt._id,
          type: "appointment",
          title: `New appointment from ${apt.name}`,
          time: apt.createdAt,
          icon: FaCalendarCheck,
          color: "blue",
          data: apt
        })),
        ...blogs.slice(0, 3).map(blog => ({
          id: blog._id,
          type: "blog",
          title: `Blog "${blog.title}" ${blog.published ? 'published' : 'updated'}`,
          time: blog.createdAt,
          icon: FaBlog,
          color: "green",
          data: blog
        })),
        ...caseStudies.slice(0, 3).map(cs => ({
          id: cs._id,
          type: "caseStudy",
          title: `Case study "${cs.title}" updated`,
          time: cs.createdAt,
          icon: FaFlask,
          color: "purple",
          data: cs
        }))
      ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 8);

      setRecentActivities(activities);

      // Generate chart data
      const last7Days = [...Array(7)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toLocaleDateString('en-US', { weekday: 'short' });
      }).reverse();

      const appointmentsPerDay = last7Days.map(day => {
        return appointments.filter(apt => 
          format(new Date(apt.createdAt), 'EEE') === day
        ).length;
      });

      setChartData({
        labels: last7Days,
        appointments: appointmentsPerDay,
        blogs: [4, 3, 6, 8, 5, 7, 9],
        caseStudies: [2, 1, 3, 4, 2, 3, 5]
      });

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    
    // Refresh data every 5 minutes
    const interval = setInterval(fetchDashboardData, 300000);
    return () => clearInterval(interval);
  }, []);

  // Chart configurations
  const lineChartData = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Appointments',
        data: chartData.appointments,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      }
    ]
  };

  const barChartData = {
    labels: ['Blogs', 'Case Studies', 'Appointments'],
    datasets: [
      {
        label: 'Current Month',
        data: [stats.blogs.total, stats.caseStudies.total, stats.appointments.total],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(59, 130, 246, 0.8)',
        ],
        borderRadius: 8,
      }
    ]
  };

  const doughnutData = {
    labels: ['Completed', 'Upcoming', 'Today'],
    datasets: [
      {
        data: [stats.appointments.completed, stats.appointments.upcoming, stats.appointments.today],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(234, 179, 8, 0.8)',
          'rgba(59, 130, 246, 0.8)',
        ],
        borderWidth: 0,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 12,
        cornerRadius: 8,
      }
    },
    scales: {
      y: {
        grid: {
          display: true,
          color: 'rgba(0,0,0,0.05)',
        },
        beginAtZero: true,
      },
      x: {
        grid: {
          display: false,
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: { size: 12 }
        }
      }
    },
    cutout: '70%',
  };

  const StatCard = ({ title, value, icon: Icon, color, growth, subtitle, onClick }) => (
    <div 
      className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
      onClick={onClick}
      onMouseEnter={() => setHoveredItem(title)}
      onMouseLeave={() => setHoveredItem(null)}
    >
      {/* Animated background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
      
      {/* Decorative circle */}
      <div className={`absolute -top-4 -right-4 w-24 h-24 bg-${color.split('-')[1]}-100 rounded-full opacity-30 group-hover:scale-150 transition-transform duration-500`}></div>
      
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 bg-${color.split('-')[1]}-50 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-6 h-6 text-${color.split('-')[1]}-600`} />
        </div>
      </div>
      
      {growth !== undefined && (
        <div className="mt-4 flex items-center gap-2">
          <div className={`flex items-center gap-1 text-sm ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {growth >= 0 ? <FaArrowUp className="w-3 h-3" /> : <FaArrowDown className="w-3 h-3" />}
            <span className="font-medium">{Math.abs(growth)}%</span>
          </div>
          <span className="text-xs text-gray-400">vs last month</span>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FaHeartbeat className="w-8 h-8 text-indigo-600 animate-pulse" />
            </div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-8 relative">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <div className="relative mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 flex items-center gap-3">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Dashboard
              </span>
              <button 
                onClick={fetchDashboardData}
                className="p-2 hover:bg-white rounded-full transition-all duration-300 group"
                disabled={refreshing}
              >
                <MdRefresh className={`w-5 h-5 text-gray-500 group-hover:text-indigo-600 group-hover:rotate-180 transition-all duration-500 ${refreshing ? 'animate-spin' : ''}`} />
              </button>
            </h1>
            <p className="text-gray-500 mt-1">Welcome back, Dr. Ankush Garg</p>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Time range selector */}
            <select 
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
            >
              <option value="week">Last 7 days</option>
              <option value="month">Last 30 days</option>
              <option value="quarter">Last 3 months</option>
              <option value="year">Last 12 months</option>
            </select>

            {/* Notifications */}
            <div className="relative group">
              <button className="relative p-2 bg-white rounded-xl hover:bg-gray-50 transition-colors">
                <FaBell className="w-5 h-5 text-gray-600" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                )}
              </button>
              
              {/* Notifications dropdown - can be implemented later */}
            </div>

            {/* Profile */}
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl">
              <FaUserCircle className="w-8 h-8 text-indigo-600" />
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-gray-700">Dr. Ankush Garg</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>
        </div>

        {/* Role selector */}
        
      </div>

      {/* Stats Grid */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Appointments"
          value={stats.appointments.total}
          icon={FaCalendarCheck}
          color="from-blue-500 to-indigo-500"
          growth={stats.appointments.growth}
          subtitle={`${stats.appointments.today} today, ${stats.appointments.upcoming} upcoming`}
          onClick={() => window.location.href = '/appointments'}
        />
        
        <StatCard
          title="Blog Posts"
          value={stats.blogs.total}
          icon={FaBlog}
          color="from-green-500 to-emerald-500"
          growth={stats.blogs.growth}
          subtitle={`${stats.blogs.published} published, ${stats.blogs.drafts} drafts`}
          onClick={() => window.location.href = '/blog-list'}
        />
        
        <StatCard
          title="Case Studies"
          value={stats.caseStudies.total}
          icon={FaFlask}
          color="from-purple-500 to-pink-500"
          growth={stats.caseStudies.growth}
          subtitle={`${stats.caseStudies.published} active studies`}
          onClick={() => window.location.href = '/case-studies'}
        />
        
        <StatCard
          title="Active Users"
          value={stats.users.active}
          icon={FaUsers}
          color="from-orange-500 to-red-500"
          growth={stats.users.growth}
          subtitle={`${stats.users.new} new this week`}
        />
      </div>

      {/* Charts Row */}
      <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Line Chart - Appointments Trend */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Appointments Trend</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Last 7 days</span>
              <FaChartLine className="w-4 h-4 text-indigo-600" />
            </div>
          </div>
          <div className="h-64">
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </div>

        {/* Doughnut Chart - Appointment Status */}
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Appointment Status</h3>
          <div className="h-48">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Bar Chart - Content Distribution */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Content Distribution</h3>
          <div className="h-64">
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {[
              { icon: FaCalendarCheck, label: "New Appointment", color: "blue", path: "/appointments/new" },
              { icon: FaBlog, label: "Write Blog", color: "green", path: "/admin/add-blog" },
              { icon: FaFlask, label: "Add Case Study", color: "purple", path: "/admin/add-case-study" },
              { icon: FaUsers, label: "Manage Users", color: "orange", path: "/users" },
            ].map((action, index) => (
              <button
                key={index}
                onClick={() => window.location.href = action.path}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all group"
              >
                <div className={`p-2 bg-${action.color}-50 rounded-lg group-hover:scale-110 transition-transform`}>
                  <action.icon className={`w-4 h-4 text-${action.color}-600`} />
                </div>
                <span className="text-sm font-medium text-gray-700">{action.label}</span>
                <FaArrowUp className="w-3 h-3 text-gray-400 ml-auto rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
          <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div 
              key={activity.id}
              className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all group"
            >
              <div className={`p-2 bg-${activity.color}-50 rounded-lg group-hover:scale-110 transition-transform`}>
                <activity.icon className={`w-4 h-4 text-${activity.color}-600`} />
              </div>
              
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{activity.title}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDistance(new Date(activity.time), new Date(), { addSuffix: true })}
                </p>
              </div>

              {activity.type === 'appointment' && activity.data && (
                <div className="text-right">
                  <p className="text-xs font-medium text-gray-700">{activity.data.name}</p>
                  <p className="text-xs text-gray-500">{activity.data.phone}</p>
                </div>
              )}

              <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MdMoreVert className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          ))}

          {recentActivities.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No recent activities</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;