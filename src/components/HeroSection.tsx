import hero from "@/assets/screens/hero/hero.webp";
import hero800 from "@/assets/screens/hero/hero-800.webp";
import hero1040 from "@/assets/screens/hero/hero-1040.webp";
import hero1200 from "@/assets/screens/hero/hero-1200.webp";
import heroEn from "@/assets/screens/hero/hero-en.webp";
import heroEn800 from "@/assets/screens/hero/hero-en-800.webp";
import heroEn1040 from "@/assets/screens/hero/hero-en-1040.webp";
import heroEn1200 from "@/assets/screens/hero/hero-en-1200.webp";
import { HERO_SIZES, HERO_WIDTHS } from "@/lib/hero";
import type { HeroLang, HeroWidth } from "@/lib/hero";
import { useLang } from "@/lib/i18n";
import { primaryButton } from "@/lib/styles";

// Una versión por cada ancho de HERO_WIDTHS; el plugin hero-preload precarga la misma desde el HTML.
const imagenes: Record<HeroLang, Record<HeroWidth, string>> = {
  es: { 800: hero800, 1040: hero1040, 1200: hero1200, 1700: hero },
  en: { 800: heroEn800, 1040: heroEn1040, 1200: heroEn1200, 1700: heroEn },
};
const srcSet = (lang: HeroLang) => HERO_WIDTHS.map((w) => `${imagenes[lang][w]} ${w}w`).join(", ");

// El título repite dos puntos del logo: la palabra clave va en el morado de marca con el punto de su
// primera "i" en celeste, y el punto final va en el anaranjado del punto de la U de NILDU.
const acento = "text-brand";
const punto = "text-dot-gold";

// Pinta la "i" con un degradado de corte seco: celeste arriba y morado abajo.
// Con Poppins 600, el punto de la "i" termina a 0.43em del borde superior de la caja del texto y el
// palito empieza a 0.49em; el corte a 0.46em cae en ese hueco en cualquier tamaño de letra.
const iCeleste = "bg-gradient-to-b from-dot-cyan from-[0.46em] to-brand to-[0.46em] bg-clip-text text-transparent";

const textos = {
  es: {
    titulo: (
      <>
        Tu{" "}
        <span className={acento}>
          veter<span className={iCeleste}>i</span>naria
        </span>{" "}
        en un solo sistema<span className={punto}>.</span>
      </>
    ),
    bajada: "Plataforma inteligente de bienestar veterinario: desde el registro hasta la facturación, todo sin papeleo. Vive una conexión real con los dueños y sus mascotas.",
    demo: "Agenda una demo",
    precios: "Ver precios →",
    alt: "Nildu con la agenda de octubre, el panel de control, la ficha de Canelo, su curva de peso y sus archivos",
  },
  en: {
    titulo: (
      <>
        Your{" "}
        <span className={acento}>
          vet cl<span className={iCeleste}>i</span>nic
        </span>{" "}
        in one system<span className={punto}>.</span>
      </>
    ),
    bajada: "A smart platform for veterinary wellbeing: from check-in to invoicing, all paperless. Build a real connection with owners and their pets.",
    demo: "Book a demo",
    precios: "See pricing →",
    alt: "Nildu with the October schedule, the dashboard, Canelo's record, his weight curve and his files",
  },
};

const HeroSection = () => {
  const [lang] = useLang();
  const t = textos[lang];

  return (
    <section id="inicio" className="scroll-mt-20">
      <div className="mx-auto max-w-page px-4 pb-20 pt-10 sm:px-6 md:pt-14">
        <div className="mx-auto max-w-4xl text-center">
          {/* Título corto: dos líneas en todos los anchos, para que la captura del portal suba al primer pantallazo. */}
          <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.5rem]">{t.titulo}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink">{t.bajada}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <a href="#contacto" className={primaryButton}>
              {t.demo}
            </a>
            <a href="#precios" className="font-medium text-navy hover:text-brand">
              {t.precios}
            </a>
          </div>
        </div>

        <img
          src={imagenes[lang][1700]}
          srcSet={srcSet(lang)}
          sizes={HERO_SIZES}
          fetchPriority="high"
          alt={t.alt}
          width={1700}
          height={1021}
          className="mx-auto mt-10 block h-auto w-full max-w-[1040px] md:mt-12"
        />
      </div>
    </section>
  );
};

export default HeroSection;
