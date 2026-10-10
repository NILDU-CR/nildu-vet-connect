import agendaMes from "@/assets/screens/hero/agenda-mes.webp";
import ficha from "@/assets/screens/hero/ficha.webp";
import peso from "@/assets/screens/hero/peso.webp";
import archivos from "@/assets/screens/hero/archivos.webp";
import citas from "@/assets/screens/hero/citas.webp";
import { primaryButton } from "@/lib/styles";
import BrowserFrame from "./BrowserFrame";
import { LoopArrow, Sparks } from "./Doodles";

// Recortes reales del portal que flotan sobre la agenda. Solo en md+; en celular se ve únicamente la agenda.
const flotante = "absolute hidden overflow-hidden rounded-xl border border-line bg-white shadow-[0_1px_2px_rgba(23,44,68,0.08),0_16px_40px_rgba(23,44,68,0.16)] md:block";

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

      <div className="mx-auto mt-14 max-w-[1040px] md:pb-24">
        <div className="relative md:mx-[11%]">
          <BrowserFrame src={agendaMes} alt="Agenda mensual de Nildu con las citas de dos consultorios" url="nildu.app" eager={true} width={1600} height={766} />
          {/* Posiciones en % del marco, según el boceto de Steve. */}
          <figure className={`${flotante} left-[6.5%] top-[64%] w-[16.7%]`}>
            <img src={ficha} alt="Ficha del paciente Canelo: especie, sexo, edad y peso" width={398} height={633} loading="lazy" decoding="async" className="block h-auto w-full" />
          </figure>
          <figure className={`${flotante} left-[34%] top-[61%] w-[36%]`}>
            <img src={citas} alt="Citas de Canelo con su dueña, filtradas por periodo" width={600} height={447} loading="lazy" decoding="async" className="block h-auto w-full" />
          </figure>
          <figure className={`${flotante} left-[78%] top-[53%] w-[32%]`}>
            <img src={peso} alt="Evolución del peso de Canelo con su curva" width={720} height={197} loading="lazy" decoding="async" className="block h-auto w-full" />
          </figure>
          <figure className={`${flotante} left-[80%] top-[76%] w-[30%]`}>
            <img src={archivos} alt="Archivos de Canelo: examen de sangre y radiografía" width={760} height={229} loading="lazy" decoding="async" className="block h-auto w-full" />
          </figure>
          <LoopArrow className="absolute bottom-[37%] left-[1%] hidden w-12 -scale-x-100 text-dot-cyan md:block lg:w-16" />
          <Sparks className="absolute bottom-[50%] left-[105%] hidden w-8 rotate-12 text-dot-gold md:block" />
          <Sparks className="absolute left-[104%] top-[95%] hidden w-8 text-dot-violet md:block" />
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
