// ✅ src/pages/VibeRadio.js
import React, { useEffect, useState } from "react";
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
  const [playlist, setPlaylist] = useState([]);
  const [index, setIndex] = useState(0);
  const [modalTrack, setModalTrack] = useState(null);

  // ✅ fetch Spotify previews when mood changes
  useEffect(() => {
    async function load() {
      const results = await searchTracksByMood(selectedMood);
      console.log("✅ Loaded playlist:", results);

      if (results.length > 0) {
        setPlaylist(results);
        setIndex(0);
        playTrack({
          ...results[0],
          url: results[0].previewUrl, // IMPORTANT
        });
      }
    }

    load();
  }, [selectedMood, playTrack]);

  const nextTrack = () => {
    if (playlist.length === 0) return;
    const newIndex = (index + 1) % playlist.length;
    setIndex(newIndex);

    playTrack({
      ...playlist[newIndex],
      url: playlist[newIndex].previewUrl,
    });
  };

  const prevTrack = () => {
    if (playlist.length === 0) return;
    const newIndex = (index - 1 + playlist.length) % playlist.length;
    setIndex(newIndex);

    playTrack({
      ...playlist[newIndex],
      url: playlist[newIndex].previewUrl,
    });
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">{selectedMood} Radio</h1>

      {/* Mood buttons */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
        {moods.map((m) => (
          <button
            key={m.key}
            onClick={() => setSelectedMood(m.key)}
            className={`px-4 py-2 rounded-full ${
              selectedMood === m.key
                ? "bg-indigo-600 text-white"
                : "bg-gray-300 dark:bg-gray-700"
            }`}
          >
            {m.emoji} {m.key}
          </button>
        ))}
      </div>

      {/* Display current track */}
      {currentSong && (
        <div className="flex flex-col items-center gap-4">
          <img src={currentSong.albumArt} className="w-48 h-48 rounded-xl shadow-lg" alt="" />
          <p className="font-semibold">{currentSong.title}</p>
          <p className="text-sm opacity-70">{currentSong.artist}</p>
        </div>
      )}

      {/* Controls */}
      <div className="flex justify-center gap-6 mt-6">
        <button onClick={prevTrack}><SkipBack size={36} /></button>
        <button onClick={() => setModalTrack(currentSong)} className="text-green-500">
          <Plus size={36} />
        </button>
        <button onClick={nextTrack}><SkipForward size={36} /></button>
      </div>

      {modalTrack && (
        <AddToPlaylistModal
          track={modalTrack}
          onClose={() => setModalTrack(null)}
        />
      )}
    </div>
  );
}
