import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // Theme 1 : Default Dark
        first: "#000000",
        second: "#0C1821",
        third: "#1B2A41",
        fourth: "#324A5F",

        // Theme 2 : Nord
        // first: "#2E3440",
        // second: "#3B4252",
        // third: "#434C5E",
        // fourth: "#4C566A",

        // Theme 3 : Dracula
        // first: "#282A36",
        // second: "#44475A",
        // third: "#44475A",
        // fourth: "#44475A",

        // Theme 4 : Solarized Dark
        // first: "#002B36",
        // second: "#073642",
        // third: "#073642",
        // fourth: "#073642",

        // Theme 5 : Gruvbox Dark
        // first: "#282828",
        // second: "#3C3836",
        // third: "#3C3836",
        // fourth: "#3C3836",

        // Theme 6 : One Dark
        // first: "#282C34",
        // second: "#353B45",
        // third: "#353B45",
        // fourth: "#353B45",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [daisyui],
};
