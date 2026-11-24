import { useLang } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";
import PageShell from "./PageShell";

// Un bloque de una sección: un párrafo, una lista o una tabla (proveedores, plazos de conservación).
export type Bloque = string | { lista: string[] } | { tabla: { columnas: string[]; filas: string[][] } };
export type Seccion = { titulo: string; contenido: Bloque[] };
// Las dos versiones de un documento deben tener las mismas secciones en el mismo orden: el índice enlaza por número.
export type Documento = { titulo: string; actualizado: string; intro: string[]; secciones: Seccion[] };

const etiquetas = {
  es: { actualizado: "Última actualización", contenido: "Contenido" },
  en: { actualizado: "Last updated", contenido: "Contents" },
};

// La versión en inglés es una traducción de referencia: el texto que vale es el español.
const avisoTraduccion =
  "Under the laws of Costa Rica, the Spanish version of this document is the official and legally binding one. This English translation is provided for reference only, to help you understand it; if the two versions differ, the Spanish version prevails.";

const idSeccion = (i: number) => `seccion-${i + 1}`;

// Dentro del texto, [palabras](/ruta) se vuelve un enlace sobre esas palabras, y los correos, enlaces mailto:. El
// dominio del correo exige un carácter después de cada punto, así el punto final de una oración no queda en el enlace.
const ENLACE_O_CORREO = /(\[[^\]]+\]\([^)\s]+\)|[\w.+-]+@[\w-]+(?:\.[\w-]+)+)/;
const ENLACE = /^\[([^\]]+)\]\(([^)\s]+)\)$/;
const claseEnlace = "font-medium text-brand underline underline-offset-2";

const Texto = ({ texto }: { texto: string }) => (
  <>
    {texto.split(ENLACE_O_CORREO).map((parte, i) => {
      if (i % 2 === 0) return parte;
      const enlace = ENLACE.exec(parte);
      return (
        <a key={i} href={enlace ? enlace[2] : `mailto:${parte}`} className={claseEnlace}>
          {enlace ? enlace[1] : parte}
        </a>
      );
    })}
  </>
);

const BloqueLegal = ({ bloque }: { bloque: Bloque }) => {
  if (typeof bloque === "string") {
    return (
      <p className="mt-3 leading-relaxed text-ink">
        <Texto texto={bloque} />
      </p>
    );
  }
  if ("lista" in bloque) {
    return (
      <ul role="list" className="mt-3 space-y-2">
        {bloque.lista.map((item) => (
          <li key={item} className="flex gap-3 leading-relaxed text-ink">
            <span aria-hidden="true" className="text-brand">
              —
            </span>
            <span>
              <Texto texto={item} />
            </span>
          </li>
        ))}
      </ul>
    );
  }
  const { columnas, filas } = bloque.tabla;
  return (
    // En celular la tabla se desplaza de lado dentro de su caja, sin mover la página.
    <div className="mt-4 overflow-x-auto rounded-lg border border-line">
      <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
        <thead className="bg-mist">
          <tr>
            {columnas.map((c) => (
              <th key={c} scope="col" className="px-4 py-2.5 font-semibold">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.map((fila) => (
            <tr key={fila.join("|")} className="border-t border-line align-top">
              {fila.map((celda, i) => (
                <td key={i} className="px-4 py-2.5 leading-relaxed text-ink">
                  <Texto texto={celda} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Texto legal largo (términos, privacidad): título, fecha de la versión, índice y secciones numeradas, en el idioma
// de la página. La versión en inglés lleva un aviso de que el texto que vale es el español.
const LegalDocument = ({ documento }: { documento: Record<Lang, Documento> }) => {
  const [lang] = useLang();
  const { titulo, actualizado, intro, secciones } = documento[lang];
  const t = etiquetas[lang];

  return (
    <PageShell title={titulo}>
      <article lang={lang} className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        {lang === "en" && <p className="mb-8 rounded-md border border-line bg-mist px-4 py-3 text-sm leading-relaxed text-ink">{avisoTraduccion}</p>}
        <h1 className="text-4xl font-semibold tracking-tight">{titulo}</h1>
        <p className="mt-3 text-sm text-ink">
          {t.actualizado}: {actualizado}
        </p>
        {intro.map((p) => (
          <p key={p} className="mt-6 leading-relaxed text-ink">
            <Texto texto={p} />
          </p>
        ))}
        <nav aria-label={t.contenido} className="mt-10 rounded-lg border border-line bg-mist p-5">
          <p className="text-sm font-semibold">{t.contenido}</p>
          {/* En dos columnas el índice se lee hacia abajo (1, 2, 3… en la primera), no por filas; break-inside-avoid
              evita que un título largo quede partido entre las dos columnas. */}
          <ol role="list" className="mt-3 gap-x-6 text-sm sm:columns-2">
            {secciones.map((s, i) => (
              <li key={s.titulo} className="mb-1.5 break-inside-avoid">
                <a href={`#${idSeccion(i)}`} className="text-ink hover:text-brand">
                  {s.titulo}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        {secciones.map((s, i) => (
          <section key={s.titulo} id={idSeccion(i)} aria-labelledby={`${idSeccion(i)}-titulo`} className="mt-12 scroll-mt-6">
            <h2 id={`${idSeccion(i)}-titulo`} className="text-xl font-semibold">
              {s.titulo}
            </h2>
            {s.contenido.map((b, j) => (
              <BloqueLegal key={j} bloque={b} />
            ))}
          </section>
        ))}
      </article>
    </PageShell>
  );
};

export default LegalDocument;
