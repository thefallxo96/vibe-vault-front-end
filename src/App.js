import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Songs from './pages/Songs';
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

  useEffect(() => {
    const saved = localStorage.getItem('darkMode') === 'true';
    setDarkMode(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const handleNavigate = (targetPage) => {
    setShowTransition(true);
    setTimeout(() => {
      setPage(targetPage);
      setShowTransition(false);
    }, 500);
  };

  const renderPage = () => {
    switch (page) {
      case 'home': return <Home />;
      case 'songs': return <Songs />;
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
        {showTransition && <StaticTransition duration={500} />}
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} onNavigate={handleNavigate} />
        {renderPage()}
        <Footer />
        <Player />
      </div>
    </PlayerProvider>
  );
}

export default App;
