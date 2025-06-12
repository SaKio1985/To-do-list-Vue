import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: 'To-do-list-Vue',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
