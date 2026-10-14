import { whatsappUrl } from "@/lib/contact";
import { useLang } from "@/lib/i18n";
import { WhatsAppIcon } from "./Icons";

const textos = {
  es: { mensaje: "Hola, quiero información sobre Nildu.", etiqueta: "Escribir por WhatsApp" },
  en: { mensaje: "Hi, I'd like information about Nildu.", etiqueta: "Message us on WhatsApp" },
};

// Botón flotante en la esquina inferior derecha, visible en toda la landing.
const WhatsAppButton = () => {
  const [lang] = useLang();
  const t = textos[lang];

  return (
    <a
      href={whatsappUrl(t.mensaje)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.etiqueta}
      title={t.etiqueta}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_6px_20px_rgba(23,44,68,0.3)] transition-transform hover:scale-105"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
};

export default WhatsAppButton;
