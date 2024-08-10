/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#8432b2",
          dark: "#621789",
          light: "#bd6af0",
        },
        secondary: "#2f3336",
      },
    },
  },
  plugins: [],
};
