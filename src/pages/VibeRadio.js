import React, { useEffect, useState, useRef } from "react";
import { usePlayer } from "../context/PlayerContext";
import AddToPlaylistModal from "../components/modals/AddToPlaylistModal";
import { searchTracksByMood } from "../lib/spotify";
import { SkipForward, SkipBack, Play, Pause, Plus } from "lucide-react";

const moods = [
  { key: "Chill", emoji: "😌" },
  { key: "Party", emoji: "🎉" },
  { key: "Perreo", emoji: "🍑" },
  { key: "Hype", emoji: "🔥" },
  { key: "Gym Time", emoji: "💪" },
  { key: "Focus", emoji: "🧠" },
  { key: "Romance", emoji: "💘" },
];

export default function VibeRadio() {
  const { playTrack, pauseTrack, currentSong, isPlaying } = usePlayer();

  const [selectedMood, setSelectedMood] = useState("Chill");
  const [playlist, setPlaylist] = useState([]);
  const [index, setIndex] = useState(0);
  const [modalTrack, setModalTrack] = useState(null);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef(new Audio());

  // ✅ Load playlist when mood changes — no autoplay
  useEffect(() => {
    async function loadPlaylist() {
      const results = await searchTracksByMood(selectedMood);
      console.log(`🎧 Loaded ${results.length} tracks for mood: ${selectedMood}`);

      const playable = results.filter((t) => t.previewUrl);
      if (playable.length === 0) {
        console.warn(`⚠️ No playable tracks for ${selectedMood}`);
        setPlaylist([]);
        return;
      }

      setPlaylist(playable);
      setIndex(0);
      pauseTrack(); // ⛔️ no autoplay — explicitly pause
    }

    loadPlaylist();
  }, [selectedMood, pauseTrack]);

  // ✅ Manual play/pause handler
  const handlePlayPause = () => {
    if (!playlist.length) return;

    if (isPlaying) {
      pauseTrack();
    } else {
      const song = playlist[index];
      if (song.previewUrl) {
        playTrack({ ...song, url: song.previewUrl });
      } else {
        nextTrack();
      }
    }
  };

  // ✅ Next track w/ auto skip
  const nextTrack = () => {
    if (!playlist.length) return;
    let newIndex = (index + 1) % playlist.length;
    let next = playlist[newIndex];

    let tries = 0;
    while (next && !next.previewUrl && tries < playlist.length) {
      newIndex = (newIndex + 1) % playlist.length;
      next = playlist[newIndex];
      tries++;
    }

    setIndex(newIndex);
    if (next?.previewUrl) playTrack({ ...next, url: next.previewUrl });
  };

  // ✅ Previous track
  const prevTrack = () => {
    if (!playlist.length) return;
    const newIndex = (index - 1 + playlist.length) % playlist.length;
    setIndex(newIndex);
    const prev = playlist[newIndex];
    if (prev?.previewUrl) playTrack({ ...prev, url: prev.previewUrl });
  };

  // ✅ Track progress
  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current && !audioRef.current.paused) {
        setProgress(audioRef.current.currentTime);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">{selectedMood} Radio</h1>

      {/* Mood buttons */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
        {moods.map((m) => (
          <button
            key={m.key}
            onClick={() => setSelectedMood(m.key)}
            className={`px-4 py-2 rounded-full ${
              selectedMood === m.key
                ? "bg-indigo-600 text-white"
                : "bg-gray-300 dark:bg-gray-700"
            }`}
          >
            {m.emoji} {m.key}
          </button>
        ))}
      </div>

      {/* Current Song Display */}
      {currentSong && (
        <div className="flex flex-col items-center gap-4">
          <img
            src={currentSong.albumArt}
            alt={currentSong.title}
            className="w-48 h-48 rounded-xl shadow-lg"
          />
          <p className="font-semibold">{currentSong.title}</p>
          <p className="text-sm opacity-70">{currentSong.artist}</p>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-col items-center gap-4 mt-6">
        <div className="flex justify-center gap-8 items-center">
          <button onClick={prevTrack}><SkipBack size={36} /></button>
          <button onClick={handlePlayPause}>
            {isPlaying ? <Pause size={42} /> : <Play size={42} />}
          </button>
          <button onClick={nextTrack}><SkipForward size={36} /></button>
        </div>

        {/* Progress Bar */}
        <input
          type="range"
          min="0"
          max={audioRef.current?.duration || 0}
          value={progress}
          onChange={(e) => {
            if (audioRef.current) audioRef.current.currentTime = e.target.value;
          }}
          className="w-3/4 mt-2 accent-indigo-600"
        />

        {/* Add to Playlist */}
        {currentSong && (
          <button
            onClick={() => setModalTrack(currentSong)}
            className="mt-3 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center gap-2"
          >
            <Plus size={20} /> Add to Playlist
          </button>
        )}
      </div>

      {/* AddToPlaylist Modal */}
      {modalTrack && (
        <AddToPlaylistModal
          track={modalTrack}
          onClose={() => setModalTrack(null)}
        />
      )}
    </div>
  );
}
