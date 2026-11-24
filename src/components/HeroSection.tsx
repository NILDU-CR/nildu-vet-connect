import hero from "@/assets/screens/hero/hero.webp";
import hero800 from "@/assets/screens/hero/hero-800.webp";
import hero1200 from "@/assets/screens/hero/hero-1200.webp";
import heroEn from "@/assets/screens/hero/hero-en.webp";
import heroEn800 from "@/assets/screens/hero/hero-en-800.webp";
import heroEn1200 from "@/assets/screens/hero/hero-en-1200.webp";
import { useLang } from "@/lib/i18n";
import { primaryButton } from "@/lib/styles";

// La palabra clave del título va en el morado de marca, y los puntos de sus íes en los colores de los puntos del logo.
const acento = "text-brand";
// Pinta solo el punto de una "i": un degradado con corte seco recortado a la letra. El corte al 33% cae en el hueco
// entre el punto y el palo de la "i" de Poppins 600 (el punto va del 19% al 31% de la caja y el palo empieza en el 35%).
// Con otra tipografía o peso hay que volver a medirlo. El palo toma el color de la palabra (currentColor).
const puntoI = "bg-clip-text [-webkit-text-fill-color:transparent] [print-color-adjust:exact]";
const iCeleste = `${puntoI} bg-[linear-gradient(theme(colors.dot.cyan)_33%,currentColor_33%)]`;
const iNaranja = `${puntoI} bg-[linear-gradient(theme(colors.dot.gold)_33%,currentColor_33%)]`;

const textos = {
  es: {
    titulo: (
      <>
        Tu{" "}
        <span className={acento}>
          veter<span className={iCeleste}>i</span>nar<span className={iNaranja}>i</span>a
        </span>{" "}
        en un solo sistema.
      </>
    ),
    bajada: "Sin papeleo y todo a un clic: registras la visita, aplicas la vacuna y cobras desde el expediente, estés donde estés.",
    demo: "Agenda una demo",
    precios: "Ver precios →",
    alt: "Nildu con la agenda de octubre, el panel de control, la ficha de Canelo, su curva de peso y sus archivos",
    img: [hero, hero800, hero1200],
  },
  en: {
    titulo: (
      <>
        Your{" "}
        <span className={acento}>
          vet pract<span className={iCeleste}>i</span>ce
        </span>{" "}
        in one system.
      </>
    ),
    bajada: "No paperwork and everything one click away: record the visit, give the vaccine and charge from the patient's record, wherever you are.",
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
