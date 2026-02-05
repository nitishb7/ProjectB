import { useState, useRef } from 'react';
import { Search, ArrowLeft, Filter, Clock, TrendingUp, Hash, User } from 'lucide-react';
import { ScrollProgress } from './ScrollProgress';

interface SearchResultsProps {
  onBack: () => void;
  theme?: 'light' | 'dark';
}

export function SearchResults({ onBack, theme = 'dark' }: SearchResultsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'videos' | 'users' | 'topics'>('all');
  const containerRef = useRef<HTMLDivElement>(null);

  const recentSearches = [
    'Quantum Physics',
    'Ancient Rome',
    'Calculus Tutorial',
    'Spanish Grammar'
  ];

  const trendingSearches = [
    { query: 'Black Holes Explained', count: '1.2M' },
    { query: 'World War 2', count: '980K' },
    { query: 'Linear Algebra', count: '756K' },
    { query: 'Renaissance Art', count: '645K' }
  ];

  const searchResults = {
    videos: [
      {
        id: '1',
        thumbnail: '🎥',
        title: 'Understanding Quantum Mechanics in 60 Seconds',
        creator: 'Dr. Sarah Physics',
        views: '2.3M',
        likes: '145K'
      },
      {
        id: '2',
        thumbnail: '🧪',
        title: 'Chemical Reactions That Will Blow Your Mind',
        creator: 'Chemistry Lab',
        views: '1.8M',
        likes: '98K'
      },
      {
        id: '3',
        thumbnail: '📐',
        title: 'Geometry Tricks You Need to Know',
        creator: 'Math Master',
        views: '1.5M',
        likes: '87K'
      }
    ],
    users: [
      { id: '1', avatar: '👨‍🏫', name: 'Professor Smith', handle: '@profsmith', followers: '234K' },
      { id: '2', avatar: '👩‍🔬', name: 'Science Girl', handle: '@sciencegirl', followers: '189K' },
      { id: '3', avatar: '👨‍💻', name: 'Code Academy', handle: '@codeacademy', followers: '456K' }
    ],
    topics: [
      { id: '1', name: 'Physics', videos: '12.3K', icon: '⚛️' },
      { id: '2', name: 'Mathematics', videos: '18.7K', icon: '📊' },
      { id: '3', name: 'History', videos: '9.4K', icon: '📜' }
    ]
  };

  return (
    <div className={`h-screen ${theme === 'dark' ? 'bg-neutral-950' : 'bg-white'} flex flex-col relative`}>
      <ScrollProgress containerRef={containerRef} />
      {/* Header */}
      <div className={`${theme === 'dark' ? 'bg-neutral-950 border-white/10' : 'bg-white border-gray-200'} border-b p-4`}>
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={onBack}
            className={`p-2 ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-100'} rounded-full transition-colors`}
          >
            <ArrowLeft className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} />
          </button>
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for videos, creators, topics..."
              className={`w-full ${theme === 'dark' ? 'bg-white/5 text-white border-white/10 focus:border-white/30 placeholder:text-gray-500' : 'bg-gray-100 text-gray-900 border-gray-200 focus:border-gray-400 placeholder:text-gray-400'} pl-10 pr-4 py-2 rounded-full border focus:outline-none transition-colors`}
              autoFocus
            />
          </div>
          <button className={`p-2 ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-100'} rounded-full transition-colors`}>
            <Filter className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {['all', 'videos', 'users', 'topics'].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter as any)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap font-medium transition-all ${
                activeFilter === filter
                  ? theme === 'dark' ? 'bg-white text-black' : 'bg-gray-900 text-white'
                  : theme === 'dark' ? 'bg-white/5 text-gray-400 hover:bg-white/10' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div ref={containerRef} className="flex-1 overflow-y-auto">
        {!searchQuery ? (
          <div className="p-4">
            {/* Recent Searches */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Clock className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                <h3 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-medium`}>Recent Searches</h3>
              </div>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(search)}
                    className={`w-full text-left px-4 py-3 ${theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white' : 'bg-gray-100 border-gray-200 hover:bg-gray-200 text-gray-900'} border rounded-full transition-colors`}
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>

            {/* Trending Searches */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                <h3 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-medium`}>Trending Searches</h3>
              </div>
              <div className="space-y-2">
                {trendingSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(search.query)}
                    className={`w-full text-left px-4 py-3 ${theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-gray-100 border-gray-200 hover:bg-gray-200'} border rounded-full flex items-center justify-between transition-colors`}
                  >
                    <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{search.query}</span>
                    <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{search.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4">
            {/* Video Results */}
            {(activeFilter === 'all' || activeFilter === 'videos') && (
              <div className="mb-6">
                <h3 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-medium mb-3`}>Videos</h3>
                <div className="space-y-3">
                  {searchResults.videos.map(video => (
                    <div key={video.id} className={`flex gap-3 p-3 rounded-lg ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-100'} transition-colors`}>
                      <div className={`w-32 h-20 bg-gradient-to-br ${theme === 'dark' ? 'from-white/20 to-white/10' : 'from-gray-200 to-gray-100'} rounded-lg flex items-center justify-center text-3xl flex-shrink-0`}>
                        {video.thumbnail}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} line-clamp-2 mb-1 font-medium`}>
                          {video.title}
                        </h4>
                        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm mb-1`}>{video.creator}</p>
                        <div className={`flex items-center gap-3 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'} text-sm`}>
                          <span>{video.views} views</span>
                          <span>•</span>
                          <span>{video.likes} likes</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* User Results */}
            {(activeFilter === 'all' || activeFilter === 'users') && (
              <div className="mb-6">
                <h3 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-medium mb-3`}>Creators</h3>
                <div className="space-y-3">
                  {searchResults.users.map(user => (
                    <div key={user.id} className={`flex items-center gap-3 p-3 rounded-lg ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-100'} transition-colors`}>
                      <div className="w-12 h-12 bg-gradient-to-br from-white to-gray-300 rounded-full flex items-center justify-center text-2xl">
                        {user.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-medium`}>{user.name}</h4>
                        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{user.handle}</p>
                      </div>
                      <div className="text-right">
                        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm mb-1`}>{user.followers}</p>
                        <button className={`px-4 py-1 ${theme === 'dark' ? 'bg-white text-black hover:bg-white/90' : 'bg-gray-900 text-white hover:bg-gray-800'} rounded-lg text-sm transition-colors font-medium`}>
                          Follow
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Topic Results */}
            {(activeFilter === 'all' || activeFilter === 'topics') && (
              <div>
                <h3 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-medium mb-3`}>Topics</h3>
                <div className="space-y-3">
                  {searchResults.topics.map(topic => (
                    <button
                      key={topic.id}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-100'} transition-colors`}
                    >
                      <div className={`w-12 h-12 ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-100 border-gray-200'} border rounded-lg flex items-center justify-center text-2xl`}>
                        {topic.icon}
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-medium`}>#{topic.name}</h4>
                        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{topic.videos} videos</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}