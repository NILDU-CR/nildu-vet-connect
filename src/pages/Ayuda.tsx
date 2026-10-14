import FaqSection from "@/components/FaqSection";
import PageShell from "@/components/PageShell";
import { WhatsAppIcon } from "@/components/Icons";
import { correoSoporte, telefonoWhatsApp, whatsappUrl } from "@/lib/contact";
import { useLang } from "@/lib/i18n";

const tarjeta = "block rounded-lg border border-line bg-white p-6 hover:border-navy";

const textos = {
  es: {
    titulo: "Ayuda",
    texto: "¿Tienes una duda o algo no funciona como esperabas? Escribe al equipo de Nildu por el canal que prefieras.",
    waTexto: "Hola, necesito ayuda con Nildu.",
    correo: "Correo",
    entrar: "Iniciar sesión",
    entrarTexto: "Entra a tu veterinaria en nildu.app",
  },
  en: {
    titulo: "Help",
    texto: "Have a question or is something not working as expected? Write to the Nildu team on whichever channel you prefer.",
    waTexto: "Hi, I need help with Nildu.",
    correo: "Email",
    entrar: "Log in",
    entrarTexto: "Go to your practice at nildu.app",
  },
};

const Ayuda = () => {
  const [lang] = useLang();
  const t = textos[lang];

  return (
    <PageShell title={t.titulo}>
      <section className="bg-mist py-16">
        <div className="mx-auto max-w-page px-4 sm:px-6">
          <h1 className="text-4xl font-semibold tracking-tight">{t.titulo}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink">{t.texto}</p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <a href={whatsappUrl(t.waTexto)} target="_blank" rel="noopener noreferrer" className={tarjeta}>
              <WhatsAppIcon className="h-6 w-6 text-[#25D366]" />
              <p className="mt-4 font-semibold">WhatsApp</p>
              <p className="mt-1 text-ink">{telefonoWhatsApp}</p>
            </a>
            <a href={`mailto:${correoSoporte}`} className={tarjeta}>
              <span aria-hidden="true" className="text-2xl leading-none text-brand">
                @
              </span>
              <p className="mt-4 font-semibold">{t.correo}</p>
              <p className="mt-1 text-ink">{correoSoporte}</p>
            </a>
            <a href="https://nildu.app" className={tarjeta}>
              <span aria-hidden="true" className="text-2xl leading-none text-brand">
                →
              </span>
              <p className="mt-4 font-semibold">{t.entrar}</p>
              <p className="mt-1 text-ink">{t.entrarTexto}</p>
            </a>
          </div>
        </div>
      </section>
      <FaqSection />
    </PageShell>
  );
};

export default Ayuda;
