import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
          colors: {
              'first': '#222831',
              'second': '#393E46',
              'third': '#76ABAE',
              'fourth': '#EEEEEE',
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

