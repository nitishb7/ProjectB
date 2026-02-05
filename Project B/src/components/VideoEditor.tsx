import { useState } from 'react';
import { X, Play, Pause, Scissors, Music, Type, Sparkles, Palette, Volume2, Crop, RotateCw } from 'lucide-react';

interface VideoEditorProps {
  onBack: () => void;
  onPublish: () => void;
  theme?: 'light' | 'dark';
}

export function VideoEditor({ onBack, onPublish }: VideoEditorProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'trim' | 'effects' | 'text' | 'music'>('trim');
  const [currentTime, setCurrentTime] = useState(0);
  const totalDuration = 60;

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

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gray-50 p-4 flex items-center justify-between border-b border-gray-200">
        <button onClick={onBack} className="text-black p-2 hover:bg-gray-100 rounded-full">
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-black">Edit Video</h2>
        <button
          onClick={onPublish}
          className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          Next
        </button>
      </div>

      {/* Video Preview */}
      <div className="flex-1 flex items-center justify-center bg-gray-100 p-4">
        <div className="relative w-full max-w-sm aspect-[9/16] bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl overflow-hidden">
          {/* Mock Video */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-6xl">🎓</div>
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-16 h-16 text-white" />
            ) : (
              <Play className="w-16 h-16 text-white" />
            )}
          </button>

          {/* Timeline Indicator */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm text-center">
              {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')} / {Math.floor(totalDuration / 60)}:{(totalDuration % 60).toString().padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-gray-50 p-2 border-t border-gray-200">
        <div className="relative h-12 bg-gray-200 rounded-lg overflow-hidden">
          {/* Timeline Track */}
          <div className="absolute inset-0 flex">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 border-r border-gray-300 bg-gradient-to-br from-blue-500/20 to-purple-500/20"
              />
            ))}
          </div>
          {/* Playhead */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-black"
            style={{ left: `${(currentTime / totalDuration) * 100}%` }}
          />
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-center gap-3 mt-3">
          <button className="text-black p-1.5 hover:bg-gray-200 rounded-full">
            <RotateCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-white p-2.5 bg-blue-500 rounded-full hover:bg-blue-600"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button className="text-black p-1.5 hover:bg-gray-200 rounded-full">
            <Crop className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editing Tools */}
      <div className="bg-gray-50 border-t border-gray-200">
        {/* Tool Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('trim')}
            className={`flex-1 py-3 flex flex-col items-center gap-1 ${
              activeTab === 'trim' ? 'bg-white text-black' : 'text-gray-400'
            }`}
          >
            <Scissors className="w-5 h-5" />
            <span className="text-xs">Trim</span>
          </button>
          <button
            onClick={() => setActiveTab('effects')}
            className={`flex-1 py-3 flex flex-col items-center gap-1 ${
              activeTab === 'effects' ? 'bg-white text-black' : 'text-gray-400'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-xs">Effects</span>
          </button>
          <button
            onClick={() => setActiveTab('text')}
            className={`flex-1 py-3 flex flex-col items-center gap-1 ${
              activeTab === 'text' ? 'bg-white text-black' : 'text-gray-400'
            }`}
          >
            <Type className="w-5 h-5" />
            <span className="text-xs">Text</span>
          </button>
          <button
            onClick={() => setActiveTab('music')}
            className={`flex-1 py-3 flex flex-col items-center gap-1 ${
              activeTab === 'music' ? 'bg-white text-black' : 'text-gray-400'
            }`}
          >
            <Music className="w-5 h-5" />
            <span className="text-xs">Music</span>
          </button>
        </div>

        {/* Tool Content */}
        <div className="p-4 max-h-48 overflow-y-auto">
          {activeTab === 'trim' && (
            <div className="space-y-3">
              <div>
                <label className="text-gray-600 text-sm block mb-2">Duration</label>
                <input
                  type="range"
                  min="0"
                  max={totalDuration}
                  value={currentTime}
                  onChange={(e) => setCurrentTime(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button className="p-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300">
                  15s
                </button>
                <button className="p-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300">
                  30s
                </button>
                <button className="p-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300">
                  60s
                </button>
              </div>
            </div>
          )}

          {activeTab === 'effects' && (
            <div className="grid grid-cols-3 gap-3">
              {effects.map(effect => (
                <button
                  key={effect.id}
                  className="flex flex-col items-center gap-2 p-3 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  <span className="text-3xl">{effect.icon}</span>
                  <span className="text-black text-sm">{effect.name}</span>
                </button>
              ))}
            </div>
          )}

          {activeTab === 'text' && (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Enter text..."
                className="w-full bg-gray-100 text-black px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="grid grid-cols-4 gap-2">
                {textStyles.map(style => (
                  <button
                    key={style.id}
                    className="p-2 bg-gray-100 text-black rounded-lg hover:bg-gray-200 text-sm"
                  >
                    {style.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'music' && (
            <div className="space-y-2">
              {musicTracks.map(track => (
                <button
                  key={track.id}
                  className="w-full flex items-center gap-3 p-3 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  <Volume2 className="w-5 h-5 text-black" />
                  <div className="flex-1 text-left">
                    <div className="text-black text-sm">{track.name}</div>
                    <div className="text-gray-600 text-xs">{track.artist} • {track.duration}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
