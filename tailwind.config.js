/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
      },
      colors: {
        brand: {
          warm: '#FDF8F3',
          ink: '#3D342D',
          accent: '#C68E74',
          secondary: '#E9DCC9',
          highlight: '#B4C4B4',
          wood: '#8B5E3C',
        },
      },
    },
  },
  plugins: [],
};
