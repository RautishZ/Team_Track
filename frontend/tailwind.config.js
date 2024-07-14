/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main1: {
          DEFAULT: '#484c7f',
          50: '#d9dbe8',
          100: '#b2b5d1',
          200: '#8b90ba',
          300: '#646ba3',
          400: '#4d548c',
          500: '#484c7f',
          600: '#3c3f6d',
          700: '#30335a',
          800: '#242648',
          900: '#181936',
        },
        main2: {
          DEFAULT: '#f19828',
          50: '#fde8d2',
          100: '#fbd0a6',
          200: '#f8b87a',
          300: '#f6a04e',
          400: '#f48822',
          500: '#f19828',
          600: '#d38220',
          700: '#b46d19',
          800: '#955711',
          900: '#764209',
        },
      },
    },
  },
  plugins: [],
}
