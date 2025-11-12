import React, { createContext, useContext, useRef, useState, useEffect } from "react";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const audioRef = useRef(null);

  const [currentSong, setCurrentSong] = useState({
    id: 1,
    title: "Which One (DJ Yonny Remix)",
    artist: "Drake & Central Cee",
    albumArt: "/album-art.jpg", // ✅ make sure this file exists in /public
    url: "/which-one-dirty-remix.mp3", // ✅ make sure this MP3 exists in /public
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);

  // ✅ update audio whenever song or volume changes
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    audioRef.current.src = currentSong.url;
    audioRef.current.volume = volume;

    // if we were playing before, continue playback
    if (isPlaying) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn("Playback blocked:", err));
    }
  }, [currentSong, volume]);

  // ✅ Keep isPlaying synced with audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn("Play blocked:", err));
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const playTrack = (track) => {
    if (!track?.previewUrl && !track?.url) {
      console.warn("⚠️ No audio found for:", track);
      return;
    }

    setCurrentSong({
      id: track.id,
      title: track.title,
      artist: track.artist,
      albumArt: track.albumArt,
      url: track.previewUrl ?? track.url, // ✅ use preview first
    });

    setIsPlaying(true);
  };

  const pauseTrack = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  return (
    <PlayerContext.Provider
      value={{
        audioRef,
        currentSong,
        isPlaying,
        togglePlay,
        playTrack,
        pauseTrack, // ✅ added
        volume,
        setVolume,
      }}
    >
      {children}
      <audio ref={audioRef} preload="auto" />
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
