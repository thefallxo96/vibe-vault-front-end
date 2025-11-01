import React from 'react';

const placeholderItems = [
  { id: 1, title: 'Chill Vibe', description: 'Relax and unwind', color: 'bg-indigo-300' },
  { id: 2, title: 'Upbeat Mood', description: 'Get hyped!', color: 'bg-pink-300' },
  { id: 3, title: 'Focus Flow', description: 'Concentrate and create', color: 'bg-green-300' },
  { id: 4, title: 'Night Drive', description: 'Late night cruising', color: 'bg-purple-300' },
  { id: 5, title: 'Sunny Day', description: 'Feel good vibes', color: 'bg-yellow-300' },
  { id: 6, title: 'Rainy Chill', description: 'Cozy atmosphere', color: 'bg-blue-300' },
];

function Discover() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Discover New Vibes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {placeholderItems.map((item) => (
          <div
            key={item.id}
            className={`p-6 rounded-lg shadow-md cursor-pointer transform hover:scale-105 transition-transform duration-200 ${item.color} dark:bg-gray-700`}
          >
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-800 dark:text-gray-200">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Discover;
