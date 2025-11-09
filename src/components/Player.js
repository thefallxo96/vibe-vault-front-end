// src/components/Player.js
import React, { useEffect } from 'react';
import { usePlayer } from './PlayerContext';

export default function Player() {
  const { currentSong, isPlaying, togglePlay, volume, changeVolume } = usePlayer();

  // Optional: log when the song changes (for debugging)
  useEffect(() => {
    if (currentSong) console.log('Now playing:', currentSong.title);
  }, [currentSong]);

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-200 dark:bg-gray-800 p-3 flex items-center justify-between shadow-inner z-50">
      {/* Song Info */}
      <span className="truncate max-w-xs text-sm font-medium">
        🎵 {currentSong.title}
      </span>

      {/* Play / Pause Button */}
      <button
        className="px-3 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors text-lg"
        onClick={togglePlay}
      >
        {isPlaying ? '⏸' : '▶️'}
      </button>

      {/* Volume Control */}
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => changeVolume(Number(e.target.value))}
        className="w-28 accent-indigo-500 cursor-pointer"
        title={`Volume: ${Math.round(volume * 100)}%`}
      />
    </div>
  );
}
