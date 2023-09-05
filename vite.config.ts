/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import { defineConfig, searchForWorkspaceRoot } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  css: {
    modules: {
      localsConvention: 'camelCase',
    },
    postcss: {
      plugins: [autoprefixer({})],
    },
  },

  server: {
    port: 4200,
    host: 'localhost',
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd())],
    },
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  test: {
    setupFiles: ['./setupTests.ts'],
    globals: true,
    cache: {
      dir: './node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
