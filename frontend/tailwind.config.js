import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // Theme 1 : Default Dark
        // first: "#1A1A1A",
        // second: "#333333",
        // third: "#4D4D4D",
        // fourth: "#666666",

        // Theme 2 : Nord
        // first: "#2E3440",
        // second: "#3B4252",
        // third: "#434C5E",
        // fourth: "#4C566A",

        // Theme 3 : Space Blue
        first: "#0A2647",
        second: "#144272",
        third: "#205295",
        fourth: "#2C74B3",

        // Theme 4 : Grey
        // first: "#404258",
        // second: "#474E68",
        // third: "#50577A",
        // fourth: "#6B728E",

        // Theme 5 : Purple1
        // first: "#371B58",
        // second: "#4C3575",
        // third: "#5B4B8A",
        // fourth: "#7858A6",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [daisyui],
};
