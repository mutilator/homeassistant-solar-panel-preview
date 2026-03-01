import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/solar-panel-grid-card.js',
    format: 'iife',
    sourcemap: true,
    globals: {
      lit: 'lit',
      'lit-element': 'litElement',
    },
  },
  external: [],
  plugins: [
    typescript({
      tsconfig: false,
      compilerOptions: {
        target: 'ES2020',
        module: 'ES2020',
        lib: ['ES2020', 'DOM', 'DOM.Iterable'],
      },
    }),
    resolve({ browser: true }),
    commonjs(),
  ],
};
