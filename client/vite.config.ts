import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const proxyTarget = process.env.VITE_PROXY_TARGET || 'http://localhost:8080';

// Watch and HMR settings needed for podman & MacOs when running everything inside container
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      '/api': {
        target: proxyTarget,
        changeOrigin: true,
        secure: false,
      }
    },
    watch: {
      usePolling: true,
      interval: 1000
    },
    strictPort: true,
    hmr: {
      clientPort: 5173
    }
  }
});
