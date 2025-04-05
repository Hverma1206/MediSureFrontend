import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  server: {
    port: 5000,
    proxy: {
      "/api": {
        target: "http://65.0.122.218/",
        changeOrigin: true,
        secure: false,
      },
      "/predict": {
        target: "http://52.66.107.103/",
        changeOrigin: true,
        secure: false,
      },
      "/predict_bone_route": {
        target: "http://52.66.107.103/",
        changeOrigin: true,
        secure: false,
      }
    },
  },
})
