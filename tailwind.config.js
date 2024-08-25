/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#8432b2",
          light: "#bd6af0",
          dark: "#621789",
          active: "#4d116b",
        },
        secondary: {
          DEFAULT: "#26292b",
          light: "#2f3336",
          active: "#1c1e20",
        },
      },
    },
  },
  plugins: [],
};
