import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Output stays in `build/` so the Netlify deploy step keeps working unchanged.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
  server: { port: 3000, open: false },
});
