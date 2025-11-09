// src/pages/Discover.js
import React from 'react';
import { usePlayer } from '../components/PlayerContext';

export default function Discover() {
  const { playTrack, currentSong, isPlaying } = usePlayer();

  const tracks = [
    {
      id: 1,
      title: 'Which One',
      artist: 'Rauw Alejandro',
      src: 'https://example.com/audio/whichone.mp3',
      cover: 'https://images.unsplash.com/photo-1508780709619-79562169bc64',
    },
    {
      id: 2,
      title: 'Moonlight Flow',
      artist: 'Bad Bunny',
      src: 'https://example.com/audio/moonlight.mp3',
      cover: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f',
    },
    {
      id: 3,
      title: 'Midnight Vibes',
      artist: 'Feid',
      src: 'https://example.com/audio/midnight.mp3',
      cover: 'https://images.unsplash.com/photo-1510626176961-4b57d4fbad03',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white dark:from-gray-900 dark:to-black p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        🌎 Discover New Vibes
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tracks.map((track) => (
          <div
            key={track.id}
            className="rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800"
          >
            <img
              src={track.cover}
              alt={track.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col items-center">
              <h2 className="font-semibold text-lg text-gray-800 dark:text-white mb-1">
                {track.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                {track.artist}
              </p>
              <button
                onClick={() =>
                  playTrack({
                    title: track.title,
                    src: track.src,
                  })
                }
                className={`px-4 py-2 rounded-full text-white font-medium transition-colors ${
                  currentSong?.src === track.src && isPlaying
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-indigo-500 hover:bg-indigo-600'
                }`}
              >
                {currentSong?.src === track.src && isPlaying ? '⏸ Pause' : '▶️ Play'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
