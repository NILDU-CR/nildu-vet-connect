import hero from "@/assets/screens/hero/hero.webp";
import { primaryButton } from "@/lib/styles";

const HeroSection = () => (
  <section id="inicio" className="scroll-mt-20">
    <div className="mx-auto max-w-page px-4 pb-20 pt-16 sm:px-6 md:pt-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-medium tracking-[0.12em] text-brand">SOFTWARE PARA VETERINARIAS</p>
        <h1 className="mt-4 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.5rem]">
          La consulta, la agenda y la factura de tu veterinaria, en un mismo sistema.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink">
          Registras la consulta, aplicas la vacuna y cobras desde el mismo expediente. La factura electrónica sale hacia Hacienda sin pasar por otro programa.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          <a href="#contacto" className={primaryButton}>
            Agenda una demo
          </a>
          <a href="#precios" className="font-medium text-navy hover:text-brand">
            Ver precios →
          </a>
        </div>
      </div>

      <img
        src={hero}
        alt="Nildu con la agenda de octubre, el panel de control, la ficha de Canelo, su curva de peso y sus archivos"
        width={1700}
        height={1038}
        className="mx-auto mt-14 block h-auto w-full max-w-[1040px]"
      />
    </div>
  </section>
);

export default HeroSection;
