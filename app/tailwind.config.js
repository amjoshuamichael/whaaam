const production = !process.env.ROLLUP_WATCH;

const plugin = require("tailwindcss/plugin");

const hoverSiblingPlugin = plugin(function ({ addVariant, e }) {
  addVariant("hover-sibling", ({ container }) => {
    container.walkRules((rule) => {
      rule.selector = `:hover + .hover-sibling\\:${rule.selector.slice(1)}`;
    });
  });
});

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
    dropShadow: ['active', 'focus'],
    backgroundColor: ['hover-sibling']
  },
  plugins: [hoverSiblingPlugin]
}
