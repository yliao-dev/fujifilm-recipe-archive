import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: './postcss.config.js', // Pointing to PostCSS config
  },
  plugins: [react()],
  server: {
    port: 5173,
  }
})
