import { defineConfig, UserConfigExport } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  ...(process.env.NODE_ENV === 'development'
    ? {
        test: {
          globals: true,
          environment: 'jsdom',
          setupFiles: './src/test/setup.ts',
        },
      }
    : {}),
} as UserConfigExport);
