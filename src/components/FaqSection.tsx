import { useLang } from "@/lib/i18n";

const textos = {
  es: {
    titulo: "Preguntas frecuentes",
    preguntas: [
      { p: "¿Tengo que instalar algo?", r: "No. Nildu funciona en el navegador, en computadora, tablet o celular." },
      {
        p: "¿Qué necesito para la factura electrónica?",
        r: "Tu llave criptográfica de Hacienda (archivo .p12) con su PIN, y tu usuario y contraseña de Hacienda.",
      },
      { p: "¿Está disponible en otros idiomas?", r: "Sí. Por el momento, en español e inglés." },
      { p: "¿Cómo empiezo?", r: "Solicitas la demo y el equipo de Nildu configura tu veterinaria." },
    ],
  },
  en: {
    titulo: "Frequently asked questions",
    preguntas: [
      { p: "Do I need to install anything?", r: "No. Nildu runs in the browser, on a computer, tablet or phone." },
      {
        p: "What do I need for electronic invoicing?",
        r: "Your Hacienda cryptographic key (.p12 file) with its PIN, plus your Hacienda username and password. This applies only in Costa Rica.",
      },
      { p: "Is it available in other languages?", r: "Yes. For now, in Spanish and English." },
      { p: "How do I get started?", r: "Request a demo and the Nildu team sets up your practice." },
    ],
  },
};

const FaqSection = () => {
  const [lang] = useLang();
  const t = textos[lang];

  return (
    <section className="py-20">
      <div className="mx-auto max-w-page px-4 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight">{t.titulo}</h2>
        <div className="mt-10 max-w-3xl divide-y divide-line border-y border-line">
          {t.preguntas.map((q) => (
            <details key={q.p} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-medium [&::-webkit-details-marker]:hidden">
                {q.p}
                <span aria-hidden="true" className="text-xl leading-none text-ink group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl leading-relaxed text-ink">{q.r}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
