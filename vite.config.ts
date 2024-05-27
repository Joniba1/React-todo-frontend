// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Automatically determine host
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
});
