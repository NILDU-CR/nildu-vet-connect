import { Suspense, lazy, useEffect, useState } from "react";
import type { ComponentType } from "react";
import Index from "./pages/Index";
import ComingSoon from "./pages/ComingSoon";
import { LangContext, guardarIdioma, idiomaInicial } from "./lib/i18n";
import type { Lang } from "./lib/i18n";

// Las páginas sueltas van en su propio archivo JS: la landing no las usa y así baja menos JS al cargar.
// El "Próximamente" no, porque es lo que muestra nildu.com y no debe esperar una segunda descarga.
const Ayuda = lazy(() => import("./pages/Ayuda"));
const Terminos = lazy(() => import("./pages/Terminos"));
const Privacidad = lazy(() => import("./pages/Privacidad"));

// Con VITE_COMING_SOON=1, nildu.com y www.nildu.com muestran solo "Próximamente"; la URL de
// Vercel (*.vercel.app) y localhost muestran la landing completa para revisarla antes del lanzamiento.
const comingSoon = import.meta.env.VITE_COMING_SOON === "1" && location.hostname.endsWith("nildu.com");

// Durante el "Próximamente" todo el sitio, páginas sueltas incluidas, muestra solo "Próximamente".
// En Vercel, /terms, /privacy y /help redirigen a su nombre en español (vercel.json); aquí se aceptan para el servidor local.
const paginas: Record<string, ComponentType> = { "/ayuda": Ayuda, "/help": Ayuda, "/terminos": Terminos, "/terms": Terminos, "/privacidad": Privacidad, "/privacy": Privacidad };
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
      <Suspense fallback={null}>
        <Pagina />
      </Suspense>
    </LangContext.Provider>
  );
};

export default App;
