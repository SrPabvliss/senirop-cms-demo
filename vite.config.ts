import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/senirop-cms-demo/' : '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@mock': resolve(__dirname, './src/core/mock'),
    },
  },
})
