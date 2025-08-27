import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // 🔥 garante que qualquer rota (/req, /about, etc.) volte pro index.html
    fs: {
      allow: ['.']
    }
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // 🔥 essa parte é a mágica do SPA
  preview: {
    port: 5000,
    strictPort: true,
  },
  optimizeDeps: {},
}));
