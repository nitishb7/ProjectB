import { useState } from 'react';
import { Users, Video, DollarSign, TrendingUp, AlertTriangle, Flag, BarChart3, Settings, Search, Filter } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'content' | 'revenue' | 'reports'>('overview');

  const stats = [
    { label: 'Total Users', value: '2.4M', change: '+12.5%', icon: Users, color: 'from-blue-500 to-blue-600' },
    { label: 'Active Videos', value: '145K', change: '+8.3%', icon: Video, color: 'from-purple-500 to-purple-600' },
    { label: 'Revenue', value: '$1.2M', change: '+15.7%', icon: DollarSign, color: 'from-green-500 to-green-600' },
    { label: 'Engagement', value: '8.2%', change: '+2.1%', icon: TrendingUp, color: 'from-pink-500 to-pink-600' }
  ];

  const userGrowthData = [
    { month: 'Jan', users: 180000 },
    { month: 'Feb', users: 220000 },
    { month: 'Mar', users: 280000 },
    { month: 'Apr', users: 350000 },
    { month: 'May', users: 420000 },
    { month: 'Jun', users: 490000 }
  ];

  const contentData = [
    { category: 'Science', count: 35000 },
    { category: 'Math', count: 28000 },
    { category: 'History', count: 22000 },
    { category: 'Art', count: 18000 },
    { category: 'Tech', count: 25000 },
    { category: 'Other', count: 17000 }
  ];

  const revenueData = [
    { name: 'Ads', value: 45, amount: 540000 },
    { name: 'Gifts', value: 30, amount: 360000 },
    { name: 'Premium', value: 15, amount: 180000 },
    { name: 'Sponsored', value: 10, amount: 120000 }
  ];

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

  const recentReports = [
    { id: '1', type: 'Spam', user: '@spammer123', video: 'Misleading Content', status: 'pending', priority: 'high' },
    { id: '2', type: 'Inappropriate', user: '@badactor', video: 'Offensive Video', status: 'resolved', priority: 'high' },
    { id: '3', type: 'Copyright', user: '@copycat', video: 'Stolen Content', status: 'investigating', priority: 'medium' },
    { id: '4', type: 'Harassment', user: '@troll456', video: 'Bullying Comments', status: 'pending', priority: 'high' }
  ];

  const topCreators = [
    { rank: 1, name: 'Dr. Science', handle: '@drscience', followers: '1.2M', videos: 234, revenue: '$45K' },
    { rank: 2, name: 'Math Genius', handle: '@mathgenius', followers: '980K', videos: 189, revenue: '$38K' },
    { rank: 3, name: 'History Pro', handle: '@historypro', followers: '856K', videos: 156, revenue: '$32K' },
    { rank: 4, name: 'Art Master', handle: '@artmaster', followers: '742K', videos: 198, revenue: '$29K' },
    { rank: 5, name: 'Tech Guru', handle: '@techguru', followers: '698K', videos: 142, revenue: '$27K' }
  ];

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2 text-xl">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
              🎓
            </div>
            <span className="text-gray-900">Admin Panel</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
              activeTab === 'overview'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
              activeTab === 'users'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Users className="w-5 h-5" />
            Users
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
              activeTab === 'content'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Video className="w-5 h-5" />
            Content
          </button>
          <button
            onClick={() => setActiveTab('revenue')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
              activeTab === 'revenue'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <DollarSign className="w-5 h-5" />
            Revenue
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl relative ${
              activeTab === 'reports'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Flag className="w-5 h-5" />
            Reports
            <span className="absolute right-4 top-3 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              4
            </span>
          </button>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl">
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-900 text-2xl mb-1">Dashboard</h1>
              <p className="text-gray-500">Welcome back, Admin</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-gray-100 text-gray-900 pl-10 pr-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200">
                      <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-gray-500 text-sm mb-1">{stat.label}</div>
                      <div className="flex items-end justify-between">
                        <div className="text-gray-900 text-3xl">{stat.value}</div>
                        <div className="text-green-500 text-sm">{stat.change}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <h3 className="text-gray-900 mb-4">User Growth</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" stroke="#999" />
                      <YAxis stroke="#999" />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="users"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ fill: '#3b82f6' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <h3 className="text-gray-900 mb-4">Revenue Distribution</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={revenueData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {revenueData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Content by Category */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="text-gray-900 mb-4">Content by Category</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={contentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="category" stroke="#999" />
                    <YAxis stroke="#999" />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-gray-900">Recent Reports</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {recentReports.map(report => (
                    <div key={report.id} className="p-6 hover:bg-gray-50">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            report.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                          }`} />
                          <div>
                            <div className="text-gray-900 mb-1">{report.type}</div>
                            <div className="text-gray-500 text-sm">
                              User: {report.user} • Video: {report.video}
                            </div>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          report.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          report.status === 'resolved' ? 'bg-green-100 text-green-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {report.status}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm">
                          Review
                        </button>
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
                          Dismiss
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-white rounded-2xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-gray-900">Top Creators</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-gray-600 text-sm">Rank</th>
                      <th className="px-6 py-3 text-left text-gray-600 text-sm">Creator</th>
                      <th className="px-6 py-3 text-left text-gray-600 text-sm">Followers</th>
                      <th className="px-6 py-3 text-left text-gray-600 text-sm">Videos</th>
                      <th className="px-6 py-3 text-left text-gray-600 text-sm">Revenue</th>
                      <th className="px-6 py-3 text-left text-gray-600 text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {topCreators.map(creator => (
                      <tr key={creator.rank} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white">
                            {creator.rank}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-gray-900">{creator.name}</div>
                            <div className="text-gray-500 text-sm">{creator.handle}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-900">{creator.followers}</td>
                        <td className="px-6 py-4 text-gray-900">{creator.videos}</td>
                        <td className="px-6 py-4 text-green-600">{creator.revenue}</td>
                        <td className="px-6 py-4">
                          <button className="text-blue-500 hover:underline text-sm">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
