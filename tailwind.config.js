/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Rubik", "sans-serif"],
      serif: ["Playfair Display", "serif"],
    },
    extend: {},
  },
  plugins: [],
};
