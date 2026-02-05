import { Search, TrendingUp, User, Sparkles, Flame, Clock, ChevronRight, Gift, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useRef } from 'react';
import { ScrollProgress } from './ScrollProgress';

export function Discover({ onOpenSearch, theme = 'dark' }: { 
  onOpenSearch: () => void;
  theme?: 'light' | 'dark';
}) {
  const [trendingTab, setTrendingTab] = useState<'today' | 'week' | 'month'>('today');
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['All']);
  const containerRef = useRef<HTMLDivElement>(null);

  const filterChips = ['All', 'Science', 'Math', 'History', 'Art', 'Technology', 'Language'];

  const toggleFilter = (filter: string) => {
    if (filter === 'All') {
      setSelectedFilters(['All']);
    } else {
      const newFilters = selectedFilters.filter(f => f !== 'All');
      if (selectedFilters.includes(filter)) {
        const updated = newFilters.filter(f => f !== filter);
        setSelectedFilters(updated.length === 0 ? ['All'] : updated);
      } else {
        setSelectedFilters([...newFilters, filter]);
      }
    }
  };

  const forYouVideos = [
    {
      id: 1,
      thumbnail: 'https://images.unsplash.com/photo-1608037222022-62649819f8aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwZXhwZXJpbWVudCUyMGxhYm9yYXRvcnl8ZW58MXx8fHwxNzY0MDUwODU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Quantum Mechanics Explained',
      creator: '@physicsmaster',
      views: '2.4M'
    },
    {
      id: 2,
      thumbnail: 'https://images.unsplash.com/photo-1758685734312-5134968399a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRoJTIwZXF1YXRpb25zJTIwYmxhY2tib2FyZHxlbnwxfHx8fDE3NjQwNTA4NjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Calculus in 60 Seconds',
      creator: '@mathgenius',
      views: '1.8M'
    },
    {
      id: 3,
      thumbnail: 'https://images.unsplash.com/photo-1613324767976-f65bc7d80936?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3J5JTIwYm9va3MlMjBsaWJyYXJ5fGVufDF8fHx8MTc2NDA1MDg2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Ancient Rome Secrets',
      creator: '@historyteacher',
      views: '3.1M'
    },
    {
      id: 4,
      thumbnail: 'https://images.unsplash.com/photo-1758522274945-7f000385a3dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBwYWludGluZyUyMHN0dWRlbnR8ZW58MXx8fHwxNzY0MDUwODYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Renaissance Art Guide',
      creator: '@arthistorian',
      views: '1.2M'
    }
  ];

  const trendingTopics = [
    { tag: 'QuantumPhysics', count: '2.4M', color: 'from-blue-500 to-cyan-500' },
    { tag: 'MathTricks', count: '1.8M', color: 'from-purple-500 to-pink-500' },
    { tag: 'HistoryFacts', count: '3.1M', color: 'from-orange-500 to-red-500' },
    { tag: 'ArtTutorial', count: '1.2M', color: 'from-green-500 to-emerald-500' },
    { tag: 'CodingBasics', count: '2.9M', color: 'from-indigo-500 to-blue-500' },
    { tag: 'ScienceExperiments', count: '1.6M', color: 'from-yellow-500 to-orange-500' },
  ];

  const categories = [
    { 
      name: 'Science',  
      videos: '1.2M',
      thumbnail: 'https://images.unsplash.com/photo-1608037222022-62649819f8aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwZXhwZXJpbWVudCUyMGxhYm9yYXRvcnl8ZW58MXx8fHwxNzY0MDUwODU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      categoryVideos: [
        { id: 1, thumb: 'https://images.unsplash.com/photo-1608037222022-62649819f8aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwZXhwZXJpbWVudCUyMGxhYm9yYXRvcnl8ZW58MXx8fHwxNzY0MDUwODU5fDA&ixlib=rb-4.1.0&q=80&w=1080', title: 'DNA Explained', views: '2.1M' },
        { id: 2, thumb: 'https://images.unsplash.com/photo-1608037222022-62649819f8aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwZXhwZXJpbWVudCUyMGxhYm9yYXRvcnl8ZW58MXx8fHwxNzY0MDUwODU5fDA&ixlib=rb-4.1.0&q=80&w=1080', title: 'Chemistry Basics', views: '1.8M' },
        { id: 3, thumb: 'https://images.unsplash.com/photo-1608037222022-62649819f8aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwZXhwZXJpbWVudCUyMGxhYm9yYXRvcnl8ZW58MXx8fHwxNzY0MDUwODU5fDA&ixlib=rb-4.1.0&q=80&w=1080', title: 'Physics Fun', views: '2.5M' },
      ]
    },
    { 
      name: 'Mathematics', 
      videos: '890K',
      thumbnail: 'https://images.unsplash.com/photo-1758685734312-5134968399a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRoJTIwZXF1YXRpb25zJTIwYmxhY2tib2FyZHxlbnwxfHx8fDE3NjQwNTA4NjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      categoryVideos: [
        { id: 1, thumb: 'https://images.unsplash.com/photo-1758685734312-5134968399a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRoJTIwZXF1YXRpb25zJTIwYmxhY2tib2FyZHxlbnwxfHx8fDE3NjQwNTA4NjB8MA&ixlib=rb-4.1.0&q=80&w=1080', title: 'Algebra Made Easy', views: '1.5M' },
        { id: 2, thumb: 'https://images.unsplash.com/photo-1758685734312-5134968399a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRoJTIwZXF1YXRpb25zJTIwYmxhY2tib2FyZHxlbnwxfHx8fDE3NjQwNTA4NjB8MA&ixlib=rb-4.1.0&q=80&w=1080', title: 'Geometry Tricks', views: '980K' },
        { id: 3, thumb: 'https://images.unsplash.com/photo-1758685734312-5134968399a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRoJTIwZXF1YXRpb25zJTIwYmxhY2tib2FyZHxlbnwxfHx8fDE3NjQwNTA4NjB8MA&ixlib=rb-4.1.0&q=80&w=1080', title: 'Calculus 101', views: '1.2M' },
      ]
    },
    { 
      name: 'History', 
      videos: '756K',
      thumbnail: 'https://images.unsplash.com/photo-1613324767976-f65bc7d80936?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3J5JTIwYm9va3MlMjBsaWJyYXJ5fGVufDF8fHx8MTc2NDA1MDg2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      categoryVideos: [
        { id: 1, thumb: 'https://images.unsplash.com/photo-1613324767976-f65bc7d80936?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3J5JTIwYm9va3MlMjBsaWJyYXJ5fGVufDF8fHx8MTc2NDA1MDg2MHww&ixlib=rb-4.1.0&q=80&w=1080', title: 'World War II', views: '3.2M' },
        { id: 2, thumb: 'https://images.unsplash.com/photo-1613324767976-f65bc7d80936?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3J5JTIwYm9va3MlMjBsaWJyYXJ5fGVufDF8fHx8MTc2NDA1MDg2MHww&ixlib=rb-4.1.0&q=80&w=1080', title: 'Ancient Egypt', views: '2.8M' },
        { id: 3, thumb: 'https://images.unsplash.com/photo-1613324767976-f65bc7d80936?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3J5JTIwYm9va3MlMjBsaWJyYXJ5fGVufDF8fHx8MTc2NDA1MDg2MHww&ixlib=rb-4.1.0&q=80&w=1080', title: 'Renaissance Era', views: '1.9M' },
      ]
    },
    { 
      name: 'Art', 
      videos: '634K',
      thumbnail: 'https://images.unsplash.com/photo-1758522274945-7f000385a3dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBwYWludGluZyUyMHN0dWRlbnR8ZW58MXx8fHwxNzY0MDUwODYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      categoryVideos: [
        { id: 1, thumb: 'https://images.unsplash.com/photo-1758522274945-7f000385a3dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBwYWludGluZyUyMHN0dWRlbnR8ZW58MXx8fHwxNzY0MDUwODYwfDA&ixlib=rb-4.1.0&q=80&w=1080', title: 'Watercolor Basics', views: '1.4M' },
        { id: 2, thumb: 'https://images.unsplash.com/photo-1758522274945-7f000385a3dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBwYWludGluZyUyMHN0dWRlbnR8ZW58MXx8fHwxNzY0MDUwODYwfDA&ixlib=rb-4.1.0&q=80&w=1080', title: 'Drawing Portraits', views: '1.1M' },
        { id: 3, thumb: 'https://images.unsplash.com/photo-1758522274945-7f000385a3dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBwYWludGluZyUyMHN0dWRlbnR8ZW58MXx8fHwxNzY0MDUwODYwfDA&ixlib=rb-4.1.0&q=80&w=1080', title: 'Color Theory', views: '890K' },
      ]
    },
    { 
      name: 'Technology', 
      videos: '1.5M',
      thumbnail: 'https://images.unsplash.com/photo-1649920442906-3c8ef428fb6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwdGVhY2hpbmclMjBjbGFzc3Jvb218ZW58MXx8fHwxNzY0MDUwNjc3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      categoryVideos: [
        { id: 1, thumb: 'https://images.unsplash.com/photo-1649920442906-3c8ef428fb6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwdGVhY2hpbmclMjBjbGFzc3Jvb218ZW58MXx8fHwxNzY0MDUwNjc3fDA&ixlib=rb-4.1.0&q=80&w=1080', title: 'Python Basics', views: '2.7M' },
        { id: 2, thumb: 'https://images.unsplash.com/photo-1649920442906-3c8ef428fb6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwdGVhY2hpbmclMjBjbGFzc3Jvb218ZW58MXx8fHwxNzY0MDUwNjc3fDA&ixlib=rb-4.1.0&q=80&w=1080', title: 'Web Development', views: '2.1M' },
        { id: 3, thumb: 'https://images.unsplash.com/photo-1649920442906-3c8ef428fb6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwdGVhY2hpbmclMjBjbGFzc3Jvb218ZW58MXx8fHwxNzY0MDUwNjc3fDA&ixlib=rb-4.1.0&q=80&w=1080', title: 'AI Explained', views: '3.4M' },
      ]
    },
  ];

  return (
    <div ref={containerRef} className={`h-full ${theme === 'dark' ? 'bg-black' : 'bg-white'} overflow-y-auto pb-16 relative`}>
      <ScrollProgress containerRef={containerRef} />
      {/* Sticky Top App Bar */}
      <div className={`sticky top-0 z-10 ${theme === 'dark' ? 'bg-black/80 border-white/10' : 'bg-white/80 border-gray-200'} backdrop-blur-xl border-b`}>
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} text-[24px] mx-[10px] my-[0px]`}>Discover</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Glassmorphic Search Bar */}
        <div>
          {/* Search Bar */}
          <div 
            className={`relative ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-100 border-gray-200'} border rounded-full overflow-hidden`}
          >
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
            <input
              type="text"
              placeholder="Search topics, creators, categories..."
              className={`w-full bg-transparent ${theme === 'dark' ? 'text-white placeholder:text-gray-500' : 'text-gray-900 placeholder:text-gray-400'} pl-12 pr-4 py-4 focus:outline-none`}
              onClick={onOpenSearch}
            />
          </div>
        </div>

        {/* For You Carousel */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <h2 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>For You</h2>
            </div>
            <button className="text-blue-400 text-sm flex items-center gap-1">
              See All
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {forYouVideos.map((video) => (
              <button
                key={video.id}
                className="flex-shrink-0 w-40 group"
              >
                <div className="relative mb-2 rounded-2xl overflow-hidden">
                  <ImageWithFallback
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-40 h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="text-white text-sm mb-1 line-clamp-2">{video.title}</div>
                    <div className="text-gray-400 text-xs">{video.views} views</div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Trending Topics with Tabs */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-400" />
              <h2 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Trending Topics</h2>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setTrendingTab('today')}
              className={`flex items-center gap-1 px-4 py-2 rounded-full transition-all ${
                trendingTab === 'today'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
                  : theme === 'dark' 
                    ? 'bg-white/5 text-gray-400 border border-white/10'
                    : 'bg-gray-100 text-gray-600 border border-gray-200'
              }`}
            >
              <Flame className="w-4 h-4" />
              Today
            </button>
            <button
              onClick={() => setTrendingTab('week')}
              className={`flex items-center gap-1 px-4 py-2 rounded-full transition-all ${
                trendingTab === 'week'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
                  : theme === 'dark' 
                    ? 'bg-white/5 text-gray-400 border border-white/10'
                    : 'bg-gray-100 text-gray-600 border border-gray-200'
              }`}
            >
              <Clock className="w-4 h-4" />
              Week
            </button>
            <button
              onClick={() => setTrendingTab('month')}
              className={`px-4 py-2 rounded-full transition-all ${
                trendingTab === 'month'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
                  : theme === 'dark' 
                    ? 'bg-white/5 text-gray-400 border border-white/10'
                    : 'bg-gray-100 text-gray-600 border border-gray-200'
              }`}
            >
              Month
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {trendingTopics.map((topic) => (
              <button
                key={topic.tag}
                className={`bg-gradient-to-br ${theme === 'dark' ? 'from-white/5 to-white/[0.02] border-white/10 hover:border-white/20' : 'from-gray-50 to-gray-100 border-gray-200 hover:border-gray-300'} backdrop-blur-sm p-4 rounded-2xl border transition-all text-left group shadow-xl`}
              >
                <div className={`inline-block px-3 py-1 bg-gradient-to-r ${topic.color} rounded-full text-white text-xs mb-2 shadow-lg`}>
                  Trending
                </div>
                <div className={theme === 'dark' ? 'text-white mb-1' : 'text-gray-900 mb-1'}>#{topic.tag}</div>
                <div className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{topic.count} views</div>
              </button>
            ))}
          </div>
        </div>

        {/* Netflix-style Category Rows */}
        {categories.map((category) => (
          <div key={category.name}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{category.name}</h2>
                <span className={`${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'} text-sm`}>({category.videos})</span>
              </div>
              <button className="text-blue-400 text-sm flex items-center gap-1 hover:text-blue-300 transition-colors">
                See All
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {category.categoryVideos.map((video) => (
                <button
                  key={video.id}
                  className="flex-shrink-0 w-36 group"
                >
                  <div className="relative mb-2 rounded-xl overflow-hidden">
                    <ImageWithFallback
                      src={video.thumb}
                      alt={video.title}
                      className="w-36 h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="text-white text-xs mb-1 line-clamp-2">{video.title}</div>
                      <div className="text-gray-400 text-xs">{video.views}</div>
                    </div>
                    <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-white/30 rounded-xl transition-all" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
