import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { submitLead } from "@/lib/lead";
import type { LeadFields } from "@/lib/lead";
import { primaryButton } from "@/lib/styles";
import Captcha from "./Captcha";

type Status = "idle" | "sending" | "ok" | "error" | "sin-captcha";

const empty: LeadFields = { nombre: "", correo: "", telefono: "", veterinaria: "", botcheck: "", captcha: "" };
const accessKey = import.meta.env.VITE_WEB3FORMS_KEY ?? "";

const campos = [
  { name: "nombre", label: "Nombre", type: "text", autoComplete: "name" },
  { name: "correo", label: "Correo", type: "email", autoComplete: "email" },
  { name: "telefono", label: "Teléfono", type: "tel", autoComplete: "tel" },
  { name: "veterinaria", label: "Nombre de la veterinaria", type: "text", autoComplete: "organization" },
] as const;

const correo = (
  <a href="mailto:info@nildu.com" className="font-medium text-brand underline underline-offset-2">
    info@nildu.com
  </a>
);

const ContactForm = () => {
  const [values, setValues] = useState<LeadFields>(empty);
  const [status, setStatus] = useState<Status>("idle");
  const [captcha, setCaptcha] = useState("");
  // Cada token de hCaptcha sirve una sola vez: tras un error se vuelve a montar el widget.
  const [captchaKey, setCaptchaKey] = useState(0);
  // hCaptcha pesa ~100 KB: se carga cuando la persona entra al formulario, no con la página.
  const [enUso, setEnUso] = useState(false);
  const okRef = useRef<HTMLParagraphElement>(null);

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
          <h2 className="text-3xl font-semibold tracking-tight">Solicita una demo</h2>
          <p className="mt-4 max-w-md leading-relaxed text-ink">
            Completa el formulario y el equipo de Nildu te contactará para mostrarte el sistema. También puedes escribir a {correo}.
          </p>
        </div>

        {status === "ok" ? (
          <p ref={okRef} tabIndex={-1} role="status" className="self-start rounded-lg border border-line bg-white p-6 focus:outline-none">
            ¡Listo! Has enviado tu solicitud. El equipo de Nildu te contactará pronto.
          </p>
        ) : !accessKey ? (
          <p className="self-start rounded-lg border border-line bg-white p-6">Para solicitar una demo, escribe a {correo}.</p>
        ) : (
          <form onSubmit={onSubmit} onFocus={() => setEnUso(true)} className="grid gap-4 rounded-lg border border-line bg-white p-6">
            {campos.map((c) => (
              <div key={c.name}>
                <label htmlFor={c.name} className="block text-sm font-medium">
                  {c.label}
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
              <Captcha key={captchaKey} onToken={setCaptcha} fallback={<>Escribe a {correo}.</>} />
            ) : (
              <div className="min-h-[78px]" />
            )}
            {status === "sin-captcha" && (
              <p role="alert" className="text-sm text-red-700">
                Completa la verificación antes de enviar.
              </p>
            )}
            {status === "error" && (
              <p role="alert" className="text-sm text-red-700">
                ¡Ups! No se pudo enviar. Escribe a {correo}.
              </p>
            )}
            <button type="submit" disabled={status === "sending"} className={`${primaryButton} disabled:opacity-60`}>
              {status === "sending" ? "Enviando…" : "Agenda una demo"}
            </button>
            <p className="text-xs text-ink">
              Nildu usa tus datos solo para contactarte sobre la demo. Lee la{" "}
              <a href="/privacidad" className="underline underline-offset-2 hover:text-navy">
                política de privacidad
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
