// ✅ src/pages/Discover.js
import React, { useState, useEffect } from "react";
import { usePlayer } from "../context/PlayerContext";
import AddToPlaylistModal from "../components/modals/AddToPlaylistModal";
import { searchTracksByMood } from "../lib/spotify";
import { Plus } from "lucide-react";

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

  useEffect(() => {
    async function loadTracks() {
      setLoading(true);

      const results = await searchTracksByMood(selectedMood);

      // ✅ Only keep tracks that have preview audio
      const withPreview = results.filter((t) => t.previewUrl);

      setTracks(withPreview);
      setLoading(false);
    }

    loadTracks();
  }, [selectedMood]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Discover New Vibes</h1>

      {/* Mood selector */}
      <div className="flex gap-2 overflow-x-auto pb-4">
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

      {/* Loading + No results */}
      {loading ? (
        <p className="text-center mt-10">Loading music…</p>
      ) : tracks.length === 0 ? (
        <p className="text-center mt-10 text-gray-400">No previews found 😢</p>
      ) : (
        <div className="mt-6 grid gap-4">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="flex items-center gap-4 p-4 rounded-xl bg-gray-200 dark:bg-gray-800"
            >
              <img
                src={track.albumArt}
                alt="album"
                className="w-16 h-16 rounded-lg"
              />

              <div className="flex-1 text-left">
                <p className="font-semibold">{track.title}</p>
                <p className="text-sm opacity-70">{track.artist}</p>
              </div>

              {/* ✅ Play button */}
              <button
                className="px-3 py-1 bg-indigo-600 text-white rounded-lg"
                onClick={() =>
                  playTrack({
                    id: track.id,
                    title: track.title,
                    artist: track.artist,
                    albumArt: track.albumArt,
                    url: track.previewUrl, // ✅ correct URL key for PlayerContext
                  })
                }
              >
                ▶
              </button>

              {/* ✅ Add to playlist */}
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

      {/* Modal for playlist selection */}
      {modalTrack && (
        <AddToPlaylistModal
          track={modalTrack}
          onClose={() => setModalTrack(null)}
        />
      )}
    </div>
  );
}
