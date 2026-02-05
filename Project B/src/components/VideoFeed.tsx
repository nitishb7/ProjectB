import { useState, useRef, useEffect } from 'react';
import { VideoCard } from './VideoCard';
import { ScrollProgress } from './ScrollProgress';
import { Search, Bell } from 'lucide-react';

export interface Video {
  id: string;
  creator: string;
  avatar: string;
  creatorCredibility: string;
  title: string;
  subtitle: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  comments: number;
  thumbnail: string;
  isSaved: boolean;
}

const mockVideos: Video[] = [
  {
    id: '1',
    creator: 'Dr. Sarah Chen',
    avatar: '👩‍🏫',
    creatorCredibility: 'Quantum Physicist, MIT',
    title: 'Understanding Quantum Superposition',
    subtitle: 'Learn how particles exist in multiple states simultaneously. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.',
    category: 'Physics',
    difficulty: 'Intermediate',
    duration: '2:45',
    comments: 892,
    thumbnail: 'https://images.unsplash.com/photo-1608037222022-62649819f8aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwZXhwZXJpbWVudCUyMGxhYm9yYXRvcnl8ZW58MXx8fHwxNzY0MDUwODU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    isSaved: false,
  },
  {
    id: '2',
    creator: 'Prof. Michael Torres',
    avatar: '👨‍🎓',
    creatorCredibility: 'Mathematics Professor, Stanford',
    title: 'Solving Quadratic Equations Simply',
    subtitle: 'Master the fundamentals with this step-by-step approach',
    category: 'Mathematics',
    difficulty: 'Beginner',
    duration: '3:20',
    comments: 654,
    thumbnail: 'https://images.unsplash.com/photo-1758685734312-5134968399a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRoJTIwZXF1YXRpb25zJTIwYmxhY2tib2FyZHxlbnwxfHx8fDE3NjQwNTA4NjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    isSaved: false,
  },
  {
    id: '3',
    creator: 'Dr. Emma Richardson',
    avatar: '📚',
    creatorCredibility: 'Ancient History Scholar, Oxford',
    title: 'The Library of Alexandria Mystery',
    subtitle: 'Uncovering what happened to ancient knowledge',
    category: 'History',
    difficulty: 'Intermediate',
    duration: '4:10',
    comments: 1243,
    thumbnail: 'https://images.unsplash.com/photo-1613324767976-f65bc7d80936?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3J5JTIwYm9va3MlMjBsaWJyYXJ5fGVufDF8fHx8MTc2NDA1MDg2MHww&ixlib=rb-4.1.0&q=80&w=1080',
    isSaved: false,
  },
  {
    id: '4',
    creator: 'Isabella Martinez',
    avatar: '🎨',
    creatorCredibility: 'Art Educator, The Met',
    title: 'Color Theory Fundamentals',
    subtitle: 'Understanding complementary colors and visual harmony',
    category: 'Art',
    difficulty: 'Beginner',
    duration: '2:55',
    comments: 445,
    thumbnail: 'https://images.unsplash.com/photo-1758522274945-7f000385a3dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBwYWludGluZyUyMHN0dWRlbnR8ZW58MXx8fHwxNzY0MDUwODYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    isSaved: false,
  },
  {
    id: '5',
    creator: 'Dr. James Wilson',
    avatar: '👨‍🏫',
    creatorCredibility: 'Cognitive Neuroscientist, Harvard',
    title: 'Evidence-Based Study Techniques',
    subtitle: 'Five neuroscience-backed methods for effective learning',
    category: 'Learning',
    difficulty: 'Beginner',
    duration: '5:30',
    comments: 1876,
    thumbnail: 'https://images.unsplash.com/photo-1649920442906-3c8ef428fb6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwdGVhY2hpbmclMjBjbGFzc3Jvb218ZW58MXx8fHwxNzY0MDUwNjc3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    isSaved: false,
  },
];

export function VideoFeed({ onOpenSearch, onOpenNotifications, onNavigateToProfile, theme = 'dark' }: { 
  onOpenSearch: () => void; 
  onOpenNotifications: () => void;
  onNavigateToProfile: (creatorId: string) => void;
  theme?: 'light' | 'dark';
}) {
  const [videos, setVideos] = useState<Video[]>(mockVideos);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartY.current - touchEndY.current;
    const threshold = 50;

    if (swipeDistance > threshold && currentIndex < videos.length - 1) {
      // Swipe up - next video
      setCurrentIndex(currentIndex + 1);
    } else if (swipeDistance < -threshold && currentIndex > 0) {
      // Swipe down - previous video
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: currentIndex * window.innerHeight,
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  const handleSave = (videoId: string) => {
    setVideos(videos.map(video => 
      video.id === videoId 
        ? { ...video, isSaved: !video.isSaved }
        : video
    ));
  };

  return (
    <>
      <ScrollProgress containerRef={containerRef} />
      {/* Premium Header - Minimal and Quiet */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-white tracking-tight opacity-90 text-[24px]">For You</h1>
          <div className="flex items-center gap-2">
            <button 
              onClick={onOpenSearch} 
              className="p-2 rounded-full hover:bg-white/5 transition-colors text-[24px]"
            >
              <Search className="w-5 h-5 text-white/70" />
            </button>
            <button 
              onClick={onOpenNotifications} 
              className="p-2 rounded-full hover:bg-white/5 transition-colors relative text-[24px]"
            >
              <Bell className="w-5 h-5 text-white/70" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide pb-16"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {videos.map((video) => (
          <VideoCard 
            key={video.id} 
            video={video} 
            onSave={handleSave}
            onNavigateToProfile={onNavigateToProfile}
          />
        ))}
      </div>
    </>
  );
}