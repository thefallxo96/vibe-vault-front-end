// src/components/Navbar.js
import React from 'react';

function Navbar({ darkMode, setDarkMode, onNavigate, currentPage }) {
  const menuItems = [
    { name: 'Home', key: 'home' },
    { name: 'Songs', key: 'songs' },
    { name: 'Vibes', key: 'vibes' },
    { name: 'Discover', key: 'discover' },
    { name: 'Now Playing', key: 'nowplaying' },
    { name: 'Profile', key: 'profile' },
  ];

  return (
    <nav className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
      {/* Logo / Brand */}
      <div
        className="text-xl font-bold cursor-pointer"
        onClick={() => onNavigate('home')}
      >
        VibeVault
      </div>

      {/* Menu Items */}
      <ul className="flex gap-6">
        {menuItems.map((item) => (
          <li
            key={item.key}
            className={`cursor-pointer transition-colors duration-200 ${
              currentPage === item.key
                ? 'text-indigo-500 font-semibold'
                : 'hover:text-indigo-500'
            }`}
            onClick={() => onNavigate(item.key)}
          >
            {item.name}
          </li>
        ))}
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
