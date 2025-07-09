import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode: _mode }) => {
  const isGitHubPages =
    process.env.VITE_DEPLOY_TARGET === 'github-pages' ||
    process.env.VITE_GITHUB_PAGES === 'true'

  return {
    plugins: [react()],
    base: isGitHubPages ? '/senirop-cms-demo/' : '/',
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@mock': resolve(__dirname, './src/core/mock'),
      },
    },
  }
})
