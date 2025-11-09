import React from 'react';

export function MoodCard({ name }) {
  return (
    <div className="p-4 m-2 bg-gray-300 dark:bg-gray-700 rounded shadow">{name}</div>
  );
}

export function SongCard({ title }) {
  return (
    <div className="p-4 m-2 bg-gray-300 dark:bg-gray-700 rounded shadow">{title}</div>
  );
}
