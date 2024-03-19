import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
          colors: {
              'first': '#404258',
              'second': '#474E68',
              'third': '#50577A',
              'fourth': '#6B728E',
          },
      },
    },
    variants: {
      extend: {},
    },
    plugins: [
        daisyui,
    ],
}

