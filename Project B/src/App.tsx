import { useState } from 'react';
import { VideoFeed } from './components/VideoFeed';
import { CreateVideo } from './components/CreateVideo';
import { Navigation } from './components/Navigation';
import { Discover } from './components/Discover';
import { Profile } from './components/Profile';
import { OtherUserProfile } from './components/OtherUserProfile';
import { Login } from './components/Login';
import { Onboarding } from './components/Onboarding';
import { SearchResults } from './components/SearchResults';
import { VideoEditor } from './components/VideoEditor';
import { CreatorStudio } from './components/CreatorStudio';
import { EarningsDashboard } from './components/EarningsDashboard';
import { TokenWallet } from './components/TokenWallet';
import { Notifications } from './components/Notifications';
import { Settings } from './components/Settings';
import { AdminDashboard } from './components/AdminDashboard';

export type TabType = 'home' | 'discover' | 'create' | 'profile';
export type OverlayType = 'search' | 'editor' | 'studio' | 'earnings' | 'wallet' | 'notifications' | 'settings' | 'admin' | 'otherProfile' | null;

interface TabState {
  overlay: OverlayType;
  creatorId: string | null;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // Per-tab state to persist navigation history/overlays
  const [tabStates, setTabStates] = useState<Record<TabType, TabState>>({
    home: { overlay: null, creatorId: null },
    discover: { overlay: null, creatorId: null },
    create: { overlay: null, creatorId: null },
    profile: { overlay: null, creatorId: null },
  });

  // Global overrides
  const [isAdmin, setIsAdmin] = useState(false);
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };
  
  // Helper to set overlay for the CURRENT active tab
  const setOverlay = (overlay: OverlayType, creatorId: string | null = null) => {
    setTabStates(prev => ({
      ...prev,
      [activeTab]: { overlay, creatorId }
    }));
  };

  const handleNavigateToProfile = (creatorId: string) => {
    setOverlay('otherProfile', creatorId);
  };

  const handleLogin = (isNewUser: boolean) => {
    setIsLoggedIn(true);
    if (isNewUser) {
      setHasCompletedOnboarding(false);
    } else {
      setHasCompletedOnboarding(true);
    }
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    // We intentionally DO NOT clear the overlay of the previous tab
    // to preserve state ("stay wherever I was previously").
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  if (!hasCompletedOnboarding) {
    return <Onboarding onComplete={() => setHasCompletedOnboarding(true)} />;
  }

  // Admin Dashboard (Global Override)
  // We assume Admin is accessed via a special route or state that overrides everything
  // For now, if admin overlay is set on ANY tab? No, probably global.
  // But our overlay types are mixed. 'admin' is in OverlayType.
  // Let's check if 'admin' is active on the current tab.
  if (isAdmin && tabStates[activeTab].overlay === 'admin') {
    return <AdminDashboard />;
  }

  // Helper to render overlays for a specific tab
  const renderOverlay = (tab: TabType) => {
    const { overlay, creatorId } = tabStates[tab];
    const closeOverlay = () => setTabStates(prev => ({ ...prev, [tab]: { overlay: null, creatorId: null } }));

    if (!overlay) return null;

    // Common overlay wrapper styles could go here, but some are full screen
    // We render them absolute inset-0 over the tab content

    switch (overlay) {
      case 'search':
        return (
          <div className={`absolute inset-0 z-50 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
            <SearchResults onBack={closeOverlay} theme={theme} />
          </div>
        );
      case 'editor':
        return (
          <div className={`absolute inset-0 z-50 ${theme === 'dark' ? 'bg-black' : 'bg-white'} flex flex-col`}>
            <VideoEditor
              onBack={closeOverlay}
              onPublish={() => {
                closeOverlay();
                setActiveTab('home');
              }}
              theme={theme}
            />
          </div>
        );
      case 'studio':
        return (
          <div className={`absolute inset-0 z-50 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
            <CreatorStudio onBack={closeOverlay} theme={theme} />
          </div>
        );
      case 'earnings':
        return (
          <div className={`absolute inset-0 z-50 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
            <EarningsDashboard onBack={closeOverlay} theme={theme} />
          </div>
        );
      case 'wallet':
        return (
          <div className={`absolute inset-0 z-50 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
            <TokenWallet onBack={closeOverlay} theme={theme} />
          </div>
        );
      case 'notifications':
        return (
          <div className={`absolute inset-0 z-50 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
            <Notifications onBack={closeOverlay} theme={theme} />
          </div>
        );
      case 'settings':
        return (
          <div className={`absolute inset-0 z-50 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
            <Settings 
              onBack={closeOverlay}
              onOpenStudio={() => setTabStates(prev => ({ ...prev, [tab]: { overlay: 'studio', creatorId: null } }))}
              onOpenEarnings={() => setTabStates(prev => ({ ...prev, [tab]: { overlay: 'earnings', creatorId: null } }))}
              onOpenWallet={() => setTabStates(prev => ({ ...prev, [tab]: { overlay: 'wallet', creatorId: null } }))}
              theme={theme}
              onToggleTheme={toggleTheme}
            />
          </div>
        );
      case 'otherProfile':
        return (
          <div className={`absolute inset-0 z-40 ${theme === 'dark' ? 'bg-black' : 'bg-white'} flex flex-col`}>
            <OtherUserProfile creatorId={creatorId} onClose={closeOverlay} theme={theme} />
          </div>
        );
      case 'admin':
        return null; // Handled globally above, or if we want it here:
        // return <AdminDashboard />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex flex-col h-screen ${theme === 'dark' ? 'bg-black' : 'bg-white'} max-w-md mx-auto relative`}>
      {/* Main Content Layer - All tabs mounted but toggled visibility */}
      <div className="flex-1 overflow-hidden relative">
        
        {/* Home Tab */}
        <div 
          className={`absolute inset-0 w-full h-full ${activeTab === 'home' ? 'z-10 visible pointer-events-auto' : 'z-0 invisible pointer-events-none'}`}
        >
          <VideoFeed 
            onOpenSearch={() => setOverlay('search')} 
            onOpenNotifications={() => setOverlay('notifications')} 
            onNavigateToProfile={handleNavigateToProfile}
            theme={theme}
          />
          {renderOverlay('home')}
        </div>

        {/* Discover Tab */}
        <div 
          className={`absolute inset-0 w-full h-full ${activeTab === 'discover' ? 'z-10 visible pointer-events-auto' : 'z-0 invisible pointer-events-none'}`}
        >
          <Discover onOpenSearch={() => setOverlay('search')} theme={theme} />
          {renderOverlay('discover')}
        </div>

        {/* Create Tab */}
        <div 
          className={`absolute inset-0 w-full h-full ${activeTab === 'create' ? 'z-10 visible pointer-events-auto' : 'z-0 invisible pointer-events-none'}`}
        >
          <CreateVideo 
            onBack={() => setActiveTab('home')} 
            onContinue={() => setActiveTab('home')}
            theme={theme}
          />
          {/* Create might trigger editor overlay */}
          {renderOverlay('create')}
        </div>

        {/* Profile Tab */}
        <div 
          className={`absolute inset-0 w-full h-full ${activeTab === 'profile' ? 'z-10 visible pointer-events-auto' : 'z-0 invisible pointer-events-none'}`}
        >
          <Profile onNavigateToSettings={() => setOverlay('settings')} theme={theme} />
          {renderOverlay('profile')}
        </div>

      </div>

      {/* Navigation Layer - Always on top */}
      {/* We hide navigation if we are on 'create' tab, OR if the current tab has a full-screen overlay active?
          The user prompt implies we CAN navigate away from overlays.
          "when I am into other users profile... and I go immediately to discover section".
          This means Nav must be visible even with overlay.
          So we keep standard condition.
      */}
      {activeTab !== 'create' && <Navigation activeTab={activeTab} setActiveTab={handleTabChange} />}
    </div>
  );
}