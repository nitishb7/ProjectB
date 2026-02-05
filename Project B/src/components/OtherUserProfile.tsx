import {
  Share2,
  Video,
  ChevronLeft,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState, useRef } from "react";
import { ScrollProgress } from "./ScrollProgress";

interface OtherUserProfileProps {
  onClose?: () => void;
  creatorId: string | null;
  theme?: 'light' | 'dark';
}

export function OtherUserProfile({
  onClose,
  creatorId,
  theme = 'dark',
}: OtherUserProfileProps) {
  const [activeTab, setActiveTab] = useState<"lessons">("lessons");
  const containerRef = useRef<HTMLDivElement>(null);

  // Mock user data based on creatorId - this would come from backend
  const getUserData = (id: string) => {
    const profiles: Record<string, any> = {
      '1': {
        name: "Dr. Sarah Chen",
        username: "drsarahchen",
        bio: "Quantum Physicist at MIT. Making complex physics concepts accessible to everyone.",
        profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
        stats: {
          learners: "12.5K",
          lessons: 48,
        },
        posts: [
          {
            id: 1,
            thumbnail: "https://images.unsplash.com/photo-1608037222022-62649819f8aa?w=300&h=400&fit=crop",
            title: "Quantum Superposition",
            learnersHelped: "12.5K",
          },
          {
            id: 2,
            thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=400&fit=crop",
            title: "Wave-Particle Duality",
            learnersHelped: "8.2K",
          },
          {
            id: 3,
            thumbnail: "https://images.unsplash.com/photo-1453733190371-0a9bedd82893?w=300&h=400&fit=crop",
            title: "Quantum Entanglement",
            learnersHelped: "15.3K",
          },
        ],
      },
      '2': {
        name: "Prof. Michael Torres Guzman Loera",
        username: "proftorres",
        bio: "Mathematics Professor at Stanford. Passionate about teaching algebra and calculus.",
        profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
        stats: {
          learners: "8.3K",
          lessons: 32,
        },
        posts: [
          {
            id: 1,
            thumbnail: "https://images.unsplash.com/photo-1758685734312-5134968399a8?w=300&h=400&fit=crop",
            title: "Quadratic Equations",
            learnersHelped: "8.3K",
          },
          {
            id: 2,
            thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=400&fit=crop",
            title: "Calculus Basics",
            learnersHelped: "6.1K",
          },
        ],
      },
      // Default profile for other IDs
      default: {
        name: "Educational Creator",
        username: "creator",
        bio: "Passionate educator sharing knowledge with the world.",
        profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        stats: {
          learners: "5.2K",
          lessons: 24,
        },
        posts: [
          {
            id: 1,
            thumbnail: "https://images.unsplash.com/photo-1608037222022-62649819f8aa?w=300&h=400&fit=crop",
            title: "Educational Content",
            learnersHelped: "5.2K",
          },
        ],
      },
    };

    return profiles[id] || profiles.default;
  };

  const userData = getUserData(creatorId || "default");

  return (
    <div ref={containerRef} className={`h-full ${theme === 'dark' ? 'bg-black' : 'bg-white'} overflow-y-auto pb-16 relative`}>
      <ScrollProgress containerRef={containerRef} />
      {/* Header */}
      <div className={`sticky top-0 z-10 ${theme === 'dark' ? 'bg-black/80 border-white/10' : 'bg-white/80 border-gray-200'} backdrop-blur-xl border-b`}>
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-normal text-[20px]`}>@{userData.username}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 space-y-4 pt-[0px] pr-[16px] pb-[24px] pl-[16px]">
        {/* Profile Header - Twitter Style */}
        <div>
          {/* Cover Image with Gradient Overlay */}
          <div className="relative w-screen h-24 -ml-4 mb-2">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1765204874992-ba6bea74484c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGVkdWNhdGlvbiUyMHBhdHRlcm4lMjBibHVlfGVufDF8fHx8MTc3MDEzNTM0M3ww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Cover"
              className="w-full h-full object-cover"
            />
            {/* Dark gradient overlay for contrast */}
            <div className="absolute inset-0 left-0 right-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40 m-[0px] pt-[0px] pr-[8px] pb-[0px] pl-[0px] p-[0px]" />
          </div>

          {/* Profile Content */}
          <div className="space-y-2.5">
            {/* Profile Picture - overlapping cover by 25% */}
            <div className="relative -mt-12 mb-2">
              <div
                className={`w-20 h-20 rounded-full ${theme === "dark" ? "bg-black" : "bg-white"} p-1`}
              >
                <ImageWithFallback
                  src={userData.profileImage}
                  alt={userData.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>

            {/* Name */}
            <h2
              className={`${theme === "dark" ? "text-white" : "text-gray-900"} text-[18px] leading-tight`}
            >
              {userData.name}
            </h2>

            {/* Inline Stats Row */}
            <div
              className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} text-sm`}
            >
              <span
                className={`${theme === "dark" ? "text-white" : "text-gray-900"} font-medium`}
              >
                {userData.stats.learners}
              </span>
              { " Learners · " }
              <span
                className={`${theme === "dark" ? "text-white" : "text-gray-900"} font-medium`}
              >
                {userData.stats.lessons}
              </span>
              { " Lessons" }
            </div>

            {/* Bio - 2 lines max */}
            <p
              className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"} text-sm leading-relaxed line-clamp-2`}
            >
              {userData.bio}
            </p>

            {/* Action Button */}
            <button className="w-full py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all font-medium">
              Follow
            </button>
          </div>
        </div>

        {/* Simplified Tabs */}
        <div
          className={`${theme === "dark" ? "border-white/10" : "border-gray-200"} border-b -mx-4`}
        >
          <div className="flex">
            <button
              onClick={() => setActiveTab("lessons")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 whitespace-nowrap transition-all relative ${
                activeTab === "lessons"
                  ? theme === "dark"
                    ? "text-white"
                    : "text-gray-900"
                  : theme === "dark"
                    ? "text-gray-500 hover:text-gray-300"
                    : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <span>Lessons</span>
              {activeTab === "lessons" && (
                <div
                  className={`absolute bottom-0 left-0 right-0 h-0.5 ${theme === "dark" ? "bg-white" : "bg-gray-900"}`}
                />
              )}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="-mx-4 -mt-4">
          {/* Lessons Tab */}
          <div>
            <div className="grid grid-cols-3 gap-0">
              {userData.posts.map((post: any) => (
                <button
                  key={post.id}
                  className="group relative aspect-[3/4] overflow-hidden border border-gray-200"
                >
                  <ImageWithFallback
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}