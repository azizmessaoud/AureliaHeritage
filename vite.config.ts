import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Increase warning threshold to 1 MB to avoid noisy warnings,
    // and add manualChunks to split large vendor bundles.
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react/jsx-runtime')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion')) return 'vendor-framer-motion';
            if (id.includes('leaflet')) return 'vendor-leaflet';
            if (id.includes('lucide-react')) return 'vendor-icons';
            if (id.includes('@tanstack') || id.includes('react-query')) return 'vendor-query';
            if (id.includes('lenis')) return 'vendor-lenis';
            // fallback vendor chunk for other node_modules
            return 'vendor';
          }
        },
      },
    },
  },
}));
