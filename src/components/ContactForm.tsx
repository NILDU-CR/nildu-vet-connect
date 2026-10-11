import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { correoSoporte, telefonoWhatsApp, whatsappUrl } from "@/lib/contact";
import { useLang } from "@/lib/i18n";
import { submitLead } from "@/lib/lead";
import type { LeadFields } from "@/lib/lead";
import { primaryButton } from "@/lib/styles";
import Captcha from "./Captcha";
import { WhatsAppIcon } from "./Icons";

type Status = "idle" | "sending" | "ok" | "error" | "sin-captcha";

const empty: LeadFields = { nombre: "", correo: "", telefono: "", veterinaria: "", botcheck: "", captcha: "" };
const accessKey = import.meta.env.VITE_WEB3FORMS_KEY ?? "";

const enlace = "font-medium text-brand underline underline-offset-2";

const textos = {
  es: {
    titulo: "Solicita una demo",
    texto: "Completa el formulario y el equipo de Nildu te contactará para mostrarte el sistema. Si prefieres, escríbenos directo:",
    campos: { nombre: "Nombre", correo: "Correo", telefono: "Teléfono", veterinaria: "Nombre de la veterinaria" },
    waTexto: "Hola, quiero agendar una demo de Nildu.",
    escribe: (correo: ReactNode, wa: ReactNode) => (
      <>
        escribe a {correo} o por {wa}
      </>
    ),
    ok: "¡Listo! Has enviado tu solicitud. El equipo de Nildu te contactará pronto.",
    sinLlave: "Para solicitar una demo,",
    sinCaptcha: "Completa la verificación antes de enviar.",
    error: "¡Ups! No se pudo enviar. Para no perder tu solicitud,",
    captchaFallo: "No se pudo cargar la verificación. Puedes",
    enviando: "Enviando…",
    demo: "Agenda una demo",
    privacidad: "Nildu usa tus datos solo para contactarte sobre la demo. Lee la",
    politica: "política de privacidad",
  },
  en: {
    titulo: "Request a demo",
    texto: "Fill in the form and the Nildu team will contact you to show you the system. Or write to us directly:",
    campos: { nombre: "Name", correo: "Email", telefono: "Phone", veterinaria: "Practice name" },
    waTexto: "Hi, I'd like to book a Nildu demo.",
    escribe: (correo: ReactNode, wa: ReactNode) => (
      <>
        email {correo} or message us on {wa}
      </>
    ),
    ok: "Done! Your request has been sent. The Nildu team will contact you soon.",
    sinLlave: "To request a demo,",
    sinCaptcha: "Complete the verification before sending.",
    error: "Oops! It couldn't be sent. So your request isn't lost,",
    captchaFallo: "The verification couldn't load. You can",
    enviando: "Sending…",
    demo: "Book a demo",
    privacidad: "Nildu uses your data only to contact you about the demo. Read the",
    politica: "privacy policy",
  },
};

const campos = [
  { name: "nombre", type: "text", autoComplete: "name" },
  { name: "correo", type: "email", autoComplete: "email" },
  { name: "telefono", type: "tel", autoComplete: "tel" },
  { name: "veterinaria", type: "text", autoComplete: "organization" },
] as const;

