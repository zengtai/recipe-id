/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // fontFamily: {
    //   sans: ["Rubik", "sans-serif"],
    //   serif: ["Playfair Display", "serif"],
    // },
    extend: {
      backgroundImage: {
        cooking: "url('../public/images/cooking.svg')",
        ingredients: "url('../public/images/ingredients.svg')",
        serving: "url('../public/images/serving.svg')",
      },
    },
  },
  plugins: [],
};
