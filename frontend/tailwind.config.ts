import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        halyard: ['HalyardDisplay', 'sans-serif'],
      },
      colors: {
        darkGray: '#212529',
        mediumGray: '#495057',
        lightGray: '#adb5bd',
        backgroundGray: '#f8f9fa',
        successLight: '#d3f1d8',
        successDark: '#0d6832',
        warningLight: '#ffe8cc',
        warningDark: '#995480',
        orange: '#e2723d',
        offWhite: '#faf7f5',
      },
    },
  },
  plugins: [],
};

export default config;
