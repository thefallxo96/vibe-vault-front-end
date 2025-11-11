// ✅ src/pages/VibeRadio.js

import React, { useEffect, useState, useRef } from "react";
import { usePlayer } from "../context/PlayerContext";
import AddToPlaylistModal from "../components/modals/AddToPlaylistModal";
import { searchTracksByMood } from "../lib/spotify";
import { SkipForward, SkipBack, Plus } from "lucide-react";

const moods = [
  { key: "Chill", emoji: "😌" },
  { key: "Party", emoji: "🎉" },
  { key: "Perreo", emoji: "🍑" },
  { key: "Hype", emoji: "🔥" },
  { key: "Gym Time", emoji: "💪" },
  { key: "Focus", emoji: "🧠" },
  { key: "Romance", emoji: "💘" },
];

export default function VibeRadio() {
  const { playTrack, currentSong } = usePlayer();
  const [selectedMood, setSelectedMood] = useState("Chill");
  const [playlist, setPlaylist] = useState([]);  // fetched songs
  const [index, setIndex] = useState(0);
  const [modalTrack, setModalTrack] = useState(null);
  const audioRef = useRef();

// Fetch songs when mood changes
useEffect(() => {
  const load = async () => {
    const tracks = await searchTracksByMood(selectedMood);
    setPlaylist(tracks);
    setIndex(0);
    playTrack(tracks[0]);
  };
  load();
}, [selectedMood, playTrack]);   // ✅ added playTrack

// Auto play next track when song ends
useEffect(() => {
  if (!audioRef.current) return;

  audioRef.current.onended = () => {
    const next = index + 1;
    if (next < playlist.length) {
      setIndex(next);
      playTrack(playlist[next]);
    }
  };
}, [index, playlist, playTrack]);   // ✅ added playTrack


  const nextTrack = () => {
    if (index < playlist.length - 1) {
      setIndex(index + 1);
      playTrack(playlist[index + 1]);
    }
  };

  const previousTrack = () => {
    if (index > 0) {
      setIndex(index - 1);
      playTrack(playlist[index - 1]);
    }
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">{selectedMood} Radio</h1>

      {/* Mood selection */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
        {moods.map((m) => (
          <button
            key={m.key}
            className={`px-4 py-2 rounded-full ${
              selectedMood === m.key
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
            onClick={() => setSelectedMood(m.key)}
          >
            {m.emoji} {m.key}
          </button>
        ))}
      </div>

      {/* Currently playing */}
      {currentSong && (
        <div className="flex flex-col items-center gap-4">
          <img
            src={currentSong.albumArt}
            className="w-48 h-48 rounded-xl shadow-lg"
            alt=""
          />
          <p className="font-semibold text-lg">{currentSong.title}</p>
          <p className="text-sm opacity-70">{currentSong.artist}</p>
        </div>
      )}

      {/* Controls */}
      <div className="flex justify-center gap-6 mt-6">
        <button onClick={previousTrack}>
          <SkipBack size={36} />
        </button>

        <button onClick={() => setModalTrack(currentSong)} className="text-green-500">
          <Plus size={36} />
        </button>

        <button onClick={nextTrack}>
          <SkipForward size={36} />
        </button>
      </div>

      {modalTrack && (
        <AddToPlaylistModal track={modalTrack} onClose={() => setModalTrack(null)} />
      )}
    </div>
  );
}
