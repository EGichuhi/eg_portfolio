/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'slow-zoom': 'slow-zoom 20s ease-in-out infinite alternate',
        'fade-in': 'fade-in 1.5s ease-out forwards',
      },
      keyframes: {
        'slow-zoom': {
          'from': { transform: 'scale(1)' },
          'to': { transform: 'scale(1.1)' },
        },
        'fade-in': {
          'from': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
};