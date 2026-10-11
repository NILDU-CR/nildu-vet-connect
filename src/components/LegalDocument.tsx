import PageShell from "./PageShell";

export type Seccion = { titulo: string; parrafos: string[] };

type LegalDocumentProps = { titulo: string; actualizado: string; intro: string; secciones: Seccion[] };

// Texto legal largo (términos, privacidad): título, fecha de la versión y secciones numeradas.
const LegalDocument = ({ titulo, actualizado, intro, secciones }: LegalDocumentProps) => (
  <PageShell title={titulo}>
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-semibold tracking-tight">{titulo}</h1>
      <p className="mt-3 text-sm text-ink">Última actualización: {actualizado}</p>
      <p className="mt-8 leading-relaxed text-ink">{intro}</p>
      {secciones.map((s) => (
        <section key={s.titulo} className="mt-10">
          <h2 className="text-xl font-semibold">{s.titulo}</h2>
          {s.parrafos.map((p) => (
            <p key={p} className="mt-3 leading-relaxed text-ink">
              {p}
            </p>
          ))}
        </section>
      ))}
    </article>
  </PageShell>
);

export default LegalDocument;
