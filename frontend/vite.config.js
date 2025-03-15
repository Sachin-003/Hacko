import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Import TailwindCSS and Autoprefixer in the correct manner
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ]
    }
  }
})
