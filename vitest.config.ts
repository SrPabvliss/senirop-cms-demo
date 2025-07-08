/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__test__/setup.ts'],
    include: ['src/__test__/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@mock': path.resolve(__dirname, './src/core/mock'),
    },
  },
})
