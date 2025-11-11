import React, { useEffect, useState } from "react";
import BottomSheet from "../components/BottomSheet";

/**
 * Frontend playlists loader/saver (localStorage "vv_playlists").
 * Replace with Supabase rows later.
 */
const loadPlaylists = () => {
  const raw = localStorage.getItem("vv_playlists");
  return raw ? JSON.parse(raw) : [];
};
const savePlaylists = (pls) =>
  localStorage.setItem("vv_playlists", JSON.stringify(pls));

export default function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [openSheet, setOpenSheet] = useState(false);
  const [active, setActive] = useState(null);

  useEffect(() => {
    setPlaylists(loadPlaylists());
  }, []);

  const openDetails = (pl) => {
    setActive(pl);
    setOpenSheet(true);
  };

  const removeTrack = (playlistId, trackId) => {
    const next = playlists.map((pl) =>
      pl.id === playlistId
        ? { ...pl, tracks: pl.tracks.filter((t) => t.id !== trackId) }
        : pl
    );
    setPlaylists(next);
    savePlaylists(next);
    // also update active if it’s open
    if (active?.id === playlistId) {
      setActive(next.find((p) => p.id === playlistId) || null);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Playlists</h1>

      {playlists.length === 0 ? (
        <div className="text-gray-500">
          No playlists yet. Go to <b>Discover</b> or <b>Vibe Radio</b> and hit
          “+ Add to playlist”.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {playlists.map((pl) => (
            <button
              key={pl.id}
              onClick={() => openDetails(pl)}
              className="text-left p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-3">
                <div className="text-3xl">{pl.emoji}</div>
                <div>
                  <div className="font-semibold">{pl.name}</div>
                  <div className="text-xs opacity-60">
                    {pl.tracks.length} {pl.tracks.length === 1 ? "song" : "songs"}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      <BottomSheet
        open={openSheet}
        onClose={() => setOpenSheet(false)}
        title={active ? `${active.emoji} ${active.name}` : "Playlist"}
      >
        {!active || active.tracks.length === 0 ? (
          <div className="text-gray-500">No tracks yet.</div>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-800">
            {active.tracks.map((t) => (
              <li key={t.id} className="flex items-center gap-3 py-3">
                <img
                  src={t.albumArt}
                  alt={t.title}
                  className="w-12 h-12 rounded-md object-cover"
                />
                <div className="min-w-0">
                  <div className="font-medium truncate">{t.title}</div>
                  <div className="text-xs opacity-70 truncate">{t.artist}</div>
                </div>
                <button
                  onClick={() => removeTrack(active.id, t.id)}
                  className="ml-auto px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </BottomSheet>
    </div>
  );
}
