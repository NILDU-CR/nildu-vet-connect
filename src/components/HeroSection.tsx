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
    titulo: "Tu veterinaria en un solo sistema.",
    bajada: "La consulta, la agenda y la factura en un mismo lugar: registras la visita, aplicas la vacuna y cobras desde el expediente. La factura electrónica va directo a Hacienda.",
    demo: "Agenda una demo",
    precios: "Ver precios →",
    alt: "Nildu con la agenda de octubre, el panel de control, la ficha de Canelo, su curva de peso y sus archivos",
    img: [hero, hero800, hero1200],
  },
  en: {
    titulo: "Your vet practice in one system.",
    bajada: "Visits, appointments and invoices in one place: record the visit, give the vaccine and charge from the patient's record. Electronic invoices go straight to Hacienda.",
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
          src={grande}
          srcSet={`${de800} 800w, ${de1200} 1200w, ${grande} 1700w`}
          sizes="(min-width: 1088px) 1040px, calc(100vw - 32px)"
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
