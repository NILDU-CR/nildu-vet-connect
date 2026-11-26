import hero from "@/assets/screens/hero/hero.webp";
import hero800 from "@/assets/screens/hero/hero-800.webp";
import hero1040 from "@/assets/screens/hero/hero-1040.webp";
import hero1200 from "@/assets/screens/hero/hero-1200.webp";
import heroEn from "@/assets/screens/hero/hero-en.webp";
import heroEn800 from "@/assets/screens/hero/hero-en-800.webp";
import heroEn1040 from "@/assets/screens/hero/hero-en-1040.webp";
import heroEn1200 from "@/assets/screens/hero/hero-en-1200.webp";
import { HERO_BAJADA, HERO_SIZES, HERO_WIDTHS } from "@/lib/hero";
import type { HeroLang, HeroWidth } from "@/lib/hero";
import { useLang } from "@/lib/i18n";
import { primaryButton } from "@/lib/styles";
import HeroTitle from "./HeroTitle";

// Una versión por cada ancho de HERO_WIDTHS; el plugin hero-preload precarga la misma desde el HTML.
const imagenes: Record<HeroLang, Record<HeroWidth, string>> = {
  es: { 800: hero800, 1040: hero1040, 1200: hero1200, 1700: hero },
  en: { 800: heroEn800, 1040: heroEn1040, 1200: heroEn1200, 1700: heroEn },
};
const srcSet = (lang: HeroLang) => HERO_WIDTHS.map((w) => `${imagenes[lang][w]} ${w}w`).join(", ");

const textos = {
  es: {
    bajada: HERO_BAJADA.es,
    demo: "Agenda una demo",
    precios: "Ver precios →",
    alt: "Nildu con la agenda de octubre, el panel de control, la ficha de Canelo, su curva de peso y sus archivos",
  },
  en: {
    bajada: HERO_BAJADA.en,
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
          <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl sm:leading-none lg:text-[4.5rem]">
            <HeroTitle />
          </h1>
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
