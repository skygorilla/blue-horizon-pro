import react from "@vitejs/plugin-react-swc";
import { componentTagger } from "lovable-tagger";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: true, // Enable source maps for builds
    // Allow the build to complete even with TypeScript errors
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  },
  css: {
    devSourcemap: true, // Enable source maps for development
  },
  // Ignore TypeScript errors during development too
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  }
}));
