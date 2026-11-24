import type { Lang } from "./i18n";
import { PLAN, formatUsd, isVolume, quote } from "./pricing.ts";
import type { PlanElegido } from "./pricing.ts";

export type LeadFields = {
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  veterinaria: string;
  pais: string;
  botcheck: string;
  // Token de hCaptcha; Web3Forms lo valida.
  captcha: string;
};

// Lo que la persona no escribe pero ayuda a atenderla: el idioma en que veía la página y el plan que armó en Precios
// (null si no tocó esa sección).
export type LeadContexto = { idioma: Lang; plan: PlanElegido | null };

export type LeadResult = "ok" | "error" | "no-key";

const ENDPOINT = "https://api.web3forms.com/submit";

// El correo lo lee el equipo de Nildu: va en español aunque la persona viera la página en inglés.
export function detallePlan(plan: PlanElegido | null): Record<string, string> {
  if (!plan) return { plan: "No eligió plan en la sección de precios" };
  const anual = plan.period === "anual";
  const periodo = anual ? "Anual" : "Mensual";
  if (isVolume(plan.users)) return { plan: periodo, usuarios: `Más de ${PLAN.maxQuotedUsers}`, total: "Precio por volumen (pide propuesta)" };
  const q = quote(plan.users, plan.period);
  return { plan: periodo, usuarios: String(plan.users), total: `${formatUsd(q.total)} ${anual ? "al año" : "al mes"}, IVA incluido` };
}

// Envía la solicitud de demo a Web3Forms, que la reenvía al correo de la cuenta (hoy root@nildu.com).
export async function submitLead(fields: LeadFields, contexto: LeadContexto, accessKey: string, fetchImpl: typeof fetch): Promise<LeadResult> {
  if (!accessKey) return "no-key";
  // Un bot llenó el campo trampa: se simula éxito para no darle pistas.
  if (fields.botcheck) return "ok";
  try {
    const res = await fetchImpl(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      signal: AbortSignal.timeout(15000),
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Solicitud de demo — ${fields.veterinaria}`,
        from_name: "Landing Nildu",
        nombre: fields.nombre,
        apellido: fields.apellido,
        email: fields.correo,
        telefono: fields.telefono,
        veterinaria: fields.veterinaria,
        pais: fields.pais,
        idioma: contexto.idioma === "en" ? "Inglés" : "Español",
        ...detallePlan(contexto.plan),
        "h-captcha-response": fields.captcha,
      }),
    });
    const data = (await res.json()) as { success?: boolean };
    return res.ok && data.success === true ? "ok" : "error";
  } catch {
    return "error";
  }
}
