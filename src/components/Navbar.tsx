import { useState } from "react";
import wordmark from "@/assets/brand/wordmark.png";
import { whatsappUrl } from "@/lib/contact";
import { primaryButton } from "@/lib/styles";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "./Icons";

const links = [
  { href: "#funciones", label: "Funciones" },
  { href: "#precios", label: "Precios" },
  { href: "#contacto", label: "Contacto" },
];

const whatsapp = whatsappUrl("Hola, quiero información sobre Nildu.");

const entrar = "rounded-md border border-line px-4 py-2 text-sm font-medium text-navy hover:border-navy";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <nav aria-label="Principal" className="mx-auto flex h-16 max-w-page items-center justify-between px-4 sm:px-6">
        <a href="#inicio" className="shrink-0">
          <img src={wordmark} alt="Nildu" className="h-7 w-auto" />
        </a>
        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-ink hover:text-navy">
              {l.label}
            </a>
          ))}
          <a href="https://nildu.app" className={entrar}>
            Iniciar sesión
          </a>
          <a href="#contacto" className={`${primaryButton} !px-4 !py-2 text-sm`}>
            Agenda una demo
          </a>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Escribir por WhatsApp" title="WhatsApp" className="rounded-md border border-line p-2 hover:border-navy">
            <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
          </a>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Escribir por WhatsApp" className="rounded-md p-2">
            <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
          </a>
          <a href="https://nildu.app" className={entrar}>
            Iniciar sesión
          </a>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="rounded-md p-2 text-navy"
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      {open && (
        <div id="menu-movil" className="border-t border-line lg:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block px-4 py-3 text-ink hover:bg-mist">
              {l.label}
            </a>
          ))}
          <div className="px-4 py-3">
            <a href="#contacto" onClick={() => setOpen(false)} className={`${primaryButton} w-full text-center`}>
              Agenda una demo
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
