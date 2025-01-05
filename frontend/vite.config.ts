import { defineConfig } from 'vite';
import * as path from 'path'; // Import the path module

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});