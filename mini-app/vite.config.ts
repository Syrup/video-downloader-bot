import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dropdown-menu', '@radix-ui/react-progress', '@radix-ui/react-slot', '@radix-ui/react-tabs'],
          utils: ['clsx', 'tailwind-merge', 'class-variance-authority'],
        },
      },
    },
  },
  server: {
    host: true,
    port: 5173,
    // Allow external access for Telegram Web App development
    cors: true,
  },
  // Optimize for Telegram Mini App
  define: {
    global: 'globalThis',
  },
})
