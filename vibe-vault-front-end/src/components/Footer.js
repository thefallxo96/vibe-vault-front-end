import React from 'react';

function Footer() {
  return (
    <footer className="w-full py-4 text-center bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
      &copy; {new Date().getFullYear()} VibeVault. All rights reserved.
    </footer>
  );
}

export default Footer;
