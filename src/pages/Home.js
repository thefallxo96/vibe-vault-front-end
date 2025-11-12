// ✅ src/pages/Home.js
import React from "react";
import { usePlayer } from "../context/PlayerContext";

export default function Home() {
  const { currentSong, togglePlay, isPlaying } = usePlayer();

  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to VibeVault 🎧</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Choose a vibe and start discovering tracks that match your mood.
      </p>

      {/* ✅ Safely show default album art */}
      <div className="flex flex-col items-center gap-4">
        <img
          src={currentSong?.albumArt ?? "/album-art.jpg"}  // default fallback
          alt="Album Art"
          className="w-56 h-56 rounded-2xl shadow-lg object-cover"
        />
        <h2 className="text-2xl font-semibold">{currentSong?.title ?? "No song selected"}</h2>
        <p className="text-gray-600 dark:text-gray-400">
          {currentSong?.artist ?? ""}
        </p>

        {/* ✅ play/pause button */}
        <button
          onClick={togglePlay}
          className="mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-md hover:bg-indigo-700 transition"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
}
