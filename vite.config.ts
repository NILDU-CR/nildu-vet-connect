import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  server: { host: "::", port: 8080 },
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  // Sin imágenes en línea (data:): el CSP de vercel.json solo permite img-src 'self'.
  build: { assetsInlineLimit: 0 },
});
