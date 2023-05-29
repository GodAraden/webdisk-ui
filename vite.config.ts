import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  server: {
    port: 3456,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000', //实际请求地址
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, '/')
      }
    }
  }
})
