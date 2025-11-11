import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "./AuthContext";

const PlaylistContext = createContext();
export const usePlaylists = () => useContext(PlaylistContext);

export function PlaylistProvider({ children }) {
  const { user } = useAuth();
  const [playlists, setPlaylists] = useState([]);

  async function loadPlaylists() {
    if (!user) return;

    const { data, error } = await supabase
      .from("playlists")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });

    if (!error) setPlaylists(data);
  }

  async function createPlaylist(name) {
    if (!user) return;

    const { data, error } = await supabase
      .from("playlists")
      .insert({ name, user_id: user.id })
      .select()
      .single();

    if (!error) setPlaylists([...playlists, data]);
  }

  return (
    <PlaylistContext.Provider value={{ playlists, loadPlaylists, createPlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
}
