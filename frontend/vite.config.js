import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Keep the essential proxy configuration for the backend
    proxy: {
      '/api': {
        target: 'http://localhost:3001', 
        changeOrigin: true,
        secure: false, 
      },
    },
  },
  // 🚫 Remove the 'esbuild' block entirely
});