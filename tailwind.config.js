module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './layout/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{html,js}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: 'rgba(37, 150, 190, 0.1)',
          200: 'rgba(37, 150, 190, 0.2)',
          300: 'rgba(37, 150, 190, 0.3)',
          400: 'rgba(37, 150, 190, 0.4)',
          500: 'rgba(37, 150, 190, 0.5)',
          600: 'rgba(37, 150, 190, 0.6)',
          700: 'rgba(37, 150, 190, 0.7)',
          800: 'rgba(37, 150, 190, 0.8)',
          900: 'rgba(37, 150, 190, 0.9)',
          DEFAULT: 'rgba(37, 150, 190, 1)',
        },
        button: 'black',
      },
      fontFamily: {
        primary: ['Silkscreen', 'sans-serif', 'cursive'],
        secondary: ['Inter'],
      },
    },
  },
  plugins: [],
};
