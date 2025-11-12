import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

const PlaylistContext = createContext();
export const usePlaylists = () => useContext(PlaylistContext);

export function PlaylistProvider({ children }) {
  const { user } = useAuth();
  const [playlists, setPlaylists] = useState([]);

  const backend = process.env.REACT_APP_BACKEND_URL;

  // ✅ Fetch playlists for logged-in user
  async function loadPlaylists() {
    if (!user) return;
    const res = await fetch(`${backend}/api/playlists/${user.id}`);
    const data = await res.json();
    setPlaylists(data);
  }

  // ✅ Create playlist
  async function createPlaylist(name) {
    const res = await fetch(`${backend}/api/playlists`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id, name }),
    });

    const data = await res.json();
    setPlaylists((prev) => [...prev, data]);
  }

  // ✅ Add track to playlist
  async function addTrackToPlaylist(playlistId, track) {
    await fetch(`${backend}/api/playlist-tracks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        playlist_id: playlistId,
        track_id: track.id,
        title: track.title,
        artist: track.artist,
        album_art: track.albumArt,
        preview_url: track.url,
      }),
    });
  }

  return (
    <PlaylistContext.Provider
      value={{ playlists, loadPlaylists, createPlaylist, addTrackToPlaylist }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}
