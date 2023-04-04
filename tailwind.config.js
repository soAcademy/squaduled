/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  important: '#root',
  theme: {
      extend: {
        backgroundImage: {
          'main-bg': "url('/public/im3.jpg')",
        }
      },
  },
  plugins: [],
  }
