import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // 1. This ensures all assets (JS/CSS) are loaded from the subfolder /Budget-Presentation/
    base: '/Budget-Presentation/', 
    
    plugins: [react(), tailwindcss()],
    
    define: {
      // 2. This allows the Gemini API Key to be injected from GitHub Secrets during build
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // Standard Vite alias for the src folder
      },
    },

    build: {
      // 3. Ensures the output matches your GitHub Action 'path: ./dist'
      outDir: 'dist',
      assetsDir: 'assets',
      // This helps prevent MIME type issues by ensuring proper file grouping
      rollupOptions: {
        output: {
          format: 'es',
        },
      },
    },

    server: {
      // HMR configuration for AI Studio compatibility
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
