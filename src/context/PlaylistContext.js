// ✅ src/context/PlaylistContext.js

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "./AuthContext";

const PlaylistContext = createContext();
export const usePlaylists = () => useContext(PlaylistContext);

export const PlaylistProvider = ({ children }) => {
  const { user } = useAuth();

  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🚀 Fetch playlists when user logs in
  useEffect(() => {
    if (user) fetchPlaylists();
  }, [user]);

  const fetchPlaylists = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("playlists")
      .select("*")
      .eq("user_id", user.id);

    if (!error) setPlaylists(data || []);
    setLoading(false);
  };

  // ✅ Create playlist
  const addPlaylist = async (name) => {
    const { data, error } = await supabase
      .from("playlists")
      .insert([{ name, user_id: user.id }])
      .select();

    if (!error) {
      setPlaylists((prev) => [...prev, data[0]]);
      return data[0];
    }
  };

  // ✅ Add track to playlist
  const addTrackToPlaylist = async (playlistId, track) => {
    const { error } = await supabase.from("playlist_tracks").insert([
      {
        playlist_id: playlistId,
        title: track.title,
        artist: track.artist,
        album_art: track.albumArt,
        url: track.url,
      },
    ]);

    if (error) {
      console.log("❌ Error adding track:", error);
    } else {
      console.log("✅ Track added");
    }
  };

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        loading,
        addPlaylist,
        addTrackToPlaylist,
        fetchPlaylists,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};