const ContactForm = () => {
  const [values, setValues] = useState<LeadFields>(empty);
  const [status, setStatus] = useState<Status>("idle");
  const [captcha, setCaptcha] = useState("");
  // Cada token de hCaptcha sirve una sola vez: tras un error se vuelve a montar el widget.
  const [captchaKey, setCaptchaKey] = useState(0);
  // hCaptcha pesa ~100 KB: se carga cuando la persona entra al formulario, no con la página.
  const [enUso, setEnUso] = useState(false);
  const okRef = useRef<HTMLParagraphElement>(null);
  const [lang] = useLang();
  const t = textos[lang];

  const whatsapp = whatsappUrl(t.waTexto);
  const correo = (
    <a href={`mailto:${correoSoporte}`} className={enlace}>
      {correoSoporte}
    </a>
  );
  const wa = (
    <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={enlace}>
      WhatsApp
    </a>
  );
  const escribe = t.escribe(correo, wa);

  useEffect(() => {
    if (status === "ok") okRef.current?.focus();
  }, [status]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    if (!captcha) {
      setStatus("sin-captcha");
      return;
    }
    setStatus("sending");
    const result = await submitLead({ ...values, captcha }, accessKey, fetch);
    if (result === "ok") {
      setValues(empty);
      setStatus("ok");
    } else {
      // En error se conservan los datos para que la persona no tenga que reescribirlos.
      setStatus("error");
      setCaptcha("");
      setCaptchaKey((k) => k + 1);
    }
  };

  return (
    <section id="contacto" className="scroll-mt-20 bg-mist py-20">
      <div className="mx-auto grid max-w-page gap-10 px-4 sm:px-6 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">{t.titulo}</h2>
          <p className="mt-4 max-w-md leading-relaxed text-ink">{t.texto}</p>
          <ul role="list" className="mt-6 space-y-3">
            <li>
              <a href={`mailto:${correoSoporte}`} className="inline-flex items-center gap-3 font-medium text-navy hover:text-brand">
                <span aria-hidden="true" className="w-5 text-center text-xl leading-none text-brand">
                  @
                </span>
                {correoSoporte}
              </a>
            </li>
            <li>
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 font-medium text-navy hover:text-brand">
                <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
                WhatsApp {telefonoWhatsApp}
              </a>
            </li>
          </ul>
        </div>

        {status === "ok" ? (
          <p ref={okRef} tabIndex={-1} role="status" className="self-start rounded-lg border border-line bg-white p-6 focus:outline-none">
            {t.ok}
          </p>
        ) : !accessKey ? (
          <p className="self-start rounded-lg border border-line bg-white p-6">
            {t.sinLlave} {escribe}.
          </p>
        ) : (
          <form onSubmit={onSubmit} onFocus={() => setEnUso(true)} className="grid gap-4 rounded-lg border border-line bg-white p-6">
            {campos.map((c) => (
              <div key={c.name}>
                <label htmlFor={c.name} className="block text-sm font-medium">
                  {t.campos[c.name]}
                </label>
                <input
                  id={c.name}
                  name={c.name}
                  type={c.type}
                  autoComplete={c.autoComplete}
                  required
                  value={values[c.name]}
                  onChange={(e) => setValues({ ...values, [c.name]: e.target.value })}
                  className="mt-1 w-full rounded-md border border-ink/70 px-3 py-2 text-navy focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>
            ))}
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
              checked={values.botcheck !== ""}
              onChange={(e) => setValues({ ...values, botcheck: e.target.checked ? "1" : "" })}
            />
            {enUso ? (
              <Captcha
                key={`${lang}-${captchaKey}`}
                onToken={setCaptcha}
                fallback={
                  <>
                    {t.captchaFallo} {escribe}.
                  </>
                }
              />
            ) : (
              <div className="min-h-[78px]" />
            )}
            {status === "sin-captcha" && (
              <p role="alert" className="text-sm text-red-700">
                {t.sinCaptcha}
              </p>
            )}
            {status === "error" && (
              <p role="alert" className="text-sm text-red-700">
                {t.error} {escribe}.
              </p>
            )}
            <button type="submit" disabled={status === "sending"} className={`${primaryButton} disabled:opacity-60`}>
              {status === "sending" ? t.enviando : t.demo}
            </button>
            <p className="text-xs text-ink">
              {t.privacidad}{" "}
              <a href="/privacidad" className="underline underline-offset-2 hover:text-navy">
                {t.politica}
              </a>
              .
            </p>
          </form>
        )}
      </div>
    </section>
  );
};

export default ContactForm;
