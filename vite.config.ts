import { cloudflare } from '@cloudflare/vite-plugin'
import { defineConfig } from 'vite'
import ssrPlugin from 'vite-ssr-components/plugin'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  build: {
    minify: true
  },
  plugins: [cloudflare(), ssrPlugin(), tailwindcss()]
})