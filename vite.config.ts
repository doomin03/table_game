import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
  root: '.',           
  publicDir: 'public',  
  build: { outDir: 'dist' },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
});
