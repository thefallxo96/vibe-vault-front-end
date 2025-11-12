// ✅ src/components/modals/AddToPlaylistModal.js

import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { usePlaylists } from "../../context/PlaylistContext";

export default function AddToPlaylistModal({ track, onClose }) {
  const { user } = useAuth();
  const { playlists, loadPlaylists, createPlaylist } = usePlaylists();
  const [newPlaylistName, setNewPlaylistName] = useState("");

  useEffect(() => {
    loadPlaylists();
  }, []);

  // ✅ Add a track to a playlist (via backend API)
  async function addTrackToPlaylist(playlist_id) {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/playlist-tracks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        playlist_id,
        track_id: track.id,
        title: track.title,
        artist: track.artist,
        album_art: track.albumArt,
        preview_url: track.previewUrl,
      }),
    });

    onClose();
  }

  // ✅ Make new playlist (via backend API)
  async function handleCreatePlaylist() {
    if (!newPlaylistName.trim()) return;

    await createPlaylist(newPlaylistName);
    setNewPlaylistName("");
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-80">
        <h2 className="text-xl font-bold mb-4">Add Track to Playlist</h2>

        {/* Existing playlists */}
        {playlists.length > 0 ? (
          playlists.map((pl) => (
            <button
              key={pl.id}
              className="w-full p-2 mb-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-indigo-600 hover:text-white"
              onClick={() => addTrackToPlaylist(pl.id)}
            >
              {pl.name}
            </button>
          ))
        ) : (
          <p className="text-sm opacity-70 mb-2">No playlists yet.</p>
        )}

        {/* Create new playlist */}
        <input
          className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-700 mt-4"
          placeholder="New playlist name"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
        />

        <button
          className="w-full mt-2 p-2 bg-green-600 text-white rounded-lg"
          onClick={handleCreatePlaylist}
        >
          + Create Playlist
        </button>

        <button className="w-full mt-3 p-2 text-red-500" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
