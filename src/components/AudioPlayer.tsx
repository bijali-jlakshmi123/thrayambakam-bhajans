"use client";

import { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Music,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudioStore } from "@/lib/store";

export default function AudioPlayer() {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    volume,
    setVolume,
    progress,
    setProgress,
    duration,
    setDuration,
    setPlaying,
    nextTrack,
    previousTrack,
  } = useAudioStore();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current
        .play()
        .catch((err) => console.log("Playback error:", err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!currentTrack || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 120, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed bottom-0 left-0 right-0 z-[60] p-6 md:p-10 pointer-events-none"
      >
        {/* Cinematic Backdrop Glow */}
        <div className="absolute inset-0 bg-accent/5 blur-[100px] rounded-full translate-y-20 scale-150 animate-pulse pointer-events-none" />

        <div className="max-w-5xl mx-auto w-full glass-card border border-white/20 rounded-[3rem] p-6 pointer-events-auto shadow-[0_50px_100px_-30px_rgba(0,0,0,0.5)] overflow-hidden relative group/player">
          <audio
            ref={audioRef}
            src={currentTrack.audioUrl}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => nextTrack()}
            autoPlay={isPlaying}
          />

          {/* Premium Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/5 group/progress cursor-pointer">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={progress}
              onChange={handleSeek}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <motion.div
              className={`h-full bg-linear-to-r from-accent via-white to-accent relative transition-all duration-100 ${isPlaying ? "opacity-100" : "opacity-50"}`}
              style={{ width: `${(progress / (duration || 1)) * 100}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,215,0,1)] scale-0 group-hover/progress:scale-100 transition-transform" />
            </motion.div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-2">
            {/* Expanded Info Section */}
            <div className="flex items-center gap-6 min-w-0 flex-1 w-full md:w-auto">
              <motion.div
                animate={isPlaying ? { rotate: 360 } : {}}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="w-16 h-16 md:w-20 md:h-20 bg-linear-to-br from-accent to-[#D4AF37] rounded-3xl flex items-center justify-center shrink-0 shadow-2xl relative overflow-hidden ring-1 ring-white/30"
              >
                {isPlaying && (
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="absolute inset-0 bg-white"
                  />
                )}
                <Music className="w-8 h-8 md:w-10 md:h-10 text-primary relative z-10" />
              </motion.div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-black text-white truncate text-lg md:text-2xl tracking-tighter">
                    {currentTrack.title}
                  </h4>
                  {isPlaying && (
                    <div className="flex gap-1 items-end h-4 pb-1">
                      {[0.6, 0.8, 0.5, 0.7].map((delay, i) => (
                        <motion.div
                          key={i}
                          animate={{ height: ["4px", "12px", "4px"] }}
                          transition={{
                            repeat: Infinity,
                            duration: delay,
                            ease: "easeInOut",
                          }}
                          className="w-1 bg-accent rounded-full"
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3 text-white/50">
                  <p className="text-xs md:text-sm font-black uppercase tracking-widest truncate">
                    {currentTrack.singer}
                  </p>
                  <span className="w-1 h-1 bg-white/20 rounded-full" />
                  <span className="text-[10px] font-mono text-white/30">
                    {formatTime(progress)} / {formatTime(duration)}
                  </span>
                </div>
              </div>
            </div>

            {/* Polished Controls */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-6 md:gap-10">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={previousTrack}
                  className="p-3 text-white/30 hover:text-accent transition-colors bg-white/5 rounded-2xl border border-white/10 hover:border-accent/40"
                >
                  <SkipBack className="w-6 h-6 fill-current" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={togglePlay}
                  className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-4xl flex items-center justify-center text-primary hover:bg-accent transition-all shadow-[0_20px_40px_rgba(0,0,0,0.3)] group/play"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 md:w-10 md:h-10 fill-current" />
                  ) : (
                    <Play className="w-8 h-8 md:w-10 md:h-10 fill-current ml-1" />
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextTrack}
                  className="p-3 text-white/30 hover:text-accent transition-colors bg-white/5 rounded-2xl border border-white/10 hover:border-accent/40"
                >
                  <SkipForward className="w-6 h-6 fill-current" />
                </motion.button>
              </div>
            </div>

            {/* Volume & Utility */}
            <div className="hidden md:flex items-center gap-6 justify-end flex-1">
              <div className="flex items-center gap-4 bg-white/5 px-6 py-4 rounded-3xl border border-white/10">
                <Volume2 className="w-5 h-5 text-white/40" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-24 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-accent"
                />
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="p-4 bg-white/5 text-white/20 hover:text-white hover:bg-red-500/20 rounded-2xl transition-all border border-white/10"
                title="Close Player"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
