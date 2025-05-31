import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'html-transform',
      transformIndexHtml(html) {
        // Critical CSSをインライン化
        return html.replace(
          '</head>',
          `<style id="critical">${criticalCSS}</style></head>`
        )
      }
    }
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
      ],
    },
  },
  build: {
    cssCodeSplit: true,
    modulePreload: true,
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'motion': ['framer-motion'],
          'icons': ['react-icons'],
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  build: {
    target: 'es2015',
    minify: 'terser',
    cssMinify: true,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['react-scroll', 'framer-motion'],
        },
      },
    },
  },
  css: {
    devSourcemap: true,
    modules: {
      scopeBehaviour: 'local',
      localsConvention: 'camelCase',
    },
    postcss: './postcss.config.js',
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    open: true,
    strictPort: true,
  },
  preview: {
    port: 3000,
    host: '0.0.0.0',
    open: true,
    strictPort: true,
  },
})
