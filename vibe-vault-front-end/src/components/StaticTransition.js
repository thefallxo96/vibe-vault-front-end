// src/components/StaticTransition.js
import React, { useEffect, useState } from 'react';

function StaticTransition({ duration = 500 }) {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    let mounted = true;

    // Create a sequence of subtle flickers
    const flickerSequence = () => {
      if (!mounted) return;

      const flickers = [
        0.2 + Math.random() * 0.2, // 0.2–0.4
        0.4 + Math.random() * 0.2, // 0.4–0.6
        0.6 + Math.random() * 0.2, // 0.6–0.8
        0.8 + Math.random() * 0.2, // 0.8–1.0
      ];

      flickers.forEach((val, idx) => {
        setTimeout(() => {
          if (mounted) setOpacity(val);
        }, idx * (duration / flickers.length));
      });

      // Smooth fade out at the end
      setTimeout(() => {
        if (mounted) setOpacity(0);
      }, duration);
    };

    flickerSequence();

    return () => {
      mounted = false;
    };
  }, [duration]);

  return (
    <div
      className="fixed inset-0 bg-white dark:bg-gray-800 z-50 pointer-events-none transition-opacity"
      style={{ opacity, transition: `opacity ${duration / 2}ms ease-in-out` }}
    />
  );
}

export default StaticTransition;
