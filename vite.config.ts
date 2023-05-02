import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: false,
    rollupOptions: {
      output: {
        entryFileNames: `assets/entry.js`,
        chunkFileNames: `assets/chunk.js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  }
})
