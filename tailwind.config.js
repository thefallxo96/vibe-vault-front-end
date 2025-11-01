/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '0' },
          '10%, 30%, 50%, 70%, 90%': { opacity: '1' },
          '20%, 40%, 60%, 80%': { opacity: '0.3' },
        },
        fadeInOut: {
          '0%': { opacity: '0' },
          '10%, 90%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        flicker: 'flicker 0.5s linear forwards',
        fadeFlicker: 'fadeInOut 0.5s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}
