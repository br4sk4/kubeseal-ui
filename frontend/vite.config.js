import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import monacoEditorPlugin from 'vite-plugin-monaco-editor';

export default defineConfig({
  plugins: [solidPlugin(), monacoEditorPlugin({})],
  base: '/',
  server: {
    port: 3000,
  },
  build: {
    outDir: '../.dist/frontend',
    emptyOutDir: 'true',
    target: 'esnext',
  },
});
