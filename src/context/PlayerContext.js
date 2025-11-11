// src/components/PlayerContext.js
import React, { createContext, useContext, useRef, useState, useEffect } from "react";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const audioRef = useRef(null);

const [currentSong, setCurrentSong] = useState({
  id: 1,
  title: "Which One (DJ Yonny Remix)",
  artist: "Drake & Central Cee",
  albumArt: "/album-art.jpg",             // keep your cover art filename
  url: "/which-one-dirty-remix.mp3",      // keep your audio filename
});


  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = currentSong.url;
    audio.volume = volume;

    if (isPlaying) {
      audio.play().catch((err) => {
        console.warn("Playback blocked until user interaction:", err);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [currentSong, isPlaying, volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn("Play blocked:", err));
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const changeVolume = (v) => setVolume(v);

  const playTrack = (track) => {
    if (!track?.url) return;
    setCurrentSong(track);
    setIsPlaying(true);
  };

  return (
    <PlayerContext.Provider
      value={{ audioRef, currentSong, isPlaying, togglePlay, changeVolume, playTrack, volume }}
    >
      {children}
      <audio ref={audioRef} preload="auto" />
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
