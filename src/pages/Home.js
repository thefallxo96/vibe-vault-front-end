import React from 'react';
import { usePlayer } from '../context/PlayerContext';

export default function Home() {
  const { currentSong, togglePlay, isPlaying } = usePlayer();

  return (
    <div
      className="min-h-[calc(100vh-140px)] flex flex-col items-center justify-center text-center
                 bg-cover bg-center"
      style={{ backgroundImage: `url('${currentSong.albumArt}')` }}   // ✅ No more missing file
    >
      <div className="backdrop-blur-md bg-white/20 dark:bg-black/30 px-6 py-8 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-extrabold mb-4 drop-shadow">
          Welcome to VibeVault
        </h1>

        <p className="mb-6 text-lg opacity-90">
          Tap play to start your vibe — it keeps playing everywhere.
        </p>

        <div className="flex items-center gap-4 bg-white/70 dark:bg-gray-800/70 rounded-2xl px-5 py-4 shadow-md">
          <img
            src={currentSong.albumArt}
            alt={currentSong.title}
            className="w-16 h-16 rounded-lg object-cover"
          />

          <div className="text-left">
            <div className="font-semibold">{currentSong.title}</div>
            <div className="text-sm opacity-70">{currentSong.artist}</div>
          </div>

          <button
            onClick={togglePlay}
            className="ml-4 px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            {isPlaying ? '⏸ Pause' : '▶️ Play'}
          </button>
        </div>
      </div>
    </div>
  );
}
