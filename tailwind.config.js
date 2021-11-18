const production = !process.env.ROLLUP_WATCH;

const plugin = require("tailwindcss/plugin");

const exposeColorsPlugin = function({ addBase, theme }) {
  function extractColorVars(colorObj, colorGroup = '') {
    return Object.keys(colorObj).reduce((vars, colorKey) => {
      const value = colorObj[colorKey];

      const newVars =
          typeof value === 'string'
              ? { [`--color${colorGroup}-${colorKey}`]: value }
              : extractColorVars(value, `-${colorKey}`);

      return { ...vars, ...newVars };
    }, {});
  }

  addBase({
    ':root': extractColorVars(theme('colors')),
  });
}

module.exports = {
  mode: 'jit',
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  purge: {
    content: [
      "./app/**/*.svelte",
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
      },
      cursor: {
        'h-resize': 'ew-resize'
      },
      borderWidth: {
        '12': '12px',
        '16': '16px'
      }
    },
  },
  variants: {
    width: ["responsive", "hover", "focus"],
    dropShadow: ['active', 'focus']
  },
  plugins: [exposeColorsPlugin]
}
