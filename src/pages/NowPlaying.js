// src/pages/NowPlaying.js
import React from 'react';
import { usePlayer } from '../components/PlayerContext';

export default function NowPlaying() {
  const { currentSong, isPlaying, togglePlay } = usePlayer();

  if (!currentSong) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
        <h1 className="text-2xl font-semibold mb-3">🎧 Nothing’s Playing</h1>
        <p className="text-gray-500">Go to Discover or Vibe Radio to start your music.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-100 to-white dark:from-gray-900 dark:to-black text-center px-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Now Playing 🎶
      </h1>

      {/* Album Artwork */}
      <div className="w-64 h-64 rounded-3xl overflow-hidden shadow-xl mb-6">
        <img
          src={
            currentSong.cover ||
            'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f'
          }
          alt={currentSong.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Song Info */}
      <div className="text-gray-800 dark:text-gray-100">
        <h2 className="text-2xl font-semibold">{currentSong.title}</h2>
        {currentSong.artist && (
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {currentSong.artist}
          </p>
        )}
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className={`mt-8 px-6 py-3 rounded-full text-white font-medium shadow-md transition-colors ${
          isPlaying
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-indigo-500 hover:bg-indigo-600'
        }`}
      >
        {isPlaying ? '⏸ Pause' : '▶️ Play'}
      </button>
    </div>
  );
}
