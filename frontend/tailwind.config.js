/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        polygon: {
          purple: '#8247E5',
          dark: '#0A1647',
          light: '#F9F8FF',
        },
      },
    },
  },
  plugins: [],
} 