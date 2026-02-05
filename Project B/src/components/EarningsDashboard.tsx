import { useState } from 'react';
import { ArrowLeft, DollarSign, TrendingUp, Download, Calendar, CreditCard, Zap, Gift, Eye } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface EarningsDashboardProps {
  onBack: () => void;
  theme?: 'light' | 'dark';
}

export function EarningsDashboard({ onBack }: EarningsDashboardProps) {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  const earningsData = [
    { date: 'Week 1', amount: 1240 },
    { date: 'Week 2', amount: 1580 },
    { date: 'Week 3', amount: 1320 },
    { date: 'Week 4', amount: 1890 }
  ];

  const revenueBreakdown = [
    { source: 'Ads', amount: 2450 },
    { source: 'Gifts', amount: 1890 },
    { source: 'Tips', amount: 980 },
    { source: 'Sponsored', amount: 3200 }
  ];

  const recentTransactions = [
    { id: '1', type: 'Ad Revenue', amount: '$245.80', date: 'Nov 24, 2024', icon: Eye, status: 'completed' },
    { id: '2', type: 'Gift Received', amount: '$125.00', date: 'Nov 23, 2024', icon: Gift, status: 'completed' },
    { id: '3', type: 'Tip', amount: '$50.00', date: 'Nov 22, 2024', icon: Zap, status: 'completed' },
    { id: '4', type: 'Sponsored Content', amount: '$800.00', date: 'Nov 21, 2024', icon: TrendingUp, status: 'pending' }
  ];

  return (
    <div className="h-screen bg-neutral-950 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-neutral-950 border-b border-white/10 p-4">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h2 className="text-white font-medium">Earnings</h2>
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <Download className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Total Balance */}
        <div className="text-center mb-6">
          <div className="text-gray-400 text-sm mb-2">Total Balance</div>
          <div className="text-white text-4xl mb-2">$8,520.45</div>
          <div className="flex items-center justify-center gap-2 text-green-500 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+15.3% from last month</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
            <Download className="w-5 h-5 text-white" />
            <span className="text-white">Withdraw</span>
          </button>
          <button className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
            <Calendar className="w-5 h-5 text-white" />
            <span className="text-white">Statement</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Time Range Selector */}
        <div className="flex gap-2">
          {(['week', 'month', 'year'] as const).map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                timeRange === range
                  ? 'bg-white text-black'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>

        {/* Earnings Chart */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h3 className="text-white font-medium mb-4">Earnings Over Time</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: '#10b981' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Breakdown */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h3 className="text-white font-medium mb-4">Revenue Sources</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueBreakdown}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="source" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip />
              <Bar dataKey="amount" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mb-3">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div className="text-gray-400 text-sm mb-1">Ad Revenue</div>
            <div className="text-white text-2xl">$2,450</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mb-3">
              <Gift className="w-5 h-5 text-white" />
            </div>
            <div className="text-gray-400 text-sm mb-1">Gifts & Tips</div>
            <div className="text-white text-2xl">$2,870</div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium">Recent Transactions</h3>
            <button className="text-blue-500 text-sm hover:text-blue-400 transition-colors">View All</button>
          </div>
          <div className="space-y-3">
            {recentTransactions.map(transaction => {
              const Icon = transaction.icon;
              return (
                <div key={transaction.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="w-10 h-10 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white">{transaction.type}</div>
                    <div className="text-gray-400 text-sm">{transaction.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-500">{transaction.amount}</div>
                    <div className={`text-xs ${
                      transaction.status === 'completed' ? 'text-green-500' : 'text-yellow-500'
                    }`}>
                      {transaction.status}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium">Payment Method</h3>
            <button className="text-blue-500 text-sm hover:text-blue-400 transition-colors">Edit</button>
          </div>
          <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <CreditCard className="w-8 h-8 text-white" />
              <div className="text-sm text-white">VISA</div>
            </div>
            <div className="text-lg tracking-wider mb-2 text-white">•••• •••• •••• 4242</div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Sarah Johnson</span>
              <span>12/25</span>
            </div>
          </div>
        </div>

        {/* Tax Information */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <h3 className="text-white mb-2 font-medium">Tax Information</h3>
          <p className="text-gray-400 text-sm mb-3">
            Estimated tax for this period: <span className="text-white">$1,704.09</span>
          </p>
          <button className="text-blue-500 text-sm hover:text-blue-400 transition-colors">
            View tax documents
          </button>
        </div>
      </div>
    </div>
  );
}
