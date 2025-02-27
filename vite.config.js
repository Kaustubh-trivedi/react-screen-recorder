import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',  // Output the built files into the dist/ directory
    rollupOptions: {
      input: {
        popup: './public/popup.html',  // Extension popup page
      }
    }
  }
});
