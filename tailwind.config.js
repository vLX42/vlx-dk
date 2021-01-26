module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
      portrait: { raw: '(orientation: portrait)' },
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
    fontSize: {
      xs: '.75vw',
      sm: '.875vw',
      tiny: '1.075vw',
      base: '1.2vw',
      lg: '1.325vw',
      xl: '1.55vw',
      '2xl': '1.8vw',
      '3xl': '2.175vw',
      '4xl': '2.55vw',
      '5xl': '3.1vw',
      '6xl': '4vw',
      '7xl': '5vw',
      '8xl': '6vw',
      '9xl': '7vw',

    },
    extend: {
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },

  variants: {
    extend: {},
  },
  plugins: [],
}
