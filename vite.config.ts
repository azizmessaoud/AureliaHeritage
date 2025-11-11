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
        // Removed custom manualChunks: let Vite/Rollup perform default chunking.
        // Custom vendor splitting caused inter-chunk circular imports in production
        // which can lead to runtime errors (e.g. reading createContext of undefined).
      },
    },
  },
}));
