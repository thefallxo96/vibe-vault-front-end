import React from 'react';
import bg from '../assets/background.png';

export default function Home() {
  return (
    <div
      className="flex flex-col items-center justify-center h-[80vh] bg-cover bg-center text-center text-gray-900 dark:text-gray-100"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-10 shadow-xl">
        <h1 className="text-5xl font-extrabold mb-4 tracking-wide">VibeVault</h1>
        <p className="text-lg max-w-xl">
          Where your sound meets your soul. Explore curated tracks and moods that match your energy.
        </p>
      </div>
    </div>
  );
}
