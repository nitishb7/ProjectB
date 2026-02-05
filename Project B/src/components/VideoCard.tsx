import { MessageCircle, Share2, Bookmark, ChevronRight, Clock, ChevronDown, MoreVertical, Star } from 'lucide-react';
import { Video } from './VideoFeed';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { CommentDrawer } from './CommentDrawer';
import { SupportDrawer } from './SupportDrawer';

interface VideoCardProps {
  video: Video;
  onSave: (videoId: string) => void;
  onNavigateToProfile?: (creatorId: string) => void;
}

export function VideoCard({ video, onSave, onNavigateToProfile }: VideoCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showOverflowMenu, setShowOverflowMenu] = useState(false);
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-green-400';
      case 'Intermediate':
        return 'text-blue-400';
      case 'Advanced':
        return 'text-purple-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="relative h-screen w-full snap-start bg-black">
      {/* Full-Screen Video */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
        />
        {/* Minimal gradient - only at bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
      </div>

      {/* Minimal Overlays */}
      <div className="relative h-full flex flex-col justify-end">
        <div className="flex items-end justify-between px-4 pb-24 gap-3">
          
          {/* Bottom Left - Caption & Creator */}
          <div className="flex-1 max-w-[calc(100%-70px)]">
            <div 
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full text-left space-y-2 cursor-pointer"
            >
              {/* Creator Row - Always Visible */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigateToProfile?.(video.id);
                  }}
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 hover:opacity-80 transition-opacity"
                >
                  <span className="text-base">{video.avatar}</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigateToProfile?.(video.id);
                  }}
                  className="text-white text-sm font-medium truncate hover:opacity-80 transition-opacity"
                >
                  {video.creator}
                </button>
                <button 
                  onClick={(e) => e.stopPropagation()}
                  className="px-3 py-1 border border-white/40 text-white text-xs rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
                >
                  Follow
                </button>
              </div>

              {/* Title - Single Line or Expanded */}
              <div className="space-y-1.5">
                <h2 className={`text-white text-[15px] leading-snug ${isExpanded ? '' : 'line-clamp-1'}`}>
                  {video.title}
                </h2>
                
                {/* Description - Always visible, clamped when collapsed */}
                <p className={`text-white/80 text-sm leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                  {video.subtitle}
                </p>
                
                {/* Expanded Content */}
                {isExpanded && (
                  <div className="space-y-2 pb-1">
                    {/* Metadata - Text only, no chips */}
                    <div className="flex items-center gap-3 text-xs text-white/60">
                      <span>{video.category}</span>
                      <span className={getDifficultyColor(video.difficulty)}>
                        {video.difficulty}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {video.duration}
                      </span>
                    </div>

                    {video.creatorCredibility && (
                      <p className="text-white/50 text-xs">
                        {video.creatorCredibility}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Minimal Action Stack */}
          <div className="flex flex-col items-center gap-6 pb-1">
            
            {/* Save */}
            <button
              onClick={() => onSave(video.id)}
              className="flex flex-col items-center gap-1"
            >
              <Bookmark
                className={`w-7 h-7 transition-all ${
                  video.isSaved 
                    ? 'text-blue-400 fill-blue-400' 
                    : 'text-white drop-shadow-lg'
                }`}
              />
              <span className="text-white text-[10px] drop-shadow-lg">Save</span>
            </button>

            {/* Support Creator */}
            <button
              className="flex flex-col items-center gap-1"
              onClick={() => setShowSupport(true)}
            >
              <div className="relative w-7 h-7">
                <Star className="w-7 h-7 text-white/40 drop-shadow-lg absolute top-1 left-1" />
                <Star className="w-7 h-7 text-white fill-white drop-shadow-lg absolute top-0 left-0" />
              </div>
              <span className="text-white text-[10px] drop-shadow-lg">Support</span>
            </button>

            {/* Discuss */}
            <button 
              className="flex flex-col items-center gap-1" 
              onClick={() => setShowComments(true)}
            >
              <MessageCircle className="w-7 h-7 text-white drop-shadow-lg" />
              <span className="text-white text-[10px] drop-shadow-lg">Discuss</span>
            </button>

            {/* Share */}
            <button className="flex flex-col items-center gap-1">
              <Share2 className="w-7 h-7 text-white drop-shadow-lg" />
              <span className="text-white text-[10px] drop-shadow-lg">Share</span>
            </button>

            {/* Overflow Menu */}
            <button
              onClick={() => setShowOverflowMenu(!showOverflowMenu)}
              className="flex flex-col items-center gap-1"
            >
              <MoreVertical className="w-7 h-7 text-white drop-shadow-lg" />
              <span className="text-white text-[10px] drop-shadow-lg">More</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Comment Drawer */}
      <CommentDrawer 
        isOpen={showComments} 
        onClose={() => setShowComments(false)} 
        commentCount={video.comments}
      />

      {/* Support Drawer */}
      <SupportDrawer
        isOpen={showSupport}
        onClose={() => setShowSupport(false)}
        creatorName={video.creator}
      />

      {/* Overflow Menu Bottom Sheet */}
      {showOverflowMenu && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowOverflowMenu(false)}
          />
          
          {/* Bottom Sheet */}
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 animate-slide-up">
            <div className="px-4 pt-6 pb-8">
              {/* Handle */}
              <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
              
              {/* Menu Options */}
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setShowOverflowMenu(false);
                    // Handle action
                  }}
                  className="w-full text-left px-4 py-3.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Not interested in this topic
                </button>
                
                <button
                  onClick={() => {
                    setShowOverflowMenu(false);
                    // Handle action
                  }}
                  className="w-full text-left px-4 py-3.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Hide this video
                </button>
                
                <button
                  onClick={() => {
                    setShowOverflowMenu(false);
                    // Handle action
                  }}
                  className="w-full text-left px-4 py-3.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Block this creator
                </button>
                
                <button
                  onClick={() => {
                    setShowOverflowMenu(false);
                    // Handle action
                  }}
                  className="w-full text-left px-4 py-3.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Report
                </button>
              </div>
              
              {/* Cancel Button */}
              <button
                onClick={() => setShowOverflowMenu(false)}
                className="w-full mt-4 px-4 py-3.5 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}