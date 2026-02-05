import { useState, useRef } from 'react';
import { ArrowLeft, Heart, MessageCircle, UserPlus, Gift, TrendingUp, CheckCheck, Settings } from 'lucide-react';
import { ScrollProgress } from './ScrollProgress';

interface NotificationsProps {
  onBack: () => void;
  theme?: 'light' | 'dark';
}

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'gift' | 'milestone';
  user: string;
  avatar: string;
  content: string;
  timestamp: string;
  read: boolean;
  thumbnail?: string;
}

export function Notifications({ onBack, theme = 'dark' }: NotificationsProps) {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const containerRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'like',
      user: 'Sarah Chen',
      avatar: '👩‍🔬',
      content: 'liked your video "Quantum Physics Explained"',
      timestamp: '5m ago',
      read: false,
      thumbnail: '🔬'
    },
    {
      id: '2',
      type: 'comment',
      user: 'Mike Johnson',
      avatar: '👨‍🎓',
      content: 'commented: "This is amazing! Can you make more?"',
      timestamp: '15m ago',
      read: false,
      thumbnail: '🔬'
    },
    {
      id: '3',
      type: 'follow',
      user: 'Emma Davis',
      avatar: '👩‍💻',
      content: 'started following you',
      timestamp: '1h ago',
      read: false
    },
    {
      id: '4',
      type: 'gift',
      user: 'Alex Turner',
      avatar: '👨‍🏫',
      content: 'sent you a 👑 Crown (50 tokens)',
      timestamp: '2h ago',
      read: true
    },
    {
      id: '5',
      type: 'milestone',
      user: 'Project B',
      avatar: '🎓',
      content: 'You reached 10K followers! 🎉',
      timestamp: '3h ago',
      read: true
    },
    {
      id: '6',
      type: 'like',
      user: 'Lisa Park',
      avatar: '👩‍🎨',
      content: 'and 234 others liked your video',
      timestamp: '5h ago',
      read: true,
      thumbnail: '🧪'
    },
    {
      id: '7',
      type: 'comment',
      user: 'David Kim',
      avatar: '👨‍💼',
      content: 'replied to your comment',
      timestamp: '1d ago',
      read: true,
      thumbnail: '📐'
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'like': return Heart;
      case 'comment': return MessageCircle;
      case 'follow': return UserPlus;
      case 'gift': return Gift;
      case 'milestone': return TrendingUp;
      default: return Heart;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'like': return 'from-red-500 to-pink-500';
      case 'comment': return 'from-blue-500 to-purple-500';
      case 'follow': return 'from-green-500 to-emerald-500';
      case 'gift': return 'from-yellow-500 to-orange-500';
      case 'milestone': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const filteredNotifications = filter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className={`h-screen ${theme === 'dark' ? 'bg-neutral-950' : 'bg-white'} flex flex-col relative`}>
      <ScrollProgress containerRef={containerRef} />
      {/* Header */}
      <div className={`${theme === 'dark' ? 'bg-neutral-950 border-white/10' : 'bg-white border-gray-200'} border-b p-4`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className={`p-2 ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-100'} rounded-full transition-colors`}>
              <ArrowLeft className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} />
            </button>
            <div>
              <h2 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-medium`}>Notifications</h2>
              {unreadCount > 0 && (
                <div className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{unreadCount} unread</div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className={`${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-600'} text-sm transition-colors`}
              >
                Mark all read
              </button>
            )}
            <button className={`p-2 ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-100'} rounded-full transition-colors`}>
              <Settings className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === 'all'
                ? theme === 'dark' ? 'bg-white text-black' : 'bg-gray-900 text-white'
                : theme === 'dark' ? 'bg-white/5 text-gray-400 hover:bg-white/10' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium relative transition-all ${
              filter === 'unread'
                ? theme === 'dark' ? 'bg-white text-black' : 'bg-gray-900 text-white'
                : theme === 'dark' ? 'bg-white/5 text-gray-400 hover:bg-white/10' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Unread
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div ref={containerRef} className="flex-1 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className={`w-20 h-20 ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-100'} rounded-full flex items-center justify-center mb-4`}>
              <CheckCheck className={`w-10 h-10 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
            </div>
            <h3 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2 font-medium`}>All caught up!</h3>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm`}>No new notifications</p>
          </div>
        ) : (
          <div className={`divide-y ${theme === 'dark' ? 'divide-white/5' : 'divide-gray-200'}`}>
            {filteredNotifications.map(notification => {
              const Icon = getIcon(notification.type);
              const iconColor = getIconColor(notification.type);

              return (
                <button
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`w-full flex gap-3 p-4 ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-100'} transition-colors ${
                    !notification.read ? theme === 'dark' ? 'bg-white/5' : 'bg-blue-50' : ''
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-white to-gray-300 rounded-full flex items-center justify-center text-2xl">
                      {notification.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br ${iconColor} rounded-full flex items-center justify-center`}>
                      <Icon className="w-3 h-3 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 text-left">
                    <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} text-sm`}>
                      <span className="font-medium">{notification.user}</span>{' '}
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{notification.content}</span>
                    </p>
                    <div className={`${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'} text-xs mt-1`}>{notification.timestamp}</div>
                  </div>

                  {/* Thumbnail */}
                  {notification.thumbnail && (
                    <div className={`w-12 h-12 bg-gradient-to-br ${theme === 'dark' ? 'from-white/10 to-white/5' : 'from-gray-200 to-gray-100'} rounded-lg flex items-center justify-center text-2xl flex-shrink-0`}>
                      {notification.thumbnail}
                    </div>
                  )}

                  {/* Unread Indicator */}
                  {!notification.read && (
                    <div className={`w-2 h-2 ${theme === 'dark' ? 'bg-white' : 'bg-blue-500'} rounded-full flex-shrink-0 mt-2`} />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}