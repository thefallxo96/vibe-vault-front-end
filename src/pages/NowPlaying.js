// src/pages/NowPlaying.js
import React from "react";
import { usePlayer } from "../context/PlayerContext";

export default function NowPlaying() {
  const { currentSong, isPlaying, togglePlay } = usePlayer();

  if (!currentSong) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      {/* Album Art */}
      <img
        src={currentSong.albumArt}
        alt={currentSong.title}
        className="w-64 h-64 rounded-xl shadow-xl object-cover mb-6"
      />

      {/* Song Info */}
      <h1 className="text-3xl font-bold">{currentSong.title}</h1>
      <p className="text-lg opacity-70">{currentSong.artist}</p>

      {/* Play / Pause */}
      <button
        onClick={togglePlay}
        className="mt-6 px-6 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition text-lg"
      >
        {isPlaying ? "⏸ Pause" : "▶️ Play"}
      </button>
    </div>
  );
}
