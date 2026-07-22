import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // rolldown (used by Vite 8) requires manualChunks to be a function
        manualChunks(id) {
          if (id.includes('node_modules/html2pdf.js') || id.includes('node_modules/html2canvas') || id.includes('node_modules/jspdf')) {
            return 'vendor-pdf'
          }
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom') || id.includes('node_modules/react/') || id.includes('node_modules/scheduler')) {
            return 'vendor-react'
          }
          if (id.includes('node_modules/axios')) {
            return 'vendor-axios'
          }
        },
      },
    },
  },
})
