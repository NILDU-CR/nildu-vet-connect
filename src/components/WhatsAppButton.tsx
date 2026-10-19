import { useEffect, useState } from "react";
import { whatsappUrl } from "@/lib/contact";
import { useLang } from "@/lib/i18n";
import { WhatsAppIcon } from "./Icons";

const textos = {
  es: { mensaje: "Hola, quiero información sobre Nildu.", etiqueta: "Escribir por WhatsApp" },
  en: { mensaje: "Hi, I'd like information about Nildu.", etiqueta: "Message us on WhatsApp" },
};

// Botón flotante en la esquina inferior derecha. En el celular tapaba el formulario y los montos de "Tu plan", así que
// se esconde mientras se ven Contacto y el pie (que ya muestran el WhatsApp) y la tarjeta de precio (que tiene su botón).
const WhatsAppButton = () => {
  const [lang] = useLang();
  const t = textos[lang];
  const [oculto, setOculto] = useState(false);

  useEffect(() => {
    const visibles = new Set<Element>();
    const io = new IntersectionObserver((entradas) => {
      for (const e of entradas) {
        if (e.isIntersecting) visibles.add(e.target);
        else visibles.delete(e.target);
      }
      setOculto(visibles.size > 0);
    });
    document.querySelectorAll("#contacto, footer, #tu-plan").forEach((zona) => io.observe(zona));
    return () => io.disconnect();
  }, []);

  return (
    <a
      href={whatsappUrl(t.mensaje)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.etiqueta}
      title={t.etiqueta}
      aria-hidden={oculto || undefined}
      tabIndex={oculto ? -1 : undefined}
      className={`fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_6px_20px_rgba(23,44,68,0.3)] transition-[opacity,transform] duration-200 hover:scale-105 motion-reduce:transition-none sm:bottom-5 sm:right-5 sm:h-14 sm:w-14 ${
        oculto ? "pointer-events-none translate-y-3 opacity-0" : ""
      }`}
    >
      <WhatsAppIcon className="h-6 w-6 sm:h-7 sm:w-7" />
    </a>
  );
};

export default WhatsAppButton;
