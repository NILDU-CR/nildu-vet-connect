// La imagen del hero es el elemento LCP de la landing. La usan dos lados que tienen que coincidir:
// HeroSection (srcset y sizes del <img>) y el plugin hero-preload de Vite, que la precarga desde el HTML
// antes de que cargue el JS. Si los anchos o el sizes no son iguales, el navegador baja la imagen dos veces.

export type HeroLang = "es" | "en";

// Anchos de las versiones en src/assets/screens/hero/. La de 1700 es la original (hero.webp, hero-en.webp).
export const HERO_WIDTHS = [800, 1040, 1200, 1700] as const;
export type HeroWidth = (typeof HERO_WIDTHS)[number];

// Ancho con que se ve: tope de 1040 px; abajo, el ancho de la página menos el padding del contenedor
// (px-6 desde 640 px, px-4 en celular).
export const HERO_SIZES = "(min-width: 1088px) 1040px, (min-width: 640px) calc(100vw - 48px), calc(100vw - 32px)";

// Bajada del título del hero; la repite la página "Próximamente".
export const HERO_BAJADA: Record<HeroLang, string> = {
  es: "Plataforma inteligente de bienestar veterinario: desde el registro hasta la facturación, todo sin papeleo. Vive una conexión real con los dueños y sus mascotas.",
  en: "A smart platform for veterinary wellbeing: from check-in to invoicing, all paperless. Build a real connection with owners and their pets.",
};

export const heroFile = (lang: HeroLang, width: HeroWidth) => `hero${lang === "en" ? "-en" : ""}${width === 1700 ? "" : `-${width}`}.webp`;
