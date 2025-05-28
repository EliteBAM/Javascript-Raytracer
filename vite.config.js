import { defineConfig } from 'vite';

export default defineConfig({
  root: './src/renderer',
  build: {
    outDir: '../../../dist', // where production build goes
    emptyOutDir: true
  }
});