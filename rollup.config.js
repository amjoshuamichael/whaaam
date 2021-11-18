const effectNames = ['bitcrush', 'ripple']
const workingEffect = 'bitcrush'

import svelte from 'rollup-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'
import copy from 'rollup-plugin-copy'
import css from 'rollup-plugin-css-only'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import livereload from 'rollup-plugin-livereload'
import {terser} from 'rollup-plugin-terser'
import rust from "@wasm-tool/rollup-plugin-rust"
import {base64} from 'rollup-plugin-base64'
import postCSS from 'rollup-plugin-postcss'

const production = !process.env.ROLLUP_WATCH

const removeUnusedCSSSelectorError = (warning, handler) => {
  const { code, frame } = warning
  if (code === "css-unused-selector") return
  handler(warning)
}

let config = [
  {
    input: 'app/main.js',
    output: {
      sourcemap: true,
      format: 'iife',
      name: 'app',
      file: 'public/build/bundle.js'
    },
    plugins: [
      svelte({
        compilerOptions: {
          dev: !production
        },
        preprocess:  sveltePreprocess({
          sourceMap: !production,
          postcss: {
            includes: ['.css'],
            excludes: ['app'],
            plugins: [
              require("tailwindcss")
            ],
          },
          scss: {
            // path is relative to root
            prependData: `
                @import 'app/Styles/main.scss';
              `
          }
        }),
        // onwarn: removeUnusedCSSSelectorError
      }),

      css({ output: 'bundle.css' }),

      copy({
        targets: [
          { src: 'samples/**', dest: 'public/build/samples' },
          { src: 'images/*', dest: 'public/build/images' },
          { src: 'fonts/*', dest: 'public/build/fonts' },
        ]
      }),

      resolve({
        browser: true
      }),

      commonjs(),

      rust({
        verbose: true,
        serverPath: "/build/",
        inlineWasm: production
      }),

      // In dev mode, call `npm run start` once
      // the bundle has been generated
      !production && serve(),

      // Watch the `public` directory and refresh the
      // browser on changes when not in production
      !production && livereload('public'),

      // If we're building for production (npm run build
      // instead of npm run dev), minify
      production && terser()
    ],
    watch: {
      clearScreen: false
    }
  }
]

if (production)
  for (const name of effectNames) config.push(getEffectConfig(name))
else
  config.push(getEffectConfig(workingEffect))

function getEffectConfig(effectName) {
  return {
    input: `fx/${effectName}/main.js`,
    output: {
      format: 'cjs',
      file: `public/fx/${effectName}.js`
    },
    plugins: [
      postCSS({
        plugins: [
          require('tailwindcss')({
            mode: 'jit',
            future: {
              purgeLayersByDefault: true,
              removeDeprecatedGapUtilities: true,
            },
            purge: {
              content: [
                `fx/${effectName}/index.html`,
              ],
              enabled: false // disable purge in dev
            },
            darkMode: false, // or 'media' or 'class'
          })
        ]
      }),

      base64({
        include: [`fx/${effectName}/*.html`, `fx/${effectName}/*.wasm`]
      }),

      rust({
        verbose: true,
        serverPath: "/fx/",
        inlineWasm: true
      }),
    ],
  }
}

export default config

function serve() {
  let started = false;

  return {
    writeBundle() {
      if (!started) {
        started = true;

        require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true
        })
      }
    }
  }
}