import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import VibeRadio from './pages/VibeRadio';
import Vibes from './pages/Vibes';
import Discover from './pages/Discover';
import NowPlaying from './pages/NowPlaying';
import Profile from './pages/Profile';
import StaticTransition from './components/StaticTransition';
import Player from './components/Player';
import { PlayerProvider } from './components/PlayerContext';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [page, setPage] = useState('home');

  // Load dark mode from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('darkMode') === 'true';
    setDarkMode(saved);
  }, []);

  // Persist dark mode changes
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Page navigation with transition
  const handleNavigate = (targetPage) => {
    setShowTransition(true);
    setTimeout(() => {
      setPage(targetPage);
      setShowTransition(false);
    }, 500);
  };

  // Render the current page
  const renderPage = () => {
    switch (page) {
      case 'home': return <Home />;
      case 'viberadio': return <VibeRadio />;
      case 'vibes': return <Vibes />;
      case 'discover': return <Discover />;
      case 'nowplaying': return <NowPlaying />;
      case 'profile': return <Profile />;
      default: return <Home />;
    }
  };

  return (
    <PlayerProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* Page transition overlay */}
        {showTransition && <StaticTransition duration={500} />}

        {/* Navbar */}
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onNavigate={handleNavigate}
          currentPage={page}
        />

        {/* Main page content */}
        {renderPage()}

        {/* Footer */}
        <Footer />

        {/* Persistent player at the bottom (except Home) */}
        {page !== 'home' && <Player />}
      </div>
    </PlayerProvider>
  );
}

export default App;
