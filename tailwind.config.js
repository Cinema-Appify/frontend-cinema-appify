/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'strong-red': '#C02B35',
        'light-red': '#CC575F',
        'golden': '#DF8C00',
        'grayish-blue': '#273238',
        'grayish-blue-2': '#434E54'
      },
    },
  },
  plugins: [],
} 