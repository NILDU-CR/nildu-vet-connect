import { createContext, useContext } from "react";

export type Lang = "es" | "en";

const esLang = (v: string | null): v is Lang => v === "es" || v === "en";

// Orden: ?lang= en la URL (para compartir el enlace en inglés), lo elegido antes en este navegador, y si no,
// el idioma del navegador (español salvo que sea inglés).
export function idiomaInicial(): Lang {
  const param = new URLSearchParams(location.search).get("lang");
  if (esLang(param)) {
    guardarIdioma(param);
    return param;
  }
  try {
    const guardado = localStorage.getItem("lang");
    if (esLang(guardado)) return guardado;
  } catch {
    // Almacenamiento bloqueado: se usa el del navegador.
  }
  return navigator.language.toLowerCase().startsWith("en") ? "en" : "es";
}

export function guardarIdioma(lang: Lang) {
  try {
    localStorage.setItem("lang", lang);
  } catch {
    // Sin almacenamiento, la elección dura hasta recargar.
  }
}

export const LangContext = createContext<[Lang, (lang: Lang) => void]>(["es", () => {}]);
export const useLang = () => useContext(LangContext);
