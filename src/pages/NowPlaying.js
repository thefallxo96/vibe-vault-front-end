// src/pages/NowPlaying.js
import React from 'react';
import { usePlayer } from '../components/PlayerContext';

export default function NowPlaying() {
  const { currentSong, isPlaying, togglePlay } = usePlayer();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Now Playing</h1>

      {/* Album Art Placeholder */}
      <div className="w-64 h-64 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
        <span className="text-gray-500 dark:text-gray-400">Album Art</span>
      </div>

      {/* Song Title */}
      <p className="text-xl font-semibold mb-6 truncate max-w-xs">{currentSong.split('/').pop()}</p>

      {/* Play/Pause Button */}
      <button
        className="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
        onClick={togglePlay}
      >
        {isPlaying ? '⏸ Pause' : '▶️ Play'}
      </button>
    </div>
  );
}
