/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./App.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#2c225a",
        primary: "#030014",
        secondary: "#151312",
        light: {
          100: "#E9A6A6",
          200: "#C8ADFF",
          300: "#ff8945",
          400: "#554dda",
        },
        dark: {
          100: "#372660",
          200: "#1A133A",
          300: "#5b4967",
          400: "#2D214F",
          500: "#140d36",
          600: "#23213D",
        },
        accent: "AB8BFF",
      },
    },
  },
  plugins: [],
};
