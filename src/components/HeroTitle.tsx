import { useLang } from "@/lib/i18n";
import Puntos from "./Puntos";

// El título de la landing, que también usa "Próximamente". La palabra clave va en el morado de marca; los puntos de
// las "i" en celeste y el punto final en anaranjado, como en el logo (Puntos).
const HeroTitle = () => {
  const [lang] = useLang();

  return lang === "en" ? (
    <>
      Your{" "}
      <span className="text-brand">
        <Puntos texto="vet clinic" />
      </span>{" "}
      <Puntos texto="in one system." />
    </>
  ) : (
    <>
      Tu{" "}
      <span className="text-brand">
        <Puntos texto="veterinaria" />
      </span>{" "}
      <Puntos texto="en un solo sistema." />
    </>
  );
};

export default HeroTitle;
