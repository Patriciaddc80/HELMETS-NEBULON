const { colors } = require("@mui/material")

module.exports = {
  content: ["./*.html", "./js/**/*.js"],
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('')",
      },
      colors: {
        'navigation': '#19050A',
        'links': '#F2F2F2',
        'btn': '#024959',
        'input': 'rgba(89, 2, 9, 0.5)',
        'bg-card': '#04080D',
      },
      fontFamily: {
        display: 'Oswald, ui-serif', // Adds a new `font-display` class
      },
      fontSize: {
        'xs': '.75rem',
        'sm': '.875rem',
        'tiny': '.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
        '7xl': '5rem',
        'prices': 'py-10 px-10'
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        'tablet': { 'min': '768px', 'max': '1024px' },
      },
      placeholderColor: {
        'custom-red': 'rgba(89, 2, 9, 0.5)',
      },
      lineHeight: {
        'extra': '2.5',
      },
    }
  },
  plugins: [],
};
