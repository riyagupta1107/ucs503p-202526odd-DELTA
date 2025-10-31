import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // This forwards any request starting with /api
      // to your backend server running on port 3001
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      }
    }
  }
})