import { useState } from 'react';
import { X, ThumbsUp, Send, MoreVertical, ChevronDown, ChevronUp, MessageCircle, AlertCircle, CheckCircle } from 'lucide-react';

interface Comment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  helpful: number;
  markedHelpful: boolean;
  replies: number;
  timestamp: string;
  type: 'insight' | 'question' | 'instructor';
  isInstructor?: boolean;
  showReplies?: boolean;
}

interface CommentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  commentCount: number;
}

export function CommentDrawer({ isOpen, onClose, commentCount }: CommentDrawerProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      user: 'Dr. Sarah Chen',
      avatar: '👩‍🔬',
      text: 'Great question! The key concept here is understanding the relationship between variables. Think of it like a see-saw - when one side goes up, the other must come down to maintain balance.',
      helpful: 243,
      markedHelpful: false,
      replies: 5,
      timestamp: '2h ago',
      type: 'instructor',
      isInstructor: true,
      showReplies: false
    },
    {
      id: '2',
      user: 'Mike Johnson',
      avatar: '👨‍🎓',
      text: 'Could you explain how this applies to real-world scenarios? I\'m having trouble connecting the theory to practice.',
      helpful: 89,
      markedHelpful: true,
      replies: 2,
      timestamp: '5h ago',
      type: 'question',
      showReplies: false
    },
    {
      id: '3',
      user: 'Emma Davis',
      avatar: '👩‍💻',
      text: 'I found it helpful to work through the examples step-by-step rather than trying to understand everything at once. Breaking it down into smaller chunks made a huge difference.',
      helpful: 156,
      markedHelpful: false,
      replies: 8,
      timestamp: '1d ago',
      type: 'insight',
      showReplies: false
    },
    {
      id: '4',
      user: 'Alex Rivera',
      avatar: '🧑‍🎓',
      text: 'At 3:45, you mentioned the formula - is there a typo in the slide? The exponent seems different from the textbook version.',
      helpful: 67,
      markedHelpful: false,
      replies: 1,
      timestamp: '1d ago',
      type: 'question',
      showReplies: false
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [sortBy, setSortBy] = useState<'helpful' | 'questions' | 'newest'>('helpful');
  const [commentType, setCommentType] = useState<'insight' | 'question' | null>(null);

  const handleHelpful = (id: string) => {
    setComments(comments.map(comment =>
      comment.id === id
        ? {
            ...comment,
            markedHelpful: !comment.markedHelpful,
            helpful: comment.markedHelpful ? comment.helpful - 1 : comment.helpful + 1
          }
        : comment
    ));
  };

  const toggleReplies = (id: string) => {
    setComments(comments.map(comment =>
      comment.id === id
        ? { ...comment, showReplies: !comment.showReplies }
        : comment
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj: Comment = {
        id: Date.now().toString(),
        user: 'You',
        avatar: '👤',
        text: newComment,
        helpful: 0,
        markedHelpful: false,
        replies: 0,
        timestamp: 'Just now',
        type: commentType || 'insight',
        showReplies: false
      };
      setComments([newCommentObj, ...comments]);
      setNewComment('');
      setCommentType(null);
    }
  };

  const getTypeBadge = (type: string, isInstructor?: boolean) => {
    if (isInstructor) {
      return (
        <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full text-xs">
          <CheckCircle className="w-3 h-3" />
          Instructor
        </div>
      );
    }
    
    switch (type) {
      case 'question':
        return (
          <div className="flex items-center gap-1 px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded-full text-xs">
            <AlertCircle className="w-3 h-3" />
            Question
          </div>
        );
      case 'insight':
        return (
          <div className="flex items-center gap-1 px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full text-xs">
            <MessageCircle className="w-3 h-3" />
            Insight
          </div>
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop - Dimmed video background */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Bottom Sheet Drawer */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-b from-gray-900 to-black rounded-t-3xl z-50 max-w-md mx-auto h-[85vh] flex flex-col animate-slide-up shadow-2xl border-t border-white/10">
        {/* Header with Comment Count */}
        <div className="flex flex-col p-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-gray-400" />
              <h3 className="text-white">{commentCount} Comments</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Sorting Options */}
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy('helpful')}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                sortBy === 'helpful'
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
              }`}
            >
              Most Helpful
            </button>
            <button
              onClick={() => setSortBy('questions')}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                sortBy === 'questions'
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
              }`}
            >
              Questions
            </button>
            <button
              onClick={() => setSortBy('newest')}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                sortBy === 'newest'
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
              }`}
            >
              Newest
            </button>
          </div>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {comments.map((comment, index) => (
            <div key={comment.id}>
              <div 
                className={`p-4 rounded-2xl transition-all ${
                  comment.isInstructor 
                    ? 'bg-blue-500/10 border border-blue-500/20' 
                    : 'hover:bg-white/5'
                }`}
              >
                <div className="flex gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0 ${
                    comment.isInstructor 
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 ring-2 ring-blue-400/50' 
                      : 'bg-gradient-to-br from-gray-700 to-gray-800'
                  }`}>
                    {comment.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-white">{comment.user}</span>
                      {getTypeBadge(comment.type, comment.isInstructor)}
                      <span className="text-gray-500 text-xs">{comment.timestamp}</span>
                    </div>
                    <p className="text-gray-300 mb-3 leading-relaxed">{comment.text}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <button
                        onClick={() => handleHelpful(comment.id)}
                        className={`flex items-center gap-1.5 transition-colors ${
                          comment.markedHelpful 
                            ? 'text-blue-400' 
                            : 'text-gray-500 hover:text-blue-400'
                        }`}
                      >
                        <ThumbsUp
                          className={`w-4 h-4 ${
                            comment.markedHelpful ? 'fill-blue-400' : ''
                          }`}
                        />
                        <span>Helpful</span>
                        <span className="text-gray-600">·</span>
                        <span>{comment.helpful}</span>
                      </button>
                      {comment.replies > 0 && (
                        <button 
                          onClick={() => toggleReplies(comment.id)}
                          className="flex items-center gap-1.5 text-gray-500 hover:text-gray-300 transition-colors"
                        >
                          {comment.showReplies ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                          <span>{comment.replies} {comment.replies === 1 ? 'reply' : 'replies'}</span>
                        </button>
                      )}
                      <button className="text-gray-500 hover:text-gray-300 transition-colors">
                        Reply
                      </button>
                      <button className="ml-auto text-gray-600 hover:text-gray-400 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Subtle divider between comments */}
              {index < comments.length - 1 && (
                <div className="h-px bg-white/5 my-1" />
              )}
            </div>
          ))}
        </div>

        {/* Comment Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-black/50 backdrop-blur-xl">
          {/* Quick-select chips */}
          {(commentType || !newComment) && (
            <div className="flex gap-2 mb-3">
              <button
                type="button"
                onClick={() => setCommentType(commentType === 'question' ? null : 'question')}
                className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                  commentType === 'question'
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                    : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                }`}
              >
                <AlertCircle className="w-3 h-3 inline mr-1" />
                Question
              </button>
              <button
                type="button"
                onClick={() => setCommentType(commentType === 'insight' ? null : 'insight')}
                className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                  commentType === 'insight'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                }`}
              >
                <MessageCircle className="w-3 h-3 inline mr-1" />
                Insight
              </button>
            </div>
          )}

          <div className="flex gap-2 items-end">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-xl flex-shrink-0">
              👤
            </div>
            <div className="flex-1 flex gap-2">
              <div className="flex-1 relative">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Ask a question or add an insight..."
                  rows={1}
                  className="w-full bg-white/5 text-white px-4 py-3 rounded-2xl border border-white/10 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none placeholder:text-gray-500"
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = Math.min(target.scrollHeight, 120) + 'px';
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={!newComment.trim()}
                className={`p-3 rounded-full transition-all flex-shrink-0 ${
                  newComment.trim()
                    ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/30'
                    : 'bg-white/5 text-gray-600 cursor-not-allowed'
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}