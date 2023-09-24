import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      // template: {
      //   compilerOptions: {
      //     isCustomElement: (tag) => tag.startsWith('v-')
      //   }
      // }
    }),
    svgLoader()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    deps: {
      inline: ['vuetify']
    }
  }
})
