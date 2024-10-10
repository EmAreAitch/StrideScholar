import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'

export default defineConfig({
  plugins: [
    react(),
    RubyPlugin(),
  ],
  server: {
    host: '0.0.0.0',
    hmr: {
      host: 'localhost',
      protocol: 'ws'
    },
    watch: {
      usePolling: true,
    }
  }
})
