import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  // Solo localhost: con host "::" cualquiera en la red leía .git/ y las carpetas locales. Para probar desde otro equipo: pnpm dev --host.
  server: { port: 8080 },
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
