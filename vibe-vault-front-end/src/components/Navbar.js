// src/components/Navbar.js
import React from 'react';

function Navbar({ darkMode, setDarkMode, onNavigate }) {
  return (
    <nav className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
      {/* Logo / Brand */}
      <div className="text-xl font-bold cursor-pointer" onClick={() => onNavigate('home')}>
        VibeVault
      </div>

      {/* Menu Items */}
      <ul className="flex gap-6">
        <li
          className="cursor-pointer hover:text-indigo-500 transition-colors duration-200"
          onClick={() => onNavigate('home')}
        >
          Home
        </li>
        <li
          className="cursor-pointer hover:text-indigo-500 transition-colors duration-200"
          onClick={() => onNavigate('songs')}
        >
          Songs
        </li>
        <li
          className="cursor-pointer hover:text-indigo-500 transition-colors duration-200"
          onClick={() => onNavigate('vibes')}
        >
          Vibes
        </li>
      </ul>

      {/* Dark Mode Toggle */}
      <button
        className="ml-4 p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? '🌙' : '☀️'}
      </button>
    </nav>
  );
}

export default Navbar;
