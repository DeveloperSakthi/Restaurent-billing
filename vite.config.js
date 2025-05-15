import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.', // Ensure the root is the project directory
  server: {
    port: 3000, // Run the dev server on port 3000
    open: true, // Automatically open the browser
  },
  build: {
    outDir: 'dist', // Output directory for the build
  },
});