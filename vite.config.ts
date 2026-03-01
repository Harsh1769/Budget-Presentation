import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Load env from files (local dev)
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    base: '/Budget-Presentation/', 
    plugins: [react(), tailwindcss()],
    define: {
      // Logic: Use the Secret from GitHub if available, otherwise use the local .env key
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || process.env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      // This ensures that even if there are small TS warnings, the build tries to finish
      chunkSizeWarningLimit: 1600,
    },
  };
});
