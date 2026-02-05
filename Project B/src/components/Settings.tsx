import { ArrowLeft, User, Lock, Bell, Eye, Shield, HelpCircle, Info, LogOut, ChevronRight, Moon, Globe, Volume2, BarChart3, DollarSign, Coins, TrendingUp, Award } from 'lucide-react';

interface SettingsProps {
  onBack: () => void;
  onOpenStudio?: () => void;
  onOpenEarnings?: () => void;
  onOpenWallet?: () => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export function Settings({ onBack, onOpenStudio, onOpenEarnings, onOpenWallet, theme = 'dark', onToggleTheme }: SettingsProps) {
  // Mock insights data - this would come from backend
  const insightsData = {
    totalViews: '176K',
    avgEngagement: '4.2%',
    topVideo: 'Einstein\'s Relativity',
    recentGrowth: '+12%',
    mostHelpful: 'Calculus Made Simple',
    helpedLearners: '2.1K'
  };

  const settingsSections = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Edit Profile', value: '', action: true },
        { icon: Lock, label: 'Password & Security', value: '', action: true },
        { icon: Eye, label: 'Privacy', value: '', action: true },
      ]
    },
    {
      title: 'Creator Tools',
      items: [
        { icon: BarChart3, label: 'Studio', value: '', action: true, onClick: onOpenStudio },
        { icon: DollarSign, label: 'Earnings', value: '', action: true, onClick: onOpenEarnings },
        { icon: Coins, label: 'Wallet', value: '', action: true, onClick: onOpenWallet },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { icon: Bell, label: 'Notifications', value: 'On', action: true },
        { icon: Moon, label: 'Dark Mode', value: theme === 'dark' ? 'On' : 'Off', action: true, onClick: onToggleTheme },
        { icon: Globe, label: 'Language', value: 'English', action: true },
        { icon: Volume2, label: 'Sound Effects', value: 'On', action: true },
      ]
    },
    {
      title: 'Content',
      items: [
        { icon: Eye, label: 'Watch History', value: '', action: true },
        { icon: Shield, label: 'Blocked Accounts', value: '3', action: true },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help Center', value: '', action: true },
        { icon: Info, label: 'About', value: 'v1.0.0', action: true },
      ]
    }
  ];

  return (
    <div className={`h-screen ${theme === 'dark' ? 'bg-neutral-950' : 'bg-gray-50'} flex flex-col`}>
      {/* Header */}
      <div className={`${theme === 'dark' ? 'bg-neutral-950 border-white/10' : 'bg-white border-gray-200'} border-b p-4`}>
        <div className="flex items-center gap-3">
          <button onClick={onBack} className={`p-2 ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-100'} rounded-full transition-colors`}>
            <ArrowLeft className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} />
          </button>
          <h2 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-medium`}>Settings</h2>
        </div>
      </div>

      {/* Settings List */}
      <div className="flex-1 overflow-y-auto">
        {settingsSections.map((section, index) => (
          <div key={index} className="py-4">
            <h3 className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm px-6 mb-2`}>{section.title}</h3>
            <div className={theme === 'dark' ? 'bg-neutral-950' : 'bg-gray-50'}>
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <button
                    key={itemIndex}
                    onClick={item.onClick}
                    className={`w-full flex items-center gap-4 px-6 py-4 ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-100'} transition-colors`}
                  >
                    <div className={`w-10 h-10 ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-200'} rounded-full flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                    </div>
                    <div className="flex-1 text-left">
                      <div className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{item.label}</div>
                      {item.value && (
                        <div className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{item.value}</div>
                      )}
                    </div>
                    <ChevronRight className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Logout */}
        <div className="p-4">
          <button className="w-full flex items-center justify-center gap-2 py-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl hover:bg-red-500/20 transition-colors">
            <LogOut className="w-5 h-5" />
            Log Out
          </button>
        </div>

        {/* Footer */}
        <div className={`p-6 text-center ${theme === 'dark' ? 'text-gray-600' : 'text-gray-500'} text-sm`}>
          <p>Project B v1.0.0</p>
          <div className="flex justify-center gap-4 mt-2">
            <button className={`${theme === 'dark' ? 'hover:text-gray-400' : 'hover:text-gray-700'} transition-colors`}>Terms</button>
            <button className={`${theme === 'dark' ? 'hover:text-gray-400' : 'hover:text-gray-700'} transition-colors`}>Privacy</button>
            <button className={`${theme === 'dark' ? 'hover:text-gray-400' : 'hover:text-gray-700'} transition-colors`}>Help</button>
          </div>
        </div>
      </div>
    </div>
  );
}