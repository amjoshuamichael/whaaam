import svelte from 'rollup-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'
import copy from 'rollup-plugin-copy'
import css from 'rollup-plugin-css-only'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import livereload from 'rollup-plugin-livereload'
import {terser} from 'rollup-plugin-terser'
import rust from "@wasm-tool/rollup-plugin-rust"

const production = !process.env.ROLLUP_WATCH

export default [{
    input: 'src/main.js',
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
            plugins: [
              require("tailwindcss")
            ],
          },
          scss: {
            // path is relative to root
            prependData: `
              @import 'src/lib/Styles/main.scss';
            `
          }
        })
      }),

      css({ output: 'bundle.css' }),

      copy({
        targets: [
          { src: '../samples/**', dest: 'public/build/samples' },
          { src: 'images/*', dest: 'public/build/images' },
          { src: 'fonts/*', dest: 'public/build/fonts' }
        ]
      }),

      resolve({
        browser: true
      }),

      commonjs(),

      rust({
        verbose: true,
        serverPath: "/build/"
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
