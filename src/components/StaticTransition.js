import React, { useEffect, useState } from 'react';

function StaticTransition({ duration = 500 }) {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    let mounted = true;

    const flickerSequence = () => {
      if (!mounted) return;

      const flickers = [
        0.1 + Math.random() * 0.2,
        0.4 + Math.random() * 0.3,
        0.2 + Math.random() * 0.3,
        0.8 + Math.random() * 0.2,
      ];

      flickers.forEach((val, idx) => {
        setTimeout(() => {
          if (mounted) setOpacity(val);
        }, idx * (duration / flickers.length));
      });

      setTimeout(() => {
        if (mounted) setOpacity(0);
      }, duration);
    };

    flickerSequence();

    return () => { mounted = false; };
  }, [duration]);

  return (
    <div
      className="fixed inset-0 bg-white dark:bg-gray-800 z-50 pointer-events-none transition-opacity"
      style={{ opacity, transitionDuration: `${duration / 4}ms` }}
    />
  );
}

export default StaticTransition;
