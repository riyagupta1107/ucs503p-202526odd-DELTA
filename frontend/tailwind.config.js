/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        'violet': '#e2d8f2',
        'darkViolet': '#3c1893'
      },
      fontFamily: {
        'inter' : ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}