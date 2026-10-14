import { useState } from "react";
import wordmark from "@/assets/brand/wordmark.png";
import { useLang } from "@/lib/i18n";
import { primaryButton } from "@/lib/styles";
import { CloseIcon, MenuIcon } from "./Icons";
import LangToggle from "./LangToggle";

const textos = {
  es: {
    nav: "Principal",
    links: [
      { href: "#funciones", label: "Funciones" },
      { href: "#precios", label: "Precios" },
      { href: "#contacto", label: "Contacto" },
      { href: "/ayuda", label: "Ayuda" },
    ],
    entrar: "Iniciar sesión",
    demo: "Agenda una demo",
    abrir: "Abrir menú",
    cerrar: "Cerrar menú",
  },
  en: {
    nav: "Main",
    links: [
      { href: "#funciones", label: "Features" },
      { href: "#precios", label: "Pricing" },
      { href: "#contacto", label: "Contact" },
      { href: "/ayuda", label: "Help" },
    ],
    entrar: "Log in",
    demo: "Book a demo",
    abrir: "Open menu",
    cerrar: "Close menu",
  },
};

const entrar = "rounded-md border border-line px-4 py-2 text-sm font-medium text-navy hover:border-navy";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [lang] = useLang();
  const t = textos[lang];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <nav aria-label={t.nav} className="mx-auto flex h-16 max-w-page items-center justify-between px-4 sm:px-6">
        <a href="#inicio" className="shrink-0">
          <img src={wordmark} alt="Nildu" width={241} height={84} className="h-7 w-auto" />
        </a>
        <div className="hidden items-center gap-8 lg:flex">
          {t.links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-ink hover:text-navy">
              {l.label}
            </a>
          ))}
          <LangToggle />
          <a href="https://nildu.app" className={entrar}>
            {t.entrar}
          </a>
          <a href="#contacto" className={`${primaryButton} !px-4 !py-2 text-sm`}>
            {t.demo}
          </a>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <LangToggle />
          <a href="https://nildu.app" className={entrar}>
            {t.entrar}
          </a>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? t.cerrar : t.abrir}
            className="rounded-md p-2 text-navy"
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      {open && (
        <div id="menu-movil" className="border-t border-line lg:hidden">
          {t.links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block px-4 py-3 text-ink hover:bg-mist">
              {l.label}
            </a>
          ))}
          <div className="px-4 py-3">
            <a href="#contacto" onClick={() => setOpen(false)} className={`${primaryButton} w-full text-center`}>
              {t.demo}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
