import React from 'react';
import vibeImg from '../assets/vibe.png';

export default function Vibes() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <img
        src={vibeImg}
        alt="Vibe"
        className="w-64 h-64 object-cover rounded-full shadow-xl mb-6 animate-pulse"
      />
      <h2 className="text-4xl font-bold mb-2">Set Your Vibe</h2>
      <p className="max-w-md text-lg text-gray-700 dark:text-gray-300">
        Whether it’s chill, hype, or soulful — find the sound that moves you.
      </p>
    </div>
  );
}
