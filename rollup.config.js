import typescript from 'rollup-plugin-typescript2';
import image from '@rollup/plugin-image';
import css from 'rollup-plugin-import-css';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy'

export default {
  input: 'src/index.tsx',
	output: {
		sourcemap: true,
    dir: 'src-x/output',
    format: 'iife',
  },
	plugins: [
		copy({targets: [{src: './src/index.html', dest: './src-x/output'}]}),
			postcss({
			extract: true,
			modules: true
		}),
		typescript({ sourceMap: false}),
    // css(),
    image(),
    commonjs(),
    nodeResolve(),
    livereload({
      watch: './src-x/output',
		}),
	],
};
