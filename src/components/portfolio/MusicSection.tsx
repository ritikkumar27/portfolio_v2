"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, ListMusic, ChevronDown, ChevronUp } from "lucide-react";

// Playlist using local public assets
const playlist = [
  {
    id: "1",
    title: "Just Forget",
    artist: "Nujabes",
    duration: "3:55",
    coverImage: "/images/nujabes.jpg",
    audioUrl: "/music/just-forget-nujabes.mp3",
  }
];

const formatTime = (time: number) => {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export default function MusicSection() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  
  // Conditionally collapse on mobile load
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) {
        setIsMinimized(true);
      }
    }
  }, []);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentSong = playlist[currentSongIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.1;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      handleNext();
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    if (audio.readyState >= 1) {
      setDuration(audio.duration);
    }

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSongIndex]);

  // Handle play/pause
  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch((error) => {
        console.log("Autoplay prevented by browser:", error);
        setIsPlaying(false);
      });
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentSongIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleNext = () => {
    if (playlist.length === 1 && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    } else {
      setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
    }
    setIsPlaying(true);
  };

  const handlePrev = () => {
    if (playlist.length === 1 && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    } else {
      setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    }
    setIsPlaying(true);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current && audioRef.current.duration) {
      const newTime = (Number(e.target.value) / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(Number(e.target.value));
    }
  };

  const playSong = (index: number) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  return (
    <div className={`fixed bottom-6 left-6 md:left-8 md:bottom-8 z-40 transition-all duration-300 ${
      isMinimized 
        ? "w-14 h-14 md:w-16 md:h-16 rounded-full cursor-pointer hover:scale-105 active:scale-95 flex items-center justify-center bg-white/10 dark:bg-black/30 backdrop-blur-xl border border-gray-200/40 dark:border-white/20 shadow-2xl" 
        : "w-[calc(100%-3rem)] md:w-80 bg-white/5 dark:bg-black/20 backdrop-blur-md border border-gray-200/30 dark:border-white/10 shadow-xl rounded-2xl overflow-hidden"
    }`}>
      
      {isMinimized ? (
        <div 
          onClick={() => setIsMinimized(false)}
          className="w-full h-full relative flex items-center justify-center group"
          title="Expand Music Player"
        >
          {/* Spinning Cover */}
          <div className={`absolute inset-0 rounded-full overflow-hidden transition-all duration-500 border-2 border-gray-200/20 dark:border-indigo-500/30 ${isPlaying ? 'spin-slow' : ''}`}>
             <img src={currentSong.coverImage} className="w-full h-full object-cover" alt="Vinyl Cover" />
             <div className="absolute inset-0 m-auto w-3 h-3 bg-white/20 dark:bg-black/40 backdrop-blur-sm rounded-full border border-gray-300/30 dark:border-white/20"></div>
          </div>
          {/* View Icon Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
            <ChevronUp size={24} className="text-white" />
          </div>
        </div>
      ) : (
        <>
          {/* Main Player Area */}
          <div className="p-4 relative">
            
            {/* Context menu for minimize */}
            <button
              onClick={() => setIsMinimized(true)}
              className="absolute top-3 right-3 p-1.5 md:flex md:top-2 md:right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors bg-black/5 dark:bg-white/10 rounded-full z-10"
              aria-label="Minimize Player"
            >
              <ChevronDown size={14} />
            </button>
        {/* Track Info & Play Button */}
        <div className="flex items-center gap-4">
          {/* Constantly spinning cover if playing */}
          <div className={`relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-200/20 dark:border-white/10 shadow-sm transition-all duration-500 ${isPlaying ? 'spin-slow shadow-indigo-500/30 ring-2 ring-indigo-500/50' : ''}`}>
            <img 
              src={currentSong.coverImage} 
              alt={`${currentSong.title} Cover`}
              className="w-full h-full object-cover rounded-full"
            />
            {/* Center hole to make it look like a vinyl record */}
            <div className="absolute inset-0 m-auto w-3 h-3 bg-white/20 dark:bg-black/40 backdrop-blur-sm rounded-full border border-gray-300/30 dark:border-white/20"></div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">{currentSong.title}</h3>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 truncate">{currentSong.artist}</p>
          </div>

          <button 
            onClick={togglePlay}
            className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg shadow-indigo-600/20 transition-all duration-200 active:scale-95 flex items-center justify-center flex-shrink-0"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause size={18} className="fill-current" />
            ) : (
              <Play size={18} className="fill-current ml-0.5" />
            )}
          </button>
        </div>

        {/* Progress Bar & Secondary Controls */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium w-6">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max="100"
              value={isNaN(progress) ? 0 : progress}
              onChange={handleSeek}
              className="flex-1 h-1 bg-gray-200 dark:bg-gray-700/50 rounded-full appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-500 transition-all duration-300"
              style={{ backgroundSize: `${progress}% 100%` }}
            />
            <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium w-6 text-right">{formatTime(duration)}</span>
          </div>
          
          <div className="flex items-center justify-between pt-1">
            <button onClick={handlePrev} className="p-1.5 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" aria-label="Previous">
              <SkipBack size={18} className="fill-current" />
            </button>
            <button 
              onClick={() => setIsPlaylistOpen(!isPlaylistOpen)} 
              className={`p-1.5 transition-colors ${isPlaylistOpen ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400'}`}
              aria-label="Toggle Playlist"
            >
              <ListMusic size={18} />
            </button>
            <button onClick={handleNext} className="p-1.5 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" aria-label="Next">
              <SkipForward size={18} className="fill-current" />
            </button>
          </div>
        </div>
      </div>

      {/* Collapsible Playlist */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isPlaylistOpen ? 'max-h-64 border-t border-gray-200/20 dark:border-white/10 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-2 overflow-y-auto max-h-64 space-y-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full">
          {playlist.map((song, index) => {
            const isActive = currentSongIndex === index;
            return (
              <button
                key={song.id}
                onClick={() => playSong(index)}
                className={`w-full flex items-center gap-3 p-2 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? "bg-black/5 dark:bg-white/10 shadow-sm" 
                    : "hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={song.coverImage} 
                    alt={song.title} 
                    className={`w-full h-full object-cover transition-transform duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
                  />
                  {isActive && isPlaying && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px]">
                       <div className="flex gap-0.5 items-end h-3">
                         <span className="w-0.5 h-1.5 bg-white rounded-t-sm animate-pulse" style={{ animationDuration: '0.8s' }} />
                         <span className="w-0.5 h-3 bg-white rounded-t-sm animate-pulse" style={{ animationDuration: '1.2s' }} />
                         <span className="w-0.5 h-2 bg-white rounded-t-sm animate-pulse" style={{ animationDuration: '1.0s' }} />
                       </div>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 text-left min-w-0">
                  <h5 className={`text-xs font-semibold truncate transition-colors duration-200 ${
                    isActive 
                      ? "text-indigo-600 dark:text-indigo-400" 
                      : "text-gray-800 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                  }`}>
                    {song.title}
                  </h5>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">{song.artist}</p>
                </div>
                
                <div className="text-[10px] font-medium text-gray-400 dark:text-gray-500 pl-2">
                  {song.duration}
                </div>
              </button>
            );
          })}
        </div>
      </div>
      </>
      )}
      
      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef} 
        src={currentSong.audioUrl} 
        preload="auto"
        loop={playlist.length === 1}
      />
      
      {/* Required for the slow spinning vinyl effect */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}} />
    </div>
  );
}
