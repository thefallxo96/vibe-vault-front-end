// ✅ src/pages/Discover.js

import React, { useState, useEffect } from "react";
import { usePlayer } from "../context/PlayerContext";
import AddToPlaylistModal from "../components/modals/AddToPlaylistModal";
import { Plus } from "lucide-react";
import { searchTracksByMood } from "../lib/spotify";   // 👈 NEW IMPORT

const moods = [
  { key: "Chill", emoji: "😌" },
  { key: "Party", emoji: "🎉" },
  { key: "Perreo", emoji: "🍑" },
  { key: "Hype", emoji: "🔥" },
  { key: "Gym Time", emoji: "💪" },
  { key: "Focus", emoji: "🧠" },
  { key: "Romance", emoji: "💘" },
];

export default function Discover() {
  const { playTrack } = usePlayer();
  const [selectedMood, setSelectedMood] = useState("Chill");
  const [tracks, setTracks] = useState([]);
  const [modalTrack, setModalTrack] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ fetch real music from Spotify API
  useEffect(() => {
    const fetchMusic = async () => {
      setLoading(true);
      const results = await searchTracksByMood(selectedMood);
      setTracks(results);
      setLoading(false);
    };
    fetchMusic();
  }, [selectedMood]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Discover New Vibes</h1>

      {/* Mood buttons */}
      <div className="flex gap-2 overflow-x-auto pb-4">
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

      {loading ? (
        <p className="text-center mt-10">Loading...</p>
      ) : (
        <div className="mt-6 grid gap-4">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="flex items-center gap-4 p-4 rounded-xl bg-gray-100 dark:bg-gray-800"
            >
              <img src={track.albumArt} className="w-16 h-16 rounded-lg" alt="" />
              <div className="flex-1">
                <p className="font-semibold">{track.title}</p>
                <p className="text-sm opacity-70">{track.artist}</p>
              </div>

              {/* ▶ Play preview */}
              <button
                className="px-3 py-1 bg-indigo-600 text-white rounded-lg"
                onClick={() =>
                  playTrack({
                    id: track.id,
                    title: track.title,
                    artist: track.artist,
                    albumArt: track.albumArt,
                    url: track.previewUrl,
                  })
                }
              >
                ▶
              </button>

              {/* ➕ Add to playlist */}
              <button
                className="p-2 text-green-500"
                onClick={() => setModalTrack(track)}
              >
                <Plus size={22} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalTrack && (
        <AddToPlaylistModal
          track={modalTrack}
          onClose={() => setModalTrack(null)}
        />
      )}
    </div>
  );
}
