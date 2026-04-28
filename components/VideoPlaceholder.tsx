"use client";

import { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export default function VideoPlaceholder() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.4);

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const [showControls, setShowControls] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  let hideTimer: NodeJS.Timeout;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.4;
    }
  }, []);

  function startHideTimer() {
    if (!hasInteracted) return;

    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      setShowControls(false);
    }, 4000);
  }

  function handleInteraction() {
    setHasInteracted(true);
    setShowControls(true);
    startHideTimer();
  }

  function togglePlay() {
    if (!videoRef.current) return;

    handleInteraction();

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }

  function toggleMute() {
    if (!videoRef.current) return;

    handleInteraction();

    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  }

  function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!videoRef.current) return;

    const newVolume = Number(e.target.value);
    videoRef.current.volume = newVolume;
    setVolume(newVolume);

    if (newVolume > 0) {
      videoRef.current.muted = false;
      setIsMuted(false);
    }
  }

  function handleTimeUpdate() {
    if (!videoRef.current) return;

    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration;

    setCurrentTime(current);
    setProgress((current / total) * 100);
  }

  function handleLoadedMetadata() {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  }

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    if (!videoRef.current) return;

    const value = Number(e.target.value);
    const newTime = (value / 100) * duration;

    videoRef.current.currentTime = newTime;
    setProgress(value);
  }

  function formatTime(time: number) {
    if (!time) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  return (
    <div
      onMouseEnter={() => setShowControls(true)}
      onMouseMove={handleInteraction}
      onMouseLeave={startHideTimer}
      className="relative w-full h-full min-h-[360px] rounded-xl border border-borderSubtle overflow-hidden bg-black"
    >
      {/* VIDEO */}
      <video
        ref={videoRef}
        src="/videos/intro.mp4"
        poster="/images/placeholder.png"
        className="absolute inset-0 h-full w-full object-cover"
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      {/* OVERLAY */}
      {!isPlaying && (
        <div className="absolute inset-0 bg-black/10 transition-opacity duration-300" />
      )}

      {/* CENTER PLAY BUTTON */}
      <button
        onClick={togglePlay}
        className={`
          absolute inset-0 m-auto
          flex items-center justify-center
          rounded-full
          bg-white/80 backdrop-blur-md
          h-14 w-14
          transition-all duration-300
          ${showControls ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
        {isPlaying ? (
          <Pause className="h-5 w-5 text-black" />
        ) : (
          <Play className="h-5 w-5 text-black ml-1" />
        )}
      </button>

      {/* CONTROLS BAR */}
      <div
        className={`
          absolute bottom-3 left-3 right-3
          rounded-lg
          bg-black/40 backdrop-blur-md
          px-3 py-2
          flex items-center gap-3
          transition-opacity duration-300
          ${showControls ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
        {/* PLAY */}
        <button onClick={togglePlay}>
          {isPlaying ? (
            <Pause className="h-4 w-4 text-white" />
          ) : (
            <Play className="h-4 w-4 text-white" />
          )}
        </button>

        {/* TIME */}
        <span className="text-[11px] text-white font-mono w-[80px]">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>

        {/* PROGRESS */}
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          className="
            flex-1
            h-[2px]
            appearance-none
            bg-white/30
            rounded-full
            cursor-pointer
          "
        />

        {/* VOLUME */}
        <button onClick={toggleMute}>
          {isMuted || volume === 0 ? (
            <VolumeX className="h-4 w-4 text-white" />
          ) : (
            <Volume2 className="h-4 w-4 text-white" />
          )}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="
            w-20
            h-[2px]
            appearance-none
            bg-white/30
            rounded-full
            cursor-pointer
          "
        />
      </div>
    </div>
  );
}
