/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  base: '/mbox-todo',
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
  css: { // необходимо, так как legacy JS API is deprecated (dart sass)
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Разделяем внешние зависимости на отдельный бандл
            return 'vendor';
          }
          if (id.includes('src/components')) {
            // Все компоненты будут в отдельном чанке
            return 'components';
          }
        },
      },
    },
  },
})
