import { useEffect, useState } from 'react';
import { X, RotateCw, Circle, Image as ImageIcon, ChevronDown, BookOpen, Lightbulb, GraduationCap, Sparkles, Clock, Captions, FileText, Scissors, Music, Type, Sparkle, Gauge, Volume2, Play, Pause, Crop, Palette, Zap } from 'lucide-react';

interface CreateVideoProps {
  onBack: () => void;
  onContinue: () => void;
  theme?: 'light' | 'dark';
}

type StepType = 'camera' | 'edit' | 'setup';
type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | null;

interface SubjectCategory {
  name: string;
  subtopics: string[];
}

export function CreateVideo({ onBack, onContinue }: CreateVideoProps) {
  const [step, setStep] = useState<StepType>('camera');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedRecordingDuration, setSelectedRecordingDuration] = useState<15 | 30 | 180>(15);
  const [hasRecorded, setHasRecorded] = useState(false);
  
  // Post-recording metadata
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubtopic, setSelectedSubtopic] = useState('');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  // Video editor state
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'trim' | 'effects' | 'text' | 'music'>('trim');
  const [currentTime, setCurrentTime] = useState(0);
  const totalDuration = 60;
  
  // Exit warning popup
  const [showExitWarning, setShowExitWarning] = useState(false);
  
  // Quality checklist items
  const [qualityChecks, setQualityChecks] = useState({
    videoLength: false,
    captionsEnabled: false,
    sourceCitation: false
  });

  const formatRecordingTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
  };

  useEffect(() => {
    if (!isRecording) return;

    const timer = setInterval(() => {
      setRecordingTime((prev) => Math.min(prev + 1, selectedRecordingDuration));
    }, 1000);

    return () => clearInterval(timer);
  }, [isRecording, selectedRecordingDuration]);

  useEffect(() => {
    if (!isRecording) return;
    if (recordingTime < selectedRecordingDuration) return;

    setIsRecording(false);
    setHasRecorded(true);
  }, [isRecording, recordingTime, selectedRecordingDuration]);

  // Reset all state when leaving the create flow
  const resetCreateFlow = () => {
    setStep('camera');
    setIsRecording(false);
    setRecordingTime(0);
    setSelectedRecordingDuration(15);
    setHasRecorded(false);
    setSelectedCategory('');
    setSelectedSubtopic('');
    setDifficulty(null);
    setExpandedCategory(null);
    setTitle('');
    setDescription('');
    setIsPlaying(false);
    setActiveTab('trim');
    setCurrentTime(0);
    setShowExitWarning(false);
    setQualityChecks({
      videoLength: false,
      captionsEnabled: false,
      sourceCitation: false
    });
  };

  // Wrapped onBack handler
  const handleBack = () => {
    resetCreateFlow();
    onBack();
  };

  // Wrapped onContinue handler (for publishing)
  const handleContinue = () => {
    resetCreateFlow();
    onContinue();
  };

  const effects = [
    { id: '1', name: 'None', icon: '⚪' },
    { id: '2', name: 'Vintage', icon: '📷' },
    { id: '3', name: 'Vibrant', icon: '🌈' },
    { id: '4', name: 'B&W', icon: '⚫' },
    { id: '5', name: 'Sunset', icon: '🌅' },
    { id: '6', name: 'Cool', icon: '❄️' }
  ];

  const musicTracks = [
    { id: '1', name: 'Upbeat Learning', duration: '2:30', artist: 'EduTok Music' },
    { id: '2', name: 'Focus Flow', duration: '3:15', artist: 'Study Beats' },
    { id: '3', name: 'Knowledge Quest', duration: '2:45', artist: 'Brain Wave' },
    { id: '4', name: 'Discovery', duration: '3:00', artist: 'Learning Lab' }
  ];

  const textStyles = [
    { id: '1', name: 'Bold', style: 'bold' },
    { id: '2', name: 'Classic', style: 'classic' },
    { id: '3', name: 'Modern', style: 'modern' },
    { id: '4', name: 'Playful', style: 'playful' }
  ];

  const categories: SubjectCategory[] = [
    {
      name: 'Science',
      subtopics: ['Physics', 'Biology', 'Chemistry', 'Astronomy', 'Environmental Science']
    },
    {
      name: 'Mathematics',
   
      subtopics: ['Algebra', 'Geometry', 'Calculus', 'Statistics', 'Trigonometry']
    },
    {
      name: 'History',
      subtopics: ['World History', 'American History', 'Ancient Civilizations', 'Modern History']
    },
    {
      name: 'Art',
      subtopics: ['Drawing', 'Painting', 'Digital Art', 'Art History', 'Sculpture']
    },
    {
      name: 'Technology',
      subtopics: ['Programming', 'Web Development', 'Data Science', 'AI & Machine Learning']
    },
    {
      name: 'Language',
      subtopics: ['English', 'Spanish', 'French', 'Mandarin', 'Grammar']
    }
  ];

  const handleRecordToggle = () => {
    if (!isRecording) {
      setRecordingTime(0);
      setIsRecording(true);
    } else {
      setIsRecording(false);
      setHasRecorded(true);
      // In real implementation, stop recording
    }
  };

  const handleUseRecording = () => {
    setStep('edit');
  };

  const handleRetake = () => {
    setHasRecorded(false);
    setRecordingTime(0);
  };

  // Camera Screen - Immediate and minimal
  if (step === 'camera') {
    return (
      <div className="absolute inset-0 bg-black flex flex-col z-50">
        {/* Camera Preview Layer */}
        <div className="absolute inset-0 bg-neutral-900 overflow-hidden">
             {/* Gradient or Placeholder Image */}
             <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
             <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                 {/* Grid lines for composition */}
                 <div className="w-full h-full border-1 border-white/5 grid grid-cols-3 grid-rows-3">
                    <div className="border-r border-b border-white/10" />
                    <div className="border-r border-b border-white/10" />
                    <div className="border-b border-white/10" />
                    <div className="border-r border-b border-white/10" />
                    <div className="border-r border-b border-white/10" />
                    <div className="border-b border-white/10" />
                    <div className="border-r border-white/10" />
                    <div className="border-r border-white/10" />
                    <div className="" />
                 </div>
             </div>
        </div>

        {/* Top Controls Layer - Safe Area */}
        <div className="absolute top-0 left-0 right-0 pt-[15px] flex items-start justify-between z-20 pr-[16px] pb-[16px] pl-[16px] p-[16px]">
             {isRecording && (
               <div className="absolute left-1/2 top-[14px] -translate-x-1/2 pointer-events-none">
                 <div className="px-3 py-1 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white text-xs tracking-[0.12em] tabular-nums">
                   {formatRecordingTime(recordingTime)}
                 </div>
               </div>
             )}
             {/* Close */}
             <button onClick={handleBack} className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/30 transition-all">
                 <X className="w-5 h-5" />
             </button>

             {/* Right Side Tools Column */}
             <div className="flex flex-col gap-5 pt-2">
                 <button className="flex flex-col items-center gap-1 group">
                     <div className="flex items-center justify-center text-white group-active:scale-90 transition-all drop-shadow-md">
                         <RotateCw className="w-6 h-6" />
                     </div>
                     <span className="text-[10px] text-white font-medium drop-shadow-md">Flip</span>
                 </button>
                 <button className="flex flex-col items-center gap-1 group">
                     <div className="flex items-center justify-center text-white group-active:scale-90 transition-all drop-shadow-md">
                         <Zap className="w-6 h-6" />
                     </div>
                     <span className="text-[10px] text-white font-medium drop-shadow-md">Flash</span>
                 </button>
                 <button className="flex flex-col items-center gap-1 group">
                     <div className="flex items-center justify-center text-white group-active:scale-90 transition-all drop-shadow-md">
                         <Clock className="w-6 h-6" />
                     </div>
                     <span className="text-[10px] text-white font-medium drop-shadow-md">Timer</span>
                 </button>
             </div>
        </div>

        {/* Bottom Controls Layer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 pb-10 flex flex-col items-center justify-end z-20 bg-gradient-to-t from-black/80 via-transparent to-transparent h-64 pointer-events-none">
             <div className="pointer-events-auto w-full max-w-md mx-auto">
             {hasRecorded ? (
                <div className="flex items-center justify-between w-full px-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <button onClick={handleRetake} className="flex flex-col items-center gap-2 text-white group">
                        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-active:scale-95 transition-all">
                            <X className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-medium">Discard</span>
                    </button>
                    
                    <button onClick={handleUseRecording} className="flex flex-col items-center gap-2 text-white group">
                         <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/20 group-active:scale-95 transition-all">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                <ChevronDown className="w-5 h-5 text-red-500 -rotate-90 ml-0.5" />
                            </div>
                         </div>
                         <span className="text-xs font-medium">Next</span>
                    </button>
                </div>
             ) : (
                <div className="flex flex-col items-center w-full">
                 {/* Duration Selector (15s, 30s, 3m) */}
                 <div className="flex justify-center mb-8">
                     <div className="flex items-center gap-6 text-sm font-medium text-white/50 bg-black/30 backdrop-blur-md px-5 py-2 rounded-full border border-white/5">
                         <button
                           onClick={() => !isRecording && setSelectedRecordingDuration(15)}
                           className={`transition-colors ${selectedRecordingDuration === 15 ? 'text-white' : 'hover:text-white'} ${isRecording ? 'cursor-not-allowed opacity-60' : ''}`}
                           disabled={isRecording}
                         >
                           15s
                         </button>
                         <button
                           onClick={() => !isRecording && setSelectedRecordingDuration(30)}
                           className={`transition-colors ${selectedRecordingDuration === 30 ? 'text-white' : 'hover:text-white'} ${isRecording ? 'cursor-not-allowed opacity-60' : ''}`}
                           disabled={isRecording}
                         >
                           30s
                         </button>
                         <button
                           onClick={() => !isRecording && setSelectedRecordingDuration(180)}
                           className={`transition-colors ${selectedRecordingDuration === 180 ? 'text-white' : 'hover:text-white'} ${isRecording ? 'cursor-not-allowed opacity-60' : ''}`}
                           disabled={isRecording}
                         >
                           3m
                         </button>
                     </div>
                 </div>

                 <div className="w-full flex items-center justify-between px-8">
                     {/* Gallery */}
                     <button className="flex flex-col items-center gap-2 group w-16">
                         <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-800 to-black border border-white/20 flex items-center justify-center overflow-hidden group-active:scale-90 transition-all shadow-lg hover:border-white/40">
                             <ImageIcon className="w-5 h-5 text-white" />
                         </div>
                         <span className="text-[10px] text-white font-medium drop-shadow-md">Upload</span>
                     </button>

                     {/* Record Shutter */}
                     <button 
                         onClick={handleRecordToggle}
                         className="relative group cursor-pointer"
                     >
                         <div className={`w-[72px] h-[72px] rounded-full border-[4px] border-white/30 flex items-center justify-center transition-all duration-300 ${isRecording ? 'scale-110 border-red-500/50' : 'hover:scale-105 hover:border-white/50'}`}>
                             <div className={`rounded-full transition-all duration-300 ${isRecording ? 'w-8 h-8 rounded-md bg-red-500' : 'w-[60px] h-[60px] bg-red-500'}`} />
                         </div>
                     </button>

                     {/* Effects */}
                     <button className="flex flex-col items-center gap-2 group w-16">
                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-md border border-white/20 flex items-center justify-center overflow-hidden group-active:scale-90 transition-all shadow-lg hover:border-white/40">
                             <Sparkle className="w-5 h-5 text-white" />
                         </div>
                         <span className="text-[10px] text-white font-medium drop-shadow-md">Effects</span>
                     </button>
                 </div>
                </div>
             )}
             </div>
        </div>
      </div>
    );
  }

  // Edit Screen - Post-recording editing
  if (step === 'edit') {
    return (
      <div className="h-screen bg-white flex flex-col overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gray-50 backdrop-blur-xl border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-3">
            <button 
              onClick={() => setShowExitWarning(true)} 
              className="text-gray-600 hover:text-black transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <h1 className="text-black text-[20px]">Edit Video</h1>
            <button
              onClick={() => setStep('setup')}
              className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all"
            >
              Next
            </button>
          </div>
        </div>

        {/* Exit Warning Popup (Edit Screen) */}
        {showExitWarning && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-sm w-full border border-gray-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              {/* Header */}
              <div className="p-6 pb-4 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
                  <X className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-black text-2xl mb-2">Save your work?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  You have an unsaved video. Choose how you'd like to proceed with your content.
                </p>
              </div>
              
              {/* Actions */}
              <div className="p-6 pt-2 space-y-3">
                <button
                  onClick={() => {
                    // Save as draft logic would go here
                    setShowExitWarning(false);
                    handleBack();
                  }}
                  className="w-full py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-all font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                >
                  Save as Draft
                </button>
                <button
                  onClick={() => {
                    // Discard logic would go here
                    setShowExitWarning(false);
                    handleBack();
                  }}
                  className="w-full py-4 bg-gray-100 text-black rounded-full hover:bg-gray-200 transition-all border border-gray-200 hover:border-gray-300 font-medium"
                >
                  Discard Video
                </button>
                <button
                  onClick={() => setShowExitWarning(false)}
                  className="w-full py-3 text-gray-600 hover:text-black transition-colors font-medium"
                >
                  Continue Editing
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="p-6 max-w-2xl mx-auto space-y-6 pb-8">
            {/* Video Preview */}
            <div className="w-full max-w-[200px] mx-auto">
              <div className="relative w-full aspect-[9/16] bg-gray-200 rounded-xl overflow-hidden shadow-lg border border-gray-300">
                {/* Mock Video */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-5xl">🎓</div>
                </div>

                {/* Play/Pause Button */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/20 transition-colors group"
                >
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {isPlaying ? (
                      <Pause className="w-6 h-6 text-black" />
                    ) : (
                      <Play className="w-6 h-6 text-black ml-0.5" />
                    )}
                  </div>
                </button>

                {/* Timeline Indicator */}
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1 text-white text-[11px] text-center font-medium">
                    {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')} / {Math.floor(totalDuration / 60)}:{(totalDuration % 60).toString().padStart(2, '0')}
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              <div className="relative h-14 bg-gray-100 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200">
                {/* Timeline Track */}
                <div className="absolute inset-0 flex">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 border-r border-gray-200 bg-gradient-to-br from-blue-500/10 to-purple-500/10"
                    />
                  ))}
                </div>
                {/* Playhead */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-blue-500 shadow-lg shadow-blue-500/50"
                  style={{ left: `${(currentTime / totalDuration) * 100}%` }}
                >
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-400 rounded-full border-2 border-white shadow-lg" />
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-center gap-4">
                <button className="w-10 h-10 rounded-full bg-gray-100 backdrop-blur-sm border border-gray-200 flex items-center justify-center hover:bg-gray-200 hover:border-gray-300 transition-all text-black">
                  <RotateCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full hover:from-blue-600 hover:to-blue-700 flex items-center justify-center transition-all shadow-lg shadow-blue-500/30 text-white"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
                <button className="w-10 h-10 rounded-full bg-gray-100 backdrop-blur-sm border border-gray-200 flex items-center justify-center hover:bg-gray-200 hover:border-gray-300 transition-all text-black">
                  <Crop className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Editing Tools - Full Width */}
          <div className="bg-gray-50 border-t border-gray-200">
            {/* Tool Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('trim')}
                className={`flex-1 py-4 flex flex-col items-center gap-1.5 transition-all ${
                  activeTab === 'trim' 
                    ? 'bg-white text-black border-b-2 border-blue-500' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Scissors className="w-5 h-5" />
                <span className="text-xs font-medium">Trim</span>
              </button>
              <button
                onClick={() => setActiveTab('effects')}
                className={`flex-1 py-4 flex flex-col items-center gap-1.5 transition-all ${
                  activeTab === 'effects' 
                    ? 'bg-white text-black border-b-2 border-blue-500' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Sparkles className="w-5 h-5" />
                <span className="text-xs font-medium">Effects</span>
              </button>
              <button
                onClick={() => setActiveTab('text')}
                className={`flex-1 py-4 flex flex-col items-center gap-1.5 transition-all ${
                  activeTab === 'text' 
                    ? 'bg-white text-black border-b-2 border-blue-500' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Type className="w-5 h-5" />
                <span className="text-xs font-medium">Text</span>
              </button>
              <button
                onClick={() => setActiveTab('music')}
                className={`flex-1 py-4 flex flex-col items-center gap-1.5 transition-all ${
                  activeTab === 'music' 
                    ? 'bg-white text-black border-b-2 border-blue-500' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Music className="w-5 h-5" />
                <span className="text-xs font-medium">Music</span>
              </button>
            </div>

            {/* Tool Content */}
            <div className="p-5 pb-24">
              {activeTab === 'trim' && (
                <div className="space-y-4 max-w-2xl mx-auto">
                  <div>
                    <label className="text-gray-600 text-sm font-medium block mb-3">Duration</label>
                    <input
                      type="range"
                      min="0"
                      max={totalDuration}
                      value={currentTime}
                      onChange={(e) => setCurrentTime(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-500"
                    />
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                      <span>0:00</span>
                      <span>1:00</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <button className="py-3 bg-gray-100 backdrop-blur-sm text-black rounded-full hover:bg-gray-200 transition-all border border-gray-200 hover:border-gray-300 font-medium">
                      15s
                    </button>
                    <button className="py-3 bg-gray-100 backdrop-blur-sm text-black rounded-full hover:bg-gray-200 transition-all border border-gray-200 hover:border-gray-300 font-medium">
                      30s
                    </button>
                    <button className="py-3 bg-gray-100 backdrop-blur-sm text-black rounded-full hover:bg-gray-200 transition-all border border-gray-200 hover:border-gray-300 font-medium">
                      60s
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'effects' && (
                <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto">
                  {effects.map(effect => (
                    <button
                      key={effect.id}
                      className="flex flex-col items-center gap-2.5 p-4 bg-gray-100 backdrop-blur-sm rounded-2xl hover:bg-gray-200 transition-all border border-gray-200 hover:border-gray-300"
                    >
                      <span className="text-3xl">{effect.icon}</span>
                      <span className="text-black text-sm font-medium">{effect.name}</span>
                    </button>
                  ))}
                </div>
              )}

              {activeTab === 'text' && (
                <div className="space-y-4 max-w-2xl mx-auto">
                  <input
                    type="text"
                    placeholder="Enter text..."
                    className="w-full bg-gray-100 backdrop-blur-sm text-black px-4 py-3 rounded-full border border-gray-200 focus:border-blue-500 focus:outline-none placeholder:text-gray-500 font-medium"
                  />
                  <div className="grid grid-cols-4 gap-2">
                    {textStyles.map(style => (
                      <button
                        key={style.id}
                        className="py-2.5 bg-gray-100 backdrop-blur-sm text-black rounded-full hover:bg-gray-200 transition-all text-sm border border-gray-200 hover:border-gray-300 font-medium"
                      >
                        {style.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'music' && (
                <div className="space-y-2.5 max-w-2xl mx-auto">
                  {musicTracks.map(track => (
                    <button
                      key={track.id}
                      className="w-full flex items-center gap-3.5 p-4 bg-gray-100 backdrop-blur-sm rounded-2xl hover:bg-gray-200 transition-all border border-gray-200 hover:border-gray-300"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                        <Volume2 className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-black text-sm font-medium">{track.name}</div>
                        <div className="text-gray-500 text-xs mt-0.5">{track.artist} • {track.duration}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Setup Screen - Combined metadata and final details
  if (step === 'setup') {
    return (
      <div className="h-screen bg-white flex flex-col overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gray-50 backdrop-blur-xl border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-3">
            <button 
              onClick={() => setShowExitWarning(true)} 
              className="text-gray-600 hover:text-black transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <h1 className="text-black text-[20px]">Publish Your Video</h1>
            <button 
              onClick={handleContinue}
              disabled={!selectedCategory || !title}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedCategory && title
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Publish
            </button>
          </div>
        </div>

        {/* Exit Warning Popup (Setup Screen) */}
        {showExitWarning && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-sm w-full border border-gray-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              {/* Header */}
              <div className="p-6 pb-4 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
                  <X className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-black text-2xl mb-2">Save your work?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  You have an unsaved video. Choose how you'd like to proceed with your content.
                </p>
              </div>
              
              {/* Actions */}
              <div className="p-6 pt-2 space-y-3">
                <button
                  onClick={() => {
                    // Save as draft logic would go here
                    setShowExitWarning(false);
                    handleBack();
                  }}
                  className="w-full py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-all font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                >
                  Save as Draft
                </button>
                <button
                  onClick={() => {
                    // Discard logic would go here
                    setShowExitWarning(false);
                    handleBack();
                  }}
                  className="w-full py-4 bg-gray-100 text-black rounded-full hover:bg-gray-200 transition-all border border-gray-200 hover:border-gray-300 font-medium"
                >
                  Discard Video
                </button>
                <button
                  onClick={() => setShowExitWarning(false)}
                  className="w-full py-3 text-gray-600 hover:text-black transition-colors font-medium"
                >
                  Continue Editing
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="p-6 max-w-2xl mx-auto space-y-6 pb-24">
            {/* Video Preview Thumbnail */}
            <div className="w-full max-w-[200px] mx-auto aspect-[9/16] bg-gray-200 rounded-xl overflow-hidden flex items-center justify-center border border-gray-300 shadow-lg">
              <div className="text-center">
                <Circle className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p className="text-gray-500 text-sm">Your recorded video</p>
              </div>
            </div>

            {/* Title Input */}
            <div>
              <label className="text-black mb-3 block">Add a title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your video a catchy title..."
                className="w-full bg-gray-50 text-black px-4 py-3 rounded-full border border-gray-200 focus:border-blue-500 focus:outline-none placeholder:text-gray-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-black mb-3 block">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what viewers will learn..."
                rows={4}
                className="w-full bg-gray-50 text-black px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none resize-none placeholder:text-gray-500"
              />
            </div>

            {/* Category Selection */}
            <div>
              <h2 className="text-black mb-3">What will you teach? *</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.name} className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => {
                        // Select the category
                        setSelectedCategory(category.name);
                        // Toggle expansion - if clicking the already selected category, toggle it; otherwise expand it
                        if (selectedCategory === category.name && expandedCategory === category.name) {
                          setExpandedCategory(null);
                        } else {
                          setExpandedCategory(category.name);
                        }
                      }}
                      className={`w-full flex items-center justify-between p-4 transition-all ${
                        selectedCategory === category.name ? 'bg-blue-500/10' : 'hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-black">{category.name}</span>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${
                        expandedCategory === category.name ? 'rotate-180' : ''
                      }`} />
                    </button>
                    
                    {/* Subtopics */}
                    {expandedCategory === category.name && (
                      <div className="px-4 pb-4 pt-2 space-y-2 animate-in slide-in-from-top-2 duration-200">
                        <p className="text-gray-500 text-xs mb-2">Select a subtopic (optional)</p>
                        <div className="grid grid-cols-2 gap-2">
                          {category.subtopics.map((subtopic) => (
                            <button
                              key={subtopic}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedSubtopic(selectedSubtopic === subtopic ? '' : subtopic);
                              }}
                              className={`px-3 py-2 rounded-full text-sm transition-all ${
                                selectedSubtopic === subtopic
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-black'
                              }`}
                            >
                              {subtopic}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Options */}
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-xl border border-gray-200">
                <span className="text-black">Allow comments</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-500" />
              </div>
            </div>

            {/* Publish Button */}
            <button 
              onClick={handleContinue}
              disabled={!selectedCategory || !title}
              className={`w-full py-4 rounded-full transition-all ${
                selectedCategory && title
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:shadow-blue-500/50 font-medium'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Publish Video
            </button>
          </div>
        </div>
      </div>
    );
  }

  // This return should never be reached since we handle all steps above
  return null;
}
