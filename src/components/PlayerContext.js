// src/components/PlayerContext.js
import React, { createContext, useContext, useRef, useState, useEffect } from 'react';

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const audioRef = useRef(null);

  // Default song & volume from .env
  const defaultSong = process.env.REACT_APP_DEFAULT_SONG || '/which-one-dirty-remix.mp3';
  const defaultVolume = parseFloat(process.env.REACT_APP_DEFAULT_VOLUME) || 1;

  const [currentSong, setCurrentSong] = useState(defaultSong);
  const [isPlaying, setIsPlaying] = useState(false);

  // Ensure audio element volume is correct on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = defaultVolume;
    }
  }, [audioRef, defaultVolume]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => console.warn('Audio play interrupted:', err));
      }
      setIsPlaying(true);
    }
  };

  const playSong = (songUrl) => {
    if (audioRef.current) {
      audioRef.current.src = songUrl;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => console.warn('Audio play interrupted:', err));
      }
      setCurrentSong(songUrl);
      setIsPlaying(true);
    }
  };

  return (
    <PlayerContext.Provider value={{ audioRef, isPlaying, togglePlay, currentSong, playSong }}>
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
