module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      gridTemplateColumns: {
       'large': 'repeat(4, minmax(0, 384px))',
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
