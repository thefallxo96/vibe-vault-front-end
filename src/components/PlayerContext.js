// src/components/PlayerContext.js
import React, { createContext, useContext, useRef, useState, useEffect } from 'react';

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const audioRef = useRef(null);

  // Default song
  const [currentSong, setCurrentSong] = useState({
    id: 1,
    title: 'Which One',
    artist: 'Your Artist Name',
    albumArt: '/which-one.jpg', // public folder
    url: '/which-one.mp3',      // public folder
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  // Keep audio element in sync
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Assign URL unconditionally (avoids mismatch bugs)
    audio.src = currentSong.url;
    audio.volume = volume;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log('Play blocked:', err);
          setIsPlaying(false); // prevent infinite loop
        });
      }
    } else {
      audio.pause();
    }
  }, [currentSong, isPlaying, volume]);

  // Toggle play/pause
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log('Play blocked:', err));
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  // Change volume
  const changeVolume = (val) => {
    setVolume(val);
    if (audioRef.current) audioRef.current.volume = val;
  };

  // Play a specific track
  const playTrack = (track) => {
    if (!track || !track.url) return;

    const sameTrack = currentSong.id === track.id;
    setCurrentSong(track);

    if (!sameTrack) {
      setIsPlaying(true);
    } else {
      togglePlay();
    }
  };

  // Auto-replay when song ends
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      audio.currentTime = 0;
      audio.play().catch(err => console.log('Replay failed:', err));
    };

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [currentSong]);

  return (
    <PlayerContext.Provider
      value={{
        audioRef,
        currentSong,
        setCurrentSong,
        isPlaying,
        togglePlay,
        volume,
        changeVolume,
        playTrack,
      }}
    >
      {children}
      {/* Persistent audio element */}
      <audio ref={audioRef} preload="auto" />
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
