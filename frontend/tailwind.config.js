import daisyui from "daisyui"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add all your JS, JSX, TS, TSX files
  ],
  theme: {
    extend: {}, // Extend Tailwind's default theme here
  },
  plugins: [daisyui,], // Add plugins like forms or typography here if needed
};
