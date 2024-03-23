import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
          colors: {
              'first': '#0A2647',
              'second': '#144272',
              'third': '#205295',
              'fourth': '#2C74B3',
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

