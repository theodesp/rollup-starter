import babel from 'rollup-plugin-babel';
import { eslint } from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import postcss from 'rollup-plugin-postcss';

import progress from 'rollup-plugin-progress';
import filesize from 'rollup-plugin-filesize';

// PostCSS plugins
import simplevars from 'postcss-simple-vars';
import nested from 'postcss-nested';
import cssnext from 'postcss-cssnext';
import cssnano from 'cssnano';

export default  {
  input: 'src/main.js',
  plugins: [
    postcss({
      plugins: [
        simplevars(),
        nested(),
        cssnext({ warnForDuplicates: false, }),
        cssnano(),
      ],
      extensions: [ '.css' ]
    }),
    replace({
      exclude: 'node_modules/**',
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: false,
    }),
    eslint({
      exclude: [
        'src/styles/**',
      ]
    }),
    (process.env.NODE_ENV === 'production' && uglify()),
    filesize(),
    progress({
      clearLine: false // default: true
    })
  ],
  output: {
    file: 'dest/app.js', // equivalent to --output,
    format: 'iife', // immediately-invoked function expression — suitable for <script> tags
    sourceMap: true
  }
};
