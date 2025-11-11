// ✅ src/components/modals/AddToPlaylistModal.js

import React, { useState } from "react";
import { usePlaylists } from "../../context/PlaylistContext";

export default function AddToPlaylistModal({ track, onClose }) {
  const { playlists, addTrackToPlaylist, addPlaylist } = usePlaylists();
  const [newPlaylistName, setNewPlaylistName] = useState("");

  const handleAddTrack = async (playlistId) => {
    await addTrackToPlaylist(playlistId, track);
    onClose();
  };

  const handleCreatePlaylist = async () => {
    if (!newPlaylistName.trim()) return;
    const playlist = await addPlaylist(newPlaylistName);
    setNewPlaylistName("");

    // auto add track to new playlist
    await addTrackToPlaylist(playlist.id, track);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-96 shadow-xl">

        <h2 className="text-xl font-bold mb-4">Add to Playlist</h2>

        {/* Existing playlists */}
        <div className="max-h-40 overflow-y-auto">
          {playlists.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">
              No playlists yet — create one below.
            </p>
          ) : (
            playlists.map((p) => (
              <button
                key={p.id}
                onClick={() => handleAddTrack(p.id)}
                className="w-full text-left px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 mb-2 hover:bg-gray-300 dark:hover:bg-gray-700"
              >
                {p.name}
              </button>
            ))
          )}
        </div>

        {/* Create playlist */}
        <input
          className="w-full p-2 bg-gray-100 dark:bg-gray-800 rounded mt-4"
          placeholder="New playlist name..."
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
        />

        <button
          onClick={handleCreatePlaylist}
          className="mt-3 w-full p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          + Create & Add Song
        </button>

        <button onClick={onClose} className="mt-4 text-gray-500 underline w-full">
          Cancel
        </button>
      </div>
    </div>
  );
}
