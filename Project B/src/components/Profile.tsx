import {
  Settings,
  Share2,
  BookmarkCheck,
  Video,
  Award,
  Eye,
  ChevronLeft,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState, useRef } from "react";
import { ScrollProgress } from "./ScrollProgress";

interface ProfileProps {
  onClose?: () => void;
  isOwnProfile?: boolean; // New prop to determine if viewing own profile
  onNavigateToSettings?: () => void; // Navigate to settings
  theme?: "light" | "dark";
}

export function Profile({
  onClose,
  isOwnProfile = true,
  onNavigateToSettings,
  theme = "light",
}: ProfileProps) {
  const [activeTab, setActiveTab] = useState<"lessons" | "saved">(
    "lessons",
  );
  const containerRef = useRef<HTMLDivElement>(null);

  // Mock user data - this would come from backend
  const userData = {
    name: "Alex Rivera",
    username: "alexrivera",
    bio: "Passionate about physics and mathematics. Teaching what I learn, learning what I teach.",
    profileImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",

    // Minimal stats - focused on contribution, not vanity
    stats: {
      contributions: 24,
      helpedLearners: "2.1K",
      learning: 12,
    },
    // Has published content - so shows creator tabs
    hasPublishedContent: true,
    // User's published videos
    posts: [
      {
        id: 1,
        thumbnail:
          "https://images.unsplash.com/photo-1608037222022-62649819f8aa?w=300&h=400&fit=crop",
        title: "Quantum Mechanics Basics",
        learnersHelped: "2.1K",
      },
      {
        id: 2,
        thumbnail:
          "https://images.unsplash.com/photo-1758685734312-5134968399a8?w=300&h=400&fit=crop",
        title: "Calculus Made Simple",
        learnersHelped: "1.8K",
      },
      {
        id: 3,
        thumbnail:
          "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=400&fit=crop",
        title: "Einstein's Relativity",
        learnersHelped: "2.4K",
      },
      {
        id: 4,
        thumbnail:
          "https://images.unsplash.com/photo-1453733190371-0a9bedd82893?w=300&h=400&fit=crop",
        title: "Newton's Laws Explained",
        learnersHelped: "1.9K",
      },
      {
        id: 5,
        thumbnail:
          "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=300&h=400&fit=crop",
        title: "Organic Chemistry Fundamentals",
        learnersHelped: "3.2K",
      },
      {
        id: 6,
        thumbnail:
          "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=300&h=400&fit=crop",
        title: "Linear Algebra Explained",
        learnersHelped: "2.7K",
      },
      {
        id: 7,
        thumbnail:
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=400&fit=crop",
        title: "Astrophysics for Beginners",
        learnersHelped: "4.1K",
      },
      {
        id: 8,
        thumbnail:
          "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=400&fit=crop",
        title: "Statistics Made Easy",
        learnersHelped: "2.3K",
      },
      {
        id: 9,
        thumbnail:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=400&fit=crop",
        title: "Computer Science Basics",
        learnersHelped: "3.8K",
      },
      {
        id: 10,
        thumbnail:
          "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=300&h=400&fit=crop",
        title: "Trigonometry Essentials",
        learnersHelped: "2.9K",
      },
      {
        id: 11,
        thumbnail:
          "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=300&h=400&fit=crop",
        title: "Thermodynamics Explained",
        learnersHelped: "3.5K",
      },
    ],
    // Saved content for learning
    saved: [
      {
        id: 1,
        thumbnail:
          "https://images.unsplash.com/photo-1613324767976-f65bc7d80936?w=300&h=400&fit=crop",
        title: "World War II History",
        creator: "@historyteacher",
      },
      {
        id: 2,
        thumbnail:
          "https://images.unsplash.com/photo-1758522274945-7f000385a3dd?w=300&h=400&fit=crop",
        title: "Renaissance Art",
        creator: "@arthistorian",
      },
      {
        id: 3,
        thumbnail:
          "https://images.unsplash.com/photo-1649920442906-3c8ef428fb6e?w=300&h=400&fit=crop",
        title: "Python Programming",
        creator: "@codemaster",
      },
    ],
  };

  // Simplified tabs: Posts is always shown, Saved only on own profile
  const tabs = [
    { id: "lessons" as const, label: "Lessons", icon: Video },
    ...(isOwnProfile
      ? [
          {
            id: "saved" as const,
            label: "Saved",
            icon: BookmarkCheck,
          },
        ]
      : []),
  ];

  return (
    <div
      ref={containerRef}
      className={`h-full ${theme === "dark" ? "bg-black" : "bg-white"} overflow-y-auto pb-16 relative`}
    >
      <ScrollProgress containerRef={containerRef} />
      {/* Header with Settings */}
      <div
        className={`sticky top-0 z-10 ${theme === "dark" ? "bg-black/80 border-white/10" : "bg-white/80 border-gray-200"} backdrop-blur-xl border-b`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            {!isOwnProfile && (
              <button
                onClick={onClose}
                className={`${theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            <h1
              className={`${theme === "dark" ? "text-white" : "text-gray-900"} font-normal text-[20px]`}
            >
              @{userData.username}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              className={`${theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
            >
              <Share2 className="w-5 h-5" />
            </button>
            {isOwnProfile && (
              <button
                className={`${theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
                onClick={onNavigateToSettings}
              >
                <Settings className="w-5 h-5" />
              </button>
            )}
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
                2105
              </span>
              {" Learners · "}
              <span
                className={`${theme === "dark" ? "text-white" : "text-gray-900"} font-medium`}
              >
                15
              </span>
              {" Lessons"}
            </div>

            {/* Bio - 2 lines max */}
            <p
              className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"} text-sm leading-relaxed line-clamp-2`}
            >
              Passionate about physics and mathematics. Teaching
              what I learn, learning what I teach.
            </p>

            {/* Action Button */}
            <button className="w-full py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all font-medium">
              {isOwnProfile ? "Edit Profile" : "Follow"}
            </button>
          </div>
        </div>

        {/* Simplified Tabs */}
        <div
          className={`${theme === "dark" ? "border-white/10" : "border-gray-200"} border-b -mx-4`}
        >
          <div className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 whitespace-nowrap transition-all relative ${
                    activeTab === tab.id
                      ? theme === "dark"
                        ? "text-white"
                        : "text-gray-900"
                      : theme === "dark"
                        ? "text-gray-500 hover:text-gray-300"
                        : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <span>{tab.label}</span>
                  {activeTab === tab.id && (
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-0.5 ${theme === "dark" ? "bg-white" : "bg-gray-900"}`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="-mx-4 -mt-4">
          {/* Posts Tab */}
          {activeTab === "lessons" && (
            <div>
              <div className="grid grid-cols-3 gap-0">
                {userData.posts.map((post) => (
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
          )}

          {/* Saved Tab - Only visible on own profile */}
          {activeTab === "saved" && isOwnProfile && (
            <div>
              <div className="grid grid-cols-3 gap-0">
                {userData.saved.map((video) => (
                  <button
                    key={video.id}
                    className="group relative aspect-[3/4] overflow-hidden border border-gray-200"
                  >
                    <ImageWithFallback
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}