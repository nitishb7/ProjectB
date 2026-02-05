import { useState } from 'react';
import { ArrowLeft, Coins, Plus, Send, History, TrendingUp, Gift, Zap } from 'lucide-react';

interface TokenWalletProps {
  onBack: () => void;
  onSendGift?: () => void;
  theme?: 'light' | 'dark';
}

export function TokenWallet({ onBack, onSendGift }: TokenWalletProps) {
  const [activeTab, setActiveTab] = useState<'wallet' | 'history'>('wallet');

  const tokenPackages = [
    { tokens: 100, price: '$0.99', bonus: null, popular: false },
    { tokens: 500, price: '$4.99', bonus: '+50', popular: true },
    { tokens: 1000, price: '$9.99', bonus: '+150', popular: false },
    { tokens: 5000, price: '$49.99', bonus: '+1000', popular: false }
  ];

  const transactions = [
    { id: '1', type: 'Purchased', amount: '+500', tokens: true, date: 'Nov 24, 2024', icon: Coins },
    { id: '2', type: 'Sent Gift', amount: '-50', tokens: true, date: 'Nov 23, 2024', icon: Gift, recipient: '@profsmith' },
    { id: '3', type: 'Received Tip', amount: '+100', tokens: true, date: 'Nov 22, 2024', icon: Zap },
    { id: '4', type: 'Sent Gift', amount: '-25', tokens: true, date: 'Nov 21, 2024', icon: Gift, recipient: '@sciencegirl' },
    { id: '5', type: 'Purchased', amount: '+1000', tokens: true, date: 'Nov 20, 2024', icon: Coins }
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500 flex flex-col">
      {/* Header */}
      <div className="text-white p-4">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2>Token Wallet</h2>
          <div className="w-9" />
        </div>

        {/* Balance Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Coins className="w-8 h-8 text-yellow-300" />
            <div className="text-5xl">825</div>
          </div>
          <div className="text-center text-white/80">Available Tokens</div>
          <div className="mt-4 pt-4 border-t border-white/20 flex justify-between text-sm">
            <div>
              <div className="text-white/60 mb-1">Earned</div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span>1,240</span>
              </div>
            </div>
            <div>
              <div className="text-white/60 mb-1">Spent</div>
              <div className="flex items-center gap-1">
                <Gift className="w-4 h-4" />
                <span>415</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center gap-2 hover:bg-white/20 border border-white/20">
            <Plus className="w-6 h-6" />
            <span className="text-sm">Buy Tokens</span>
          </button>
          <button 
            onClick={onSendGift}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center gap-2 hover:bg-white/20 border border-white/20"
          >
            <Send className="w-6 h-6" />
            <span className="text-sm">Send Gift</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-t-3xl flex-1 flex flex-col">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('wallet')}
            className={`flex-1 py-4 ${
              activeTab === 'wallet'
                ? 'text-gray-900 border-b-2 border-orange-500'
                : 'text-gray-500'
            }`}
          >
            Buy Tokens
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-4 ${
              activeTab === 'history'
                ? 'text-gray-900 border-b-2 border-orange-500'
                : 'text-gray-500'
            }`}
          >
            History
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'wallet' ? (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-4">
                <h3 className="text-gray-900 mb-2">What are tokens?</h3>
                <p className="text-gray-600 text-sm">
                  Use tokens to send gifts to your favorite creators, unlock premium content, and boost your videos. Creators can convert tokens to real money.
                </p>
              </div>

              {tokenPackages.map((pkg, index) => (
                <div
                  key={index}
                  className={`relative bg-white border-2 rounded-2xl p-4 ${
                    pkg.popular
                      ? 'border-orange-500 shadow-lg'
                      : 'border-gray-200'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm">
                      Most Popular
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Coins className="w-6 h-6 text-orange-500" />
                        <div className="text-gray-900 text-2xl">{pkg.tokens}</div>
                      </div>
                      {pkg.bonus && (
                        <div className="text-green-600 text-sm">+ {pkg.bonus} Bonus</div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-gray-900 text-2xl">{pkg.price}</div>
                    </div>
                  </div>
                  <button className={`w-full py-3 rounded-xl ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  } hover:shadow-md transition-shadow`}>
                    Purchase
                  </button>
                </div>
              ))}

              {/* Payment Methods */}
              <div className="bg-gray-50 rounded-2xl p-4 mt-6">
                <h3 className="text-gray-900 mb-3">Payment Methods</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      💳
                    </div>
                    <span className="text-gray-700">Credit/Debit Card</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      📱
                    </div>
                    <span className="text-gray-700">Apple Pay</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      🟢
                    </div>
                    <span className="text-gray-700">Google Pay</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map(transaction => {
                const Icon = transaction.icon;
                const isPositive = transaction.amount.startsWith('+');
                return (
                  <div key={transaction.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      transaction.type === 'Purchased' ? 'bg-blue-100' :
                      transaction.type === 'Received Tip' ? 'bg-green-100' :
                      'bg-purple-100'
                    }`}>
                      <Icon className="w-5 h-5 text-gray-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-gray-900">{transaction.type}</div>
                      <div className="text-gray-500 text-sm">
                        {transaction.date}
                        {transaction.recipient && ` • ${transaction.recipient}`}
                      </div>
                    </div>
                    <div className={`text-right ${
                      isPositive ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      <div className="flex items-center gap-1">
                        <Coins className="w-4 h-4" />
                        <span>{transaction.amount}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
