// ✅ src/components/Navbar.js
import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ darkMode, setDarkMode, currentPage, onNavigate }) {
  const { user, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between p-4 shadow-md bg-gray-100 dark:bg-gray-800">

      {/* LEFT — NAV LINKS */}
      <div className="flex gap-6">
        <button onClick={() => onNavigate("home")}>Home</button>
        <button onClick={() => onNavigate("viberadio")}>Vibe Radio</button>
        <button onClick={() => onNavigate("vibes")}>Playlists</button>
        <button onClick={() => onNavigate("discover")}>Discover</button>
        <button onClick={() => onNavigate("nowplaying")}>Now Playing</button>
      </div>

      {/* RIGHT — Login / Logout */}
      <div className="flex items-center gap-3">

        {/* DARK MODE TOGGLE */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-1 rounded-md bg-gray-300 dark:bg-gray-600"
        >
          {darkMode ? "🌙" : "☀️"}
        </button>

        {user ? (
          /* ✅ If logged in — show logout + profile */
          <>
            <button
              onClick={() => onNavigate("profile")}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md"
            >
              Profile
            </button>

            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded-md"
            >
              Log Out
            </button>
          </>
        ) : (
          /* 🚀 If logged out — show login/signup */
          <>
            <button
              onClick={() => onNavigate("profile")}
              className="px-4 py-2 bg-indigo-500 text-white rounded-md"
            >
              Log In
            </button>

            <button
              onClick={() => onNavigate("profile")}
              className="px-4 py-2 bg-green-600 text-white rounded-md"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
