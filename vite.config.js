import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@page' : path.resolve(__dirname, 'src/pages'),
      '@style' : path.resolve(__dirname, 'src/styles')
    }
  }

})

