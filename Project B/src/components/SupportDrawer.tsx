import { useState } from 'react';
import { X, Star, Check, Sparkles } from 'lucide-react';

interface SupportDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  creatorName: string;
}

interface SupportTier {
  id: string;
  coins: number;
  label: string;
  description: string;
  emoji: string;
  popular?: boolean;
}

const supportTiers: SupportTier[] = [
  {
    id: '1',
    coins: 10,
    label: 'Helpful Lesson',
    description: 'Show appreciation for quality content',
    emoji: '✨',
  },
  {
    id: '2',
    coins: 25,
    label: 'Great Teacher',
    description: 'Support exceptional teaching',
    emoji: '🌟',
    popular: true,
  },
  {
    id: '3',
    coins: 50,
    label: 'Top Educator',
    description: 'Recognize outstanding effort',
    emoji: '🏆',
  },
  {
    id: '4',
    coins: 100,
    label: 'Master Class',
    description: 'Celebrate transformative learning',
    emoji: '👑',
  },
  {
    id: '5',
    coins: 250,
    label: 'Super Supporter',
    description: 'Make a meaningful impact',
    emoji: '💎',
  },
];

export function SupportDrawer({ isOpen, onClose, creatorName }: SupportDrawerProps) {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSupport = () => {
    // Here you would integrate with the token economy system
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
      setSelectedTier(null);
      setCustomAmount('');
      setIsCustom(false);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Bottom Sheet Drawer */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-b from-gray-900 to-black rounded-t-3xl z-50 max-w-md mx-auto max-h-[85vh] flex flex-col animate-slide-up shadow-2xl border-t border-white/10">
        
        {/* Success State */}
        {showSuccess && (
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black rounded-t-3xl z-10 flex items-center justify-center">
            <div className="text-center space-y-4 animate-in zoom-in duration-300">
              <div className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
                <Check className="w-10 h-10 text-green-400" />
              </div>
              <div>
                <h3 className="text-white text-xl mb-2">Support Sent!</h3>
                <p className="text-gray-400 text-sm">Thank you for supporting {creatorName}</p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col p-5 border-b border-white/10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Star className="w-6 h-6 text-white/40 absolute top-0.5 left-0.5" />
                <Star className="w-6 h-6 text-white fill-white" />
              </div>
              <h3 className="text-white text-lg">Support {creatorName}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <p className="text-gray-400 text-sm">
            Gift coins to show your appreciation. 100% goes directly to the creator.
          </p>
        </div>

        {/* Support Tiers */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {supportTiers.map((tier) => (
            <button
              key={tier.id}
              onClick={() => {
                setSelectedTier(tier.id);
                setIsCustom(false);
                setCustomAmount('');
              }}
              className={`w-full p-4 rounded-2xl border transition-all text-left relative ${
                selectedTier === tier.id
                  ? 'bg-blue-500/20 border-blue-500/50 shadow-lg shadow-blue-500/20'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl flex-shrink-0">{tier.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-white font-medium">{tier.label}</h4>
                    {tier.popular && (
                      <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded-full text-xs flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-xs mb-1">{tier.description}</p>
                  <p className="text-blue-400 text-sm font-medium">{tier.coins} coins</p>
                </div>
                {selectedTier === tier.id && (
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </button>
          ))}

          {/* Custom Amount */}
          <button
            onClick={() => {
              setIsCustom(true);
              setSelectedTier(null);
            }}
            className={`w-full p-4 rounded-2xl border transition-all text-left ${
              isCustom
                ? 'bg-blue-500/20 border-blue-500/50 shadow-lg shadow-blue-500/20'
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl flex-shrink-0">💫</div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium mb-1">Custom Amount</h4>
                {isCustom ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="Enter coins"
                      min="1"
                      onClick={(e) => e.stopPropagation()}
                      className="bg-white/10 text-white px-3 py-1.5 rounded-lg border border-white/20 focus:outline-none focus:border-blue-500 w-32 text-sm"
                    />
                    <span className="text-gray-400 text-sm">coins</span>
                  </div>
                ) : (
                  <p className="text-gray-400 text-xs">Choose your own amount</p>
                )}
              </div>
              {isCustom && (
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </button>
        </div>

        {/* Action Button */}
        <div className="p-5 border-t border-white/10 bg-black/50 backdrop-blur-xl">
          <button
            onClick={handleSupport}
            disabled={!selectedTier && (!isCustom || !customAmount || parseInt(customAmount) < 1)}
            className={`w-full py-4 rounded-full font-medium transition-all ${
              (selectedTier || (isCustom && customAmount && parseInt(customAmount) >= 1))
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg shadow-blue-500/30'
                : 'bg-white/5 text-gray-600 cursor-not-allowed'
            }`}
          >
            {selectedTier
              ? `Gift ${supportTiers.find(t => t.id === selectedTier)?.coins} Coins`
              : isCustom && customAmount
              ? `Gift ${customAmount} Coins`
              : 'Select an Amount'}
          </button>
          
          {/* Info Text */}
          <p className="text-gray-500 text-xs text-center mt-3">
            Supporting creators helps them continue making quality educational content
          </p>
        </div>
      </div>
    </>
  );
}
