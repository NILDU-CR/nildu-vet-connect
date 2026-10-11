import FaqSection from "@/components/FaqSection";
import PageShell from "@/components/PageShell";
import { WhatsAppIcon } from "@/components/Icons";
import { correoSoporte, telefonoWhatsApp, whatsappUrl } from "@/lib/contact";

const tarjeta = "block rounded-lg border border-line bg-white p-6 hover:border-navy";

const Ayuda = () => (
  <PageShell title="Ayuda">
    <section className="bg-mist py-16">
      <div className="mx-auto max-w-page px-4 sm:px-6">
        <h1 className="text-4xl font-semibold tracking-tight">Ayuda</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink">
          ¿Tienes una duda o algo no funciona como esperabas? Escribe al equipo de Nildu por el canal que prefieras.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <a href={whatsappUrl("Hola, necesito ayuda con Nildu.")} target="_blank" rel="noopener noreferrer" className={tarjeta}>
            <WhatsAppIcon className="h-6 w-6 text-[#25D366]" />
            <p className="mt-4 font-semibold">WhatsApp</p>
            <p className="mt-1 text-ink">{telefonoWhatsApp}</p>
          </a>
          <a href={`mailto:${correoSoporte}`} className={tarjeta}>
            <span aria-hidden="true" className="text-2xl leading-none text-brand">
              @
            </span>
            <p className="mt-4 font-semibold">Correo</p>
            <p className="mt-1 text-ink">{correoSoporte}</p>
          </a>
          <a href="https://nildu.app" className={tarjeta}>
            <span aria-hidden="true" className="text-2xl leading-none text-brand">
              →
            </span>
            <p className="mt-4 font-semibold">Iniciar sesión</p>
            <p className="mt-1 text-ink">Entra a tu clínica en nildu.app</p>
          </a>
        </div>
      </div>
    </section>
    <FaqSection />
  </PageShell>
);

export default Ayuda;
