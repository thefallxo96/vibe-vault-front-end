// src/components/Player.js
import React, { useEffect } from 'react';
import { usePlayer } from './PlayerContext';

export default function Player() {
  const { audioRef, isPlaying, togglePlay, currentSong } = usePlayer();

  // Set default volume from .env (0–1)
  useEffect(() => {
    if (audioRef.current) {
      const defaultVolume = parseFloat(process.env.REACT_APP_DEFAULT_VOLUME || 1);
      audioRef.current.volume = defaultVolume;
    }
  }, [audioRef]);

  // Play/pause handling
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.warn('Audio play interrupted:', err);
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSong, audioRef]);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-200 dark:bg-gray-800 p-2 flex items-center justify-between shadow-inner z-50">
      <span className="truncate max-w-xs">{currentSong.split('/').pop()}</span>
      <button
        className="p-2 rounded bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
        onClick={togglePlay}
      >
        {isPlaying ? '⏸' : '▶️'}
      </button>
      <audio
        ref={audioRef}
        src={currentSong || process.env.REACT_APP_DEFAULT_SONG}
      />
    </div>
  );
}
