import hero from "@/assets/screens/hero/hero.webp";
import hero800 from "@/assets/screens/hero/hero-800.webp";
import hero1200 from "@/assets/screens/hero/hero-1200.webp";
import heroEn from "@/assets/screens/hero/hero-en.webp";
import heroEn800 from "@/assets/screens/hero/hero-en-800.webp";
import heroEn1200 from "@/assets/screens/hero/hero-en-1200.webp";
import { useLang } from "@/lib/i18n";
import { primaryButton } from "@/lib/styles";

const textos = {
  es: {
    etiqueta: "SOFTWARE PARA VETERINARIAS",
    titulo: "La consulta, la agenda y la factura de tu veterinaria, en un mismo sistema.",
    bajada: "Registras la consulta, aplicas la vacuna y cobras desde el mismo expediente. La factura electrónica sale hacia Hacienda sin pasar por otro programa.",
    demo: "Agenda una demo",
    precios: "Ver precios →",
    alt: "Nildu con la agenda de octubre, el panel de control, la ficha de Canelo, su curva de peso y sus archivos",
    img: [hero, hero800, hero1200],
  },
  en: {
    etiqueta: "SOFTWARE FOR VETERINARY PRACTICES",
    titulo: "Your practice's visits, appointments and invoices, in one system.",
    bajada: "Record the visit, give the vaccine and charge from the same patient record. Electronic invoices go to Hacienda without another program.",
    demo: "Book a demo",
    precios: "See pricing →",
    alt: "Nildu with the October schedule, the dashboard, Canelo's record, his weight curve and his files",
    img: [heroEn, heroEn800, heroEn1200],
  },
};

const HeroSection = () => {
  const [lang] = useLang();
  const t = textos[lang];
  const [grande, de800, de1200] = t.img;

  return (
    <section id="inicio" className="scroll-mt-20">
      <div className="mx-auto max-w-page px-4 pb-20 pt-16 sm:px-6 md:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium tracking-[0.12em] text-brand">{t.etiqueta}</p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.5rem]">{t.titulo}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink">{t.bajada}</p>
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
          src={grande}
          srcSet={`${de800} 800w, ${de1200} 1200w, ${grande} 1700w`}
          sizes="(min-width: 1088px) 1040px, calc(100vw - 32px)"
          fetchPriority="high"
          alt={t.alt}
          width={1700}
          height={1021}
          className="mx-auto mt-14 block h-auto w-full max-w-[1040px]"
        />
      </div>
    </section>
  );
};

export default HeroSection;
