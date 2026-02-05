import { useState } from 'react';
import { X, Coins, Send, Heart, Star, Sparkles, Trophy, Crown, Rocket } from 'lucide-react';

interface GiftingFlowProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
  recipientAvatar: string;
}

export function GiftingFlow({ isOpen, onClose, recipientName, recipientAvatar }: GiftingFlowProps) {
  const [selectedGift, setSelectedGift] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const gifts = [
    { id: '1', name: 'Heart', icon: '❤️', cost: 5, category: 'basic' },
    { id: '2', name: 'Star', icon: '⭐', cost: 10, category: 'basic' },
    { id: '3', name: 'Sparkle', icon: '✨', cost: 15, category: 'basic' },
    { id: '4', name: 'Trophy', icon: '🏆', cost: 25, category: 'premium' },
    { id: '5', name: 'Crown', icon: '👑', cost: 50, category: 'premium' },
    { id: '6', name: 'Rocket', icon: '🚀', cost: 100, category: 'premium' },
    { id: '7', name: 'Diamond', icon: '💎', cost: 250, category: 'exclusive' },
    { id: '8', name: 'Fire', icon: '🔥', cost: 500, category: 'exclusive' }
  ];

  const handleSend = () => {
    if (selectedGift) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        setSelectedGift(null);
        setMessage('');
      }, 2000);
    }
  };

  if (!isOpen) return null;

  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in">
        <div className="bg-white rounded-3xl p-8 m-4 max-w-sm w-full text-center animate-scale-up">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Send className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-gray-900 text-2xl mb-2">Gift Sent! 🎉</h3>
          <p className="text-gray-600">Your gift has been sent to {recipientName}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-w-md mx-auto h-[85vh] flex flex-col animate-slide-up">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900 text-xl">Send a Gift</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Recipient */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl">
              {recipientAvatar}
            </div>
            <div>
              <div className="text-gray-900">{recipientName}</div>
              <div className="text-gray-500 text-sm">Show your appreciation</div>
            </div>
          </div>
        </div>

        {/* Gift Selection */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Balance */}
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl p-4 mb-4 flex items-center justify-between">
            <div>
              <div className="text-white/80 text-sm">Your Balance</div>
              <div className="text-2xl flex items-center gap-2">
                <Coins className="w-6 h-6" />
                825 Tokens
              </div>
            </div>
            <button className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm hover:bg-white/30">
              Buy More
            </button>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            {/* Basic Gifts */}
            <div>
              <h4 className="text-gray-900 mb-3">Basic Gifts</h4>
              <div className="grid grid-cols-3 gap-3">
                {gifts.filter(g => g.category === 'basic').map(gift => (
                  <button
                    key={gift.id}
                    onClick={() => setSelectedGift(gift.id)}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      selectedGift === gift.id
                        ? 'border-blue-500 bg-blue-50 scale-105'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="text-4xl mb-2">{gift.icon}</div>
                    <div className="text-gray-900 text-sm mb-1">{gift.name}</div>
                    <div className="flex items-center justify-center gap-1 text-orange-500 text-xs">
                      <Coins className="w-3 h-3" />
                      {gift.cost}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Premium Gifts */}
            <div>
              <h4 className="text-gray-900 mb-3 flex items-center gap-2">
                Premium Gifts
                <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">Popular</span>
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {gifts.filter(g => g.category === 'premium').map(gift => (
                  <button
                    key={gift.id}
                    onClick={() => setSelectedGift(gift.id)}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      selectedGift === gift.id
                        ? 'border-purple-500 bg-purple-50 scale-105'
                        : 'border-purple-200 bg-gradient-to-br from-purple-50 to-white hover:border-purple-300'
                    }`}
                  >
                    <div className="text-4xl mb-2">{gift.icon}</div>
                    <div className="text-gray-900 text-sm mb-1">{gift.name}</div>
                    <div className="flex items-center justify-center gap-1 text-orange-500 text-xs">
                      <Coins className="w-3 h-3" />
                      {gift.cost}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Exclusive Gifts */}
            <div>
              <h4 className="text-gray-900 mb-3 flex items-center gap-2">
                Exclusive Gifts
                <span className="text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full">VIP</span>
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {gifts.filter(g => g.category === 'exclusive').map(gift => (
                  <button
                    key={gift.id}
                    onClick={() => setSelectedGift(gift.id)}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      selectedGift === gift.id
                        ? 'border-yellow-500 bg-yellow-50 scale-105'
                        : 'border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50 hover:border-yellow-300'
                    }`}
                  >
                    <div className="text-5xl mb-2">{gift.icon}</div>
                    <div className="text-gray-900 mb-1">{gift.name}</div>
                    <div className="flex items-center justify-center gap-1 text-orange-500">
                      <Coins className="w-4 h-4" />
                      {gift.cost}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="mt-6">
            <label className="text-gray-900 mb-2 block">Add a message (optional)</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Say something nice..."
              className="w-full bg-gray-100 text-gray-900 px-4 py-3 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-white">
          {selectedGift ? (
            <div className="mb-3 p-3 bg-blue-50 rounded-xl flex items-center justify-between">
              <span className="text-gray-700">Total Cost</span>
              <div className="flex items-center gap-2 text-orange-600">
                <Coins className="w-5 h-5" />
                <span className="text-xl">
                  {gifts.find(g => g.id === selectedGift)?.cost}
                </span>
              </div>
            </div>
          ) : null}
          <button
            onClick={handleSend}
            disabled={!selectedGift}
            className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 transition-all ${
              selectedGift
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
            Send Gift
          </button>
        </div>
      </div>
    </>
  );
}
