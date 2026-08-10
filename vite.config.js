import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build'
  },
  server: {
    proxy: {
      '/k1/api': {
        target: 'https://srv1023256.hstgr.cloud',
        changeOrigin: true,
        rewrite: (path) => path,
        timeout: 60000,
        proxyTimeout: 60000,
        ws: true,
        secure: false
      }
    }
  }
})
