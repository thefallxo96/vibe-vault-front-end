// src/pages/Songs.js
import React from 'react';
import { usePlayer } from '../components/PlayerContext';

const songList = [
  {
    title: 'Which One - Dirty Remix',
    artist: 'DJ Yonny',
    src: '/audio/which-one-dirty-remix.mp3',
    cover: '/images/song-cover.png',
  },
  {
    title: 'Another Track',
    artist: 'Artist Name',
    src: '/audio/another-track.mp3',
    cover: '/images/song-cover.png',
  },
  // add more songs here
];

function Songs() {
  const { setCurrentSong } = usePlayer(); // <- use the hook

  const handlePlay = (song) => {
    setCurrentSong(song);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Songs</h1>
      <ul className="space-y-4">
        {songList.map((song, idx) => (
          <li
            key={idx}
            className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-md shadow hover:shadow-lg cursor-pointer transition"
            onClick={() => handlePlay(song)}
          >
            <div className="flex items-center gap-4">
              <img src={song.cover} alt={song.title} className="w-16 h-16 rounded-md" />
              <div>
                <p className="font-semibold">{song.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{song.artist}</p>
              </div>
            </div>
            <button className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600">
              Play
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Songs;
