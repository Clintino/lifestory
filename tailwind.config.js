/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './src/**/*.css'],
  theme: {
    extend: {
      colors: {
        background: '#FDF8F0',
        foreground: '#1C1B1F',
        primary: '#E75A68',
        muted: {
          foreground: 'rgb(28, 27, 31, 0.7)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'glow': '0px 0px 120px -25px rgba(231, 90, 104, 0.5)',
      },
      textColor: {
        foreground: '#1C1B1F',
      },
    },
  },
  plugins: [],
};