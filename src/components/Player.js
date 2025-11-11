import React from 'react';
import { usePlayer } from "../context/PlayerContext";

export default function Player() {
  const { currentSong, isPlaying, togglePlay, volume, changeVolume } = usePlayer();

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-200 dark:bg-gray-800 p-3 flex items-center justify-between shadow-lg z-50">
      <div className="flex items-center space-x-3">
        <img
          src={currentSong.albumArt}
          alt={currentSong.title}
          className="w-10 h-10 rounded-md object-cover"
        />
        <div className="text-sm">
          <p className="font-semibold">{currentSong.title}</p>
          <p className="text-xs text-gray-500">{currentSong.artist}</p>
        </div>
      </div>

      <button
        className="px-3 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors text-lg"
        onClick={togglePlay}
      >
        {isPlaying ? '⏸' : '▶️'}
      </button>

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => changeVolume(Number(e.target.value))}
        className="w-28 accent-indigo-500"
      />
    </div>
  );
}
