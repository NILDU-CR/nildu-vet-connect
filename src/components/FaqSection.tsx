const preguntas = [
  { p: "¿Tengo que instalar algo?", r: "No. Nildu funciona en el navegador, en computadora, tablet o celular." },
  {
    p: "¿Qué necesito para la factura electrónica?",
    r: "Tu llave criptográfica de Hacienda (archivo .p12) con su PIN, y tu usuario y contraseña de Hacienda.",
  },
  { p: "¿Está en inglés?", r: "Sí, el sistema está en español y en inglés." },
  { p: "¿Cómo empiezo?", r: "Solicitas la demo y el equipo de Nildu configura tu clínica." },
];

const FaqSection = () => (
  <section className="py-20">
    <div className="mx-auto max-w-page px-4 sm:px-6">
      <h2 className="text-3xl font-semibold tracking-tight">Preguntas frecuentes</h2>
      <div className="mt-10 max-w-3xl divide-y divide-line border-y border-line">
        {preguntas.map((q) => (
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

export default FaqSection;
