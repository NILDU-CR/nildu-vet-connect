import { useEffect, useState } from "react";
import Index from "./pages/Index";
import ComingSoon from "./pages/ComingSoon";
import Ayuda from "./pages/Ayuda";
import Terminos from "./pages/Terminos";
import Privacidad from "./pages/Privacidad";
import { LangContext, guardarIdioma, idiomaInicial } from "./lib/i18n";
import type { Lang } from "./lib/i18n";

// Con VITE_COMING_SOON=1, nildu.com y www.nildu.com muestran solo "Próximamente"; la URL de
// Vercel (*.vercel.app) y localhost muestran la landing completa para revisarla antes del lanzamiento.
const comingSoon = import.meta.env.VITE_COMING_SOON === "1" && location.hostname.endsWith("nildu.com");

// Durante el "Próximamente" todo el sitio, páginas sueltas incluidas, muestra solo "Próximamente".
// En Vercel, /terms, /privacy y /help redirigen a su nombre en español (vercel.json); aquí se aceptan para el servidor local.
const paginas: Record<string, () => JSX.Element> = { "/ayuda": Ayuda, "/help": Ayuda, "/terminos": Terminos, "/terms": Terminos, "/privacidad": Privacidad, "/privacy": Privacidad };
const Pagina = comingSoon ? ComingSoon : paginas[location.pathname.replace(/\/$/, "")] ?? Index;

const App = () => {
  const [lang, setLang] = useState(idiomaInicial);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const cambiar = (l: Lang) => {
    setLang(l);
    guardarIdioma(l);
  };

  return (
    <LangContext.Provider value={[lang, cambiar]}>
      <Pagina />
    </LangContext.Provider>
  );
};

export default App;
