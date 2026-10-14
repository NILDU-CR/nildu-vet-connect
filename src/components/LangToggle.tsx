import { useLang } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";

const idiomas: { lang: Lang; corto: string; nombre: string }[] = [
  { lang: "es", corto: "ES", nombre: "Español" },
  { lang: "en", corto: "EN", nombre: "English" },
];

const LangToggle = () => {
  const [lang, setLang] = useLang();

  return (
    <div role="group" aria-label={lang === "en" ? "Language" : "Idioma"} className="flex rounded-md border border-line p-0.5 text-xs font-medium">
      {idiomas.map((i) => (
        <button
          key={i.lang}
          type="button"
          lang={i.lang}
          aria-label={i.nombre}
          aria-pressed={lang === i.lang}
          onClick={() => setLang(i.lang)}
          className={`rounded px-2 py-1 ${lang === i.lang ? "bg-navy text-white" : "text-ink hover:text-navy"}`}
        >
          {i.corto}
        </button>
      ))}
    </div>
  );
};

export default LangToggle;
