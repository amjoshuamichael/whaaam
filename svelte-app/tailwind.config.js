const production = !process.env.ROLLUP_WATCH;
module.exports = {
  mode: 'jit',
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  purge: {
    content: [
      "./src/**/*.svelte",
    ],
    enabled: production // disable purge in dev
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionProperty: {
        'filter': 'filter',
      },
      dropShadow: {
        'sm-dark': '0 1px 2px rgba(0, 0, 0, 0.25)',
        'lg-dark': '0 1px 8px rgba(0, 0, 0, 0.3)'
      }
    },
  },
  variants: {
    width: ["responsive", "hover", "focus"],
    dropShadow: ['active', 'focus'],
  },
  plugins: []
}
