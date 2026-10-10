import type { Config } from "tailwindcss";

// Los colores de Nildu van en extend: ComingSoon usa la paleta por defecto (slate, emerald).
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#172c44",
        ink: "#4b5a6b",
        line: "#d5dae1",
        mist: "#f6f7f9",
        brand: { DEFAULT: "#52067e", hover: "#6e1f99" },
        cta: { DEFAULT: "#0cdbf3", hover: "#0ac2d8" },
        dot: { cyan: "#0cdbf3", violet: "#8734ea", gold: "#F3A712" },
      },
      fontFamily: { sans: ["Poppins", "system-ui", "sans-serif"] },
      maxWidth: { page: "1120px" },
    },
  },
} satisfies Config;
