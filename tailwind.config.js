/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#66928B',
        primary_light: '#A7D7CF',
        primary_dark : '#43615C',
        secondary: '#DDA0A0',
        secondary_dark: '#9E7676',
        bg: '#FFF0F0'
      }
    },
    fontFamily: {
        sans: ['"Albert Sans"', 'sans-serif'],
      }
  },
  plugins: [],
}