import { useState } from 'react';
import { ArrowLeft, TrendingUp, Eye, Heart, MessageCircle, Share2, Users, Clock, DollarSign, Video, Award } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CreatorStudioProps {
  onBack: () => void;
  theme?: 'light' | 'dark';
}

export function CreatorStudio({ onBack }: CreatorStudioProps) {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  // Teaching impact data
  const insightsData = {
    totalViews: '176K',
    avgEngagement: '4.2%',
    topVideo: 'Einstein\'s Relativity',
    recentGrowth: '+12%',
    mostHelpful: 'Calculus Made Simple',
    helpedLearners: '2.1K'
  };

  const viewsData = [
    { date: 'Mon', views: 12400 },
    { date: 'Tue', views: 15800 },
    { date: 'Wed', views: 13200 },
    { date: 'Thu', views: 18900 },
    { date: 'Fri', views: 22100 },
    { date: 'Sat', views: 25600 },
    { date: 'Sun', views: 21300 }
  ];

  const engagementData = [
    { metric: 'Likes', count: 45000 },
    { metric: 'Comments', count: 12000 },
    { metric: 'Shares', count: 8500 },
    { metric: 'Saves', count: 15200 }
  ];

  const topVideos = [
    {
      id: '1',
      thumbnail: '🔬',
      title: 'Quantum Physics Explained',
      views: '2.3M',
      likes: '145K',
      engagement: '8.2%'
    },
    {
      id: '2',
      thumbnail: '🧪',
      title: 'Chemistry Magic Tricks',
      views: '1.8M',
      likes: '98K',
      engagement: '7.5%'
    },
    {
      id: '3',
      thumbnail: '📐',
      title: 'Math Shortcuts',
      views: '1.5M',
      likes: '87K',
      engagement: '6.9%'
    }
  ];

  const stats = [
    { label: 'Total Views', value: '12.4M', change: '+12.5%', icon: Eye, color: 'from-blue-500 to-blue-600' },
    { label: 'Followers', value: '234K', change: '+8.3%', icon: Users, color: 'from-purple-500 to-purple-600' },
    { label: 'Engagement', value: '7.8%', change: '+2.1%', icon: Heart, color: 'from-pink-500 to-pink-600' },
    { label: 'Watch Time', value: '45.2K hrs', change: '+15.7%', icon: Clock, color: 'from-green-500 to-green-600' }
  ];

  return (
    <div className="h-screen bg-neutral-950 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-neutral-950 border-b border-white/10 p-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h2 className="text-white font-medium">Creator Studio</h2>
          <div className="w-9" />
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2">
          {(['7d', '30d', '90d'] as const).map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                timeRange === range
                  ? 'bg-white text-black'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {range === '7d' ? 'Last 7 days' : range === '30d' ? 'Last 30 days' : 'Last 90 days'}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Your Teaching Impact */}
        <div>
          <h3 className="text-gray-400 text-sm px-2 mb-3">Your Teaching Impact</h3>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-gray-400 text-xs mb-2">Total Views</div>
              <div className="text-white text-2xl mb-1">{insightsData.totalViews}</div>
              <div className="flex items-center gap-1 text-green-500 text-xs">
                <TrendingUp className="w-3 h-3" />
                {insightsData.recentGrowth} this week
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-gray-400 text-xs mb-2">Avg. Engagement</div>
              <div className="text-white text-2xl mb-1">{insightsData.avgEngagement}</div>
              <div className="text-gray-400 text-xs">Above platform avg</div>
            </div>
          </div>

          {/* Top Performing Content */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-3">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-yellow-500" />
              <h4 className="text-white text-sm font-medium">Top Performing</h4>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Most Viewed</span>
                <span className="text-white text-sm">{insightsData.topVideo}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Most Helpful</span>
                <span className="text-white text-sm">{insightsData.mostHelpful}</span>
              </div>
            </div>
          </div>

          {/* Educational Impact Message */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-gray-300 text-sm leading-relaxed">
              Your contributions have helped <span className="text-white font-medium">{insightsData.helpedLearners} learners</span> understand complex topics. Keep sharing your knowledge!
            </p>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-xl p-4"
              >
                <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-gray-400 text-sm mb-1">{stat.label}</div>
                <div className="flex items-end justify-between">
                  <div className="text-white text-2xl">{stat.value}</div>
                  <div className="text-green-500 text-sm">{stat.change}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Views Chart */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h3 className="text-white font-medium mb-4">Views Over Time</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={viewsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Engagement Chart */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h3 className="text-white font-medium mb-4">Engagement Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="metric" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip />
              <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Performing Videos */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium">Top Performing Videos</h3>
            <button className="text-blue-500 text-sm">View All</button>
          </div>
          <div className="space-y-3">
            {topVideos.map(video => (
              <div key={video.id} className="flex gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                <div className="w-20 h-14 bg-gradient-to-br from-white/20 to-white/10 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                  {video.thumbnail}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white line-clamp-1 mb-1 font-medium">{video.title}</h4>
                  <div className="flex items-center gap-3 text-gray-400 text-sm">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {video.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {video.likes}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-500 text-sm">{video.engagement}</div>
                  <div className="text-gray-500 text-xs">engagement</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audience Insights */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h3 className="text-white font-medium mb-4">Audience Insights</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Age 18-24</span>
                <span className="text-white">35%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: '35%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Age 25-34</span>
                <span className="text-white">42%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: '42%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Age 35+</span>
                <span className="text-white">23%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: '23%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
