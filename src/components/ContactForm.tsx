import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { correoInfo, telefonoWhatsApp, whatsappUrl } from "@/lib/contact";
import { countryOptions } from "@/lib/countries";
import { useLang } from "@/lib/i18n";
import { submitLead } from "@/lib/lead";
import type { LeadFields } from "@/lib/lead";
import type { PlanElegido } from "@/lib/pricing";
import { primaryButton } from "@/lib/styles";
import Captcha from "./Captcha";
import { WhatsAppIcon } from "./Icons";

type Status = "idle" | "sending" | "ok" | "error" | "sin-captcha";

// El país arranca en Costa Rica, el mercado principal; el valor es el nombre en español, como en countryOptions.
const inicial: LeadFields = { nombre: "", apellido: "", correo: "", telefono: "", veterinaria: "", pais: "Costa Rica", botcheck: "", captcha: "" };
const accessKey = import.meta.env.VITE_WEB3FORMS_KEY ?? "";

const enlace = "font-medium text-brand underline underline-offset-2";
const campoClase = "mt-1 w-full rounded-md border border-ink/70 bg-white px-3 py-2 text-navy focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand";

const textos = {
  es: {
    titulo: "Solicita una demo",
    texto: "Completa el formulario y el equipo de Nildu te contactará para mostrarte el sistema. Si prefieres, escríbenos directo:",
    campos: { nombre: "Nombre", apellido: "Apellido", correo: "Correo", telefono: "Teléfono", veterinaria: "Nombre de la veterinaria", pais: "País" },
    eligePais: "Selecciona un país",
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
    acepto: "Al solicitar tu demo, aceptas la",
    politica: "política de privacidad",
    aceptoFin: "y que Nildu use tus datos para contactarte.",
    ejemploCorreo: "correo@vet.com",
    aviso: {
      vacio: "Completa este campo.",
      correo: "Escribe un correo válido, por ejemplo correo@vet.com.",
      pais: "Selecciona un país.",
    },
  },
  en: {
    titulo: "Request a demo",
    texto: "Fill in the form and the Nildu team will contact you to show you the system. Or write to us directly:",
    campos: { nombre: "First name", apellido: "Last name", correo: "Email", telefono: "Phone", veterinaria: "Veterinary clinic name", pais: "Country" },
    eligePais: "Select a country",
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
    acepto: "By requesting your demo, you accept the",
    politica: "privacy policy",
    aceptoFin: "and agree that Nildu may use your data to contact you.",
    ejemploCorreo: "name@vet.com",
    aviso: {
      vacio: "Please fill in this field.",
      correo: "Enter a valid email, for example name@vet.com.",
      pais: "Select a country.",
    },
  },
};

// Nombre y apellido van en una fila, correo y teléfono en otra; la veterinaria y el país, solos.
const filaNombre = [
  { name: "nombre", type: "text", autoComplete: "given-name" },
  { name: "apellido", type: "text", autoComplete: "family-name" },
] as const;

const filaContacto = [
  { name: "correo", type: "email", autoComplete: "email" },
  { name: "telefono", type: "tel", autoComplete: "tel" },
] as const;

const campos = [{ name: "veterinaria", type: "text", autoComplete: "organization" }] as const;

const filaDoble = "grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2";

// plan: lo que la persona armó en Precios (null si no tocó esa sección); se envía con la solicitud.
const ContactForm = ({ plan }: { plan: PlanElegido | null }) => {
  const [values, setValues] = useState<LeadFields>(inicial);
  const [status, setStatus] = useState<Status>("idle");
  const [captcha, setCaptcha] = useState("");
  // Cada token de hCaptcha sirve una sola vez: tras un error se vuelve a montar el widget.
  const [captchaKey, setCaptchaKey] = useState(0);
  // hCaptcha pesa ~100 KB: se carga cuando la persona entra al formulario, no con la página.
  const [enUso, setEnUso] = useState(false);
  const okRef = useRef<HTMLParagraphElement>(null);
  const [lang] = useLang();
  const t = textos[lang];

  // El navegador escribe sus avisos de validación en su propio idioma ("Please fill out this field"). Con
  // setCustomValidity se muestran en el idioma de la página; el aviso se borra en cuanto la persona corrige el campo.
  const validar = {
    onInvalid: (e: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
      const el = e.currentTarget;
      const { valueMissing, typeMismatch } = el.validity;
      const aviso = valueMissing && el instanceof HTMLSelectElement ? t.aviso.pais : typeMismatch ? t.aviso.correo : t.aviso.vacio;
      el.setCustomValidity(aviso);
    },
    onInput: (e: FormEvent<HTMLInputElement | HTMLSelectElement>) => e.currentTarget.setCustomValidity(""),
  };

  // min-w-0: dentro de la fila de dos columnas, el campo se encoge en vez de desbordar en celulares angostos.
  const campo = (c: (typeof filaNombre)[number] | (typeof filaContacto)[number] | (typeof campos)[number]) => (
    <div key={c.name} className="min-w-0">
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
        // Solo el correo lleva ejemplo: muestra el formato que se espera.
        placeholder={c.name === "correo" ? t.ejemploCorreo : undefined}
        {...validar}
        className={`${campoClase} placeholder:text-ink/50`}
      />
    </div>
  );
  const paises = useMemo(() => countryOptions(lang), [lang]);

  const whatsapp = whatsappUrl(t.waTexto);
  const correo = (
    <a href={`mailto:${correoInfo}`} className={enlace}>
      {correoInfo}
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
    const result = await submitLead({ ...values, captcha }, { idioma: lang, plan }, accessKey, fetch);
    if (result === "ok") {
      setValues(inicial);
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
              <a href={`mailto:${correoInfo}`} className="inline-flex items-center gap-3 font-medium text-navy hover:text-brand">
                <span aria-hidden="true" className="w-5 text-center text-xl leading-none text-brand">
                  @
                </span>
                {correoInfo}
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
            {/* Dos campos por fila solo si el formulario tiene espacio: en celular va uno por fila, y entre 768 y 1023 px
                el formulario comparte el ancho con el texto y también va uno por fila. */}
            <div className={filaDoble}>{filaNombre.map(campo)}</div>
            <div className={filaDoble}>{filaContacto.map(campo)}</div>
            {campos.map(campo)}
            <div>
              <label htmlFor="pais" className="block text-sm font-medium">
                {t.campos.pais}
              </label>
              <select
                id="pais"
                name="pais"
                autoComplete="country-name"
                required
                value={values.pais}
                onChange={(e) => setValues({ ...values, pais: e.target.value })}
                {...validar}
                className={campoClase}
              >
                <option value="" disabled>
                  {t.eligePais}
                </option>
                {paises.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
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
            {/* La verificación aparece cuando la persona empieza a llenar el formulario; antes no ocupa espacio. */}
            {enUso && (
              <Captcha
                key={`${lang}-${captchaKey}`}
                onToken={setCaptcha}
                fallback={
                  <>
                    {t.captchaFallo} {escribe}.
                  </>
                }
              />
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
            {/* Aviso de aceptación justo antes del botón, para leerlo antes de enviar: toda solicitud enviada acepta la
                política. El enlace abre en otra pestaña para no perder lo que la persona ya escribió. */}
            <p className="text-sm text-ink">
              {t.acepto}{" "}
              <a href="/privacidad" target="_blank" rel="noopener" className={enlace}>
                {t.politica}
              </a>{" "}
              {t.aceptoFin}
            </p>
            <button type="submit" disabled={status === "sending"} className={`${primaryButton} disabled:opacity-60`}>
              {status === "sending" ? t.enviando : t.demo}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ContactForm;
