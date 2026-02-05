import { Home, Compass, Plus, User } from 'lucide-react';
import { TabType } from '../App';

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const tabs = [
    { id: 'home' as TabType, icon: Home, label: 'Home' },
    { id: 'discover' as TabType, icon: Compass, label: 'Discover' },
    { id: 'create' as TabType, icon: Plus, label: 'Create', emphasized: true },
    { id: 'profile' as TabType, icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto">
      {/* Solid dark background with subtle top border */}
      <div className="bg-[#0A0A0A] border-white/10 border-t backdrop-blur-xl">
        <div className="flex items-center justify-around px-2 py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isCreateButton = tab.emphasized;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative flex flex-col items-center justify-center gap-1 px-6 py-2.5 rounded-xl transition-all duration-300
                  ${isActive ? 'scale-100' : 'scale-95'}
                `}
              >
                {/* Active tab background glow */}
                {isActive && !isCreateButton && (
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-purple-500/10 rounded-xl" />
                )}

                {/* Create button emphasis */}
                {isCreateButton && isActive && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 ring-1 ring-blue-500/30 transition-all duration-300" />
                )}

                {/* Icon with glow effect for active state */}
                <div className="relative">
                  <Icon
                    className={`
                      w-5 h-5 transition-all duration-300 relative z-10
                      ${isActive 
                        ? 'text-white'
                        : 'text-gray-500'
                      }
                    `}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  
                  {/* Subtle glow effect for active icons */}
                  {isActive && (
                    <>
                      <div className="absolute inset-0 blur-md opacity-40">
                        <Icon
                          className={`
                            w-5 h-5
                            ${isCreateButton 
                              ? 'text-purple-400' 
                              : 'text-blue-400'
                            }
                          `}
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Label */}
                <span
                  className={`
                    text-[10px] tracking-wide relative z-10 transition-all duration-300
                    ${isActive 
                      ? 'text-white opacity-100'
                      : 'text-gray-500 opacity-80'
                    }
                  `}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Safe area spacing for mobile devices */}
      <div className="bg-[#0A0A0A] h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}