import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        first: "#355070",
        second: "#6D597A",
        third: "#B56576",
        fourth: "#E56B6F",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [daisyui],
};
