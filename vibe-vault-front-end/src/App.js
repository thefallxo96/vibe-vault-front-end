// src/App.js
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Songs from './pages/Songs';
import Vibes from './pages/Vibes';
import StaticTransition from './components/StaticTransition';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [page, setPage] = useState('home');

  // Load dark mode preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('darkMode') === 'true';
    setDarkMode(saved);
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  // Handle page navigation with transition
  const handleNavigate = (targetPage) => {
    setShowTransition(true);

    // Wait for the transition to finish before switching page
    setTimeout(() => {
      setPage(targetPage);
      setShowTransition(false);
    }, 500); // matches StaticTransition duration
  };

  // Render the selected page
  const renderPage = () => {
    switch (page) {
      case 'home':
        return <Home />;
      case 'songs':
        return <Songs />;
      case 'vibes':
        return <Vibes />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Full-screen flicker transition */}
      {showTransition && <StaticTransition duration={500} />}

      {/* Navigation bar with dark mode toggle */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} onNavigate={handleNavigate} />

      {/* Current page content */}
      {renderPage()}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
