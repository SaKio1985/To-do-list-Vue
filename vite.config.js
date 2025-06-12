import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/vue-todo-app/', // Reemplaza con el nombre de tu repositorio
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
