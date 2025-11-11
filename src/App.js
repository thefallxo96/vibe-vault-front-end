// ✅ src/App.js
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import VibeRadio from "./pages/VibeRadio";
import Discover from "./pages/Discover";
import NowPlaying from "./pages/NowPlaying";
import Profile from "./pages/Profile";
import StaticTransition from "./components/StaticTransition";
import Player from "./components/Player";

// ✅ Context providers
import { AuthProvider } from "./context/AuthContext";
import { PlayerProvider } from "./context/PlayerContext";
import { PlaylistProvider } from "./context/PlaylistContext";

// ✅ Playlist Page (formerly Vibes.js)
import Playlists from "./pages/Vibes";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [page, setPage] = useState("home");

  // ---------------- DARK MODE ----------------
  useEffect(() => {
    const saved = localStorage.getItem("darkMode") === "true";
    setDarkMode(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // ---------------- NAVIGATION ----------------
  const handleNavigate = (targetPage) => {
    setShowTransition(true);
    setTimeout(() => {
      setPage(targetPage);
      setShowTransition(false);
    }, 400);
  };

  const renderPage = () => {
    switch (page) {
      case "home":
        return <Home />;
      case "viberadio":
        return <VibeRadio />;
      case "discover":
        return <Discover />;
      case "vibes":
        return <Playlists />;
      case "nowplaying":
        return <NowPlaying />;
      case "profile":
        return <Profile />;
      default:
        return <Home />;
    }
  };

  return (
    <AuthProvider>
      <PlayerProvider>
        <PlaylistProvider>
          <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">

            {/* Page transition */}
            {showTransition && <StaticTransition duration={400} />}

            {/* Navbar */}
            <Navbar
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              currentPage={page}
              onNavigate={handleNavigate}
            />

            {/* Page Content */}
            <main className="flex-grow">{renderPage()}</main>

            {/* Footer */}
            <Footer />

            {/* Persistent global audio player */}
            <Player />
          </div>
        </PlaylistProvider>
      </PlayerProvider>
    </AuthProvider>
  );
}

export default App;
