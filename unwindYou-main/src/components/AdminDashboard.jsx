import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, MessageCircle, Calendar, TrendingUp, AlertTriangle, Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('7days');
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    activeSessions: 0,
    totalDiscussions: 0,
    totalBookings: 0,
    crisisInterventions: 0,
    resourceViews: 0
  });

  useEffect(() => {
    // Load data from localStorage and generate analytics
    const discussions = JSON.parse(localStorage.getItem('mindcare_discussions') || '[]');
    const bookings = JSON.parse(localStorage.getItem('mindcare_bookings') || '[]');
    
    setDashboardData({
      totalUsers: 1247, // Simulated data
      activeSessions: 89,
      totalDiscussions: discussions.length,
      totalBookings: bookings.length,
      crisisInterventions: 12,
      resourceViews: 3456
    });
  }, []);

  const stats = [
    {
      title: 'Total Active Users',
      value: dashboardData.totalUsers,
      change: '+12%',
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Active Sessions',
      value: dashboardData.activeSessions,
      change: '+8%',
      icon: MessageCircle,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Peer Discussions',
      value: dashboardData.totalDiscussions,
      change: '+15%',
      icon: Users,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Counseling Sessions',
      value: dashboardData.totalBookings,
      change: '+22%',
      icon: Calendar,
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Crisis Interventions',
      value: dashboardData.crisisInterventions,
      change: '-5%',
      icon: AlertTriangle,
      color: 'from-red-500 to-pink-500'
    },
    {
      title: 'Resource Views',
      value: dashboardData.resourceViews,
      change: '+18%',
      icon: BarChart3,
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const mentalHealthTrends = [
    { category: 'Anxiety', percentage: 35, trend: 'up', count: 437 },
    { category: 'Academic Stress', percentage: 28, trend: 'up', count: 349 },
    { category: 'Depression', percentage: 18, trend: 'down', count: 224 },
    { category: 'Sleep Issues', percentage: 12, trend: 'up', count: 150 },
    { category: 'Relationship Issues', percentage: 7, trend: 'stable', count: 87 }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: 'crisis',
      message: 'Crisis intervention triggered for anonymous user',
      timestamp: '2 hours ago',
      severity: 'high'
    },
    {
      id: 2,
      type: 'trend',
      message: 'Spike in anxiety-related discussions detected',
      timestamp: '4 hours ago',
      severity: 'medium'
    },
    {
      id: 3,
      type: 'resource',
      message: 'High demand for sleep-related resources',
      timestamp: '6 hours ago',
      severity: 'low'
    }
  ];

  const handleExportData = () => {
    toast({
      title: "🚧 Data export feature coming soon!",
      description: "Anonymous analytics export functionality will be available soon."
    });
  };

  const handleGenerateReport = () => {
    toast({
      title: "🚧 Report generation feature coming soon!",
      description: "Comprehensive mental health trend reports will be available soon."
    });
  };

  return (
    <div className="pt-24 pb-8 px-4 min-h-screen">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-4">Admin Dashboard</h1>
            <p className="text-gray-600 text-lg">
              Anonymous analytics and mental health trend monitoring
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
              <option value="1year">Last year</option>
            </select>
            <Button variant="outline" onClick={handleExportData}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="stats-card"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded ${
                  stat.change.startsWith('+') ? 'bg-green-100 text-green-800' : 
                  stat.change.startsWith('-') ? 'bg-red-100 text-red-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value.toLocaleString()}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Mental Health Trends */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-3xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Mental Health Trends</h2>
              <TrendingUp className="w-6 h-6 text-blue-500" />
            </div>
            <div className="space-y-4">
              {mentalHealthTrends.map((trend, index) => (
                <div key={trend.category} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-800">{trend.category}</span>
                      <span className="text-sm text-gray-600">{trend.count} cases</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${trend.percentage}%` }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                      />
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <span className="text-lg font-bold text-gray-800">{trend.percentage}%</span>
                    <div className={`text-xs ${
                      trend.trend === 'up' ? 'text-red-500' : 
                      trend.trend === 'down' ? 'text-green-500' : 
                      'text-gray-500'
                    }`}>
                      {trend.trend === 'up' ? '↗' : trend.trend === 'down' ? '↘' : '→'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Alerts */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-effect rounded-3xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Recent Alerts</h2>
              <AlertTriangle className="w-6 h-6 text-orange-500" />
            </div>
            <div className="space-y-4">
              {recentAlerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className={`p-4 rounded-xl border-l-4 ${
                    alert.severity === 'high' ? 'border-red-500 bg-red-50' :
                    alert.severity === 'medium' ? 'border-orange-500 bg-orange-50' :
                    'border-blue-500 bg-blue-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800 mb-1">{alert.message}</p>
                      <p className="text-xs text-gray-600">{alert.timestamp}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                      alert.severity === 'medium' ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {alert.severity}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Usage Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-effect rounded-3xl p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Platform Usage Analytics</h2>
            <Button onClick={handleGenerateReport}>
              Generate Report
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">78%</div>
              <div className="text-sm text-gray-600">AI Chat Engagement</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-3xl font-bold text-green-600 mb-2">92%</div>
              <div className="text-sm text-gray-600">Session Completion Rate</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">65%</div>
              <div className="text-sm text-gray-600">Resource Utilization</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-xl">
              <div className="text-3xl font-bold text-orange-600 mb-2">4.8</div>
              <div className="text-sm text-gray-600">Average User Rating</div>
            </div>
          </div>
        </motion.div>

        {/* Privacy Notice */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-effect rounded-2xl p-6 text-center"
        >
          <div className="flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-blue-500 mr-3" />
            <h3 className="text-lg font-semibold text-gray-800">Privacy-First Analytics</h3>
          </div>
          <p className="text-gray-600 mb-4">
            All data is anonymized and aggregated to protect student privacy while providing valuable insights 
            for improving mental health support services.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              ✓ GDPR Compliant
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              ✓ Anonymous Data
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              ✓ Secure Storage
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              ✓ No Personal Identifiers
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;