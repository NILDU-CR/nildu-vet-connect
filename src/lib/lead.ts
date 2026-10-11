export type LeadFields = {
  nombre: string;
  correo: string;
  telefono: string;
  veterinaria: string;
  botcheck: string;
  // Token de hCaptcha; Web3Forms lo valida.
  captcha: string;
};

export type LeadResult = "ok" | "error" | "no-key";

const ENDPOINT = "https://api.web3forms.com/submit";

// Envía la solicitud de demo a Web3Forms, que la reenvía al correo de la cuenta (hoy root@nildu.com).
export async function submitLead(fields: LeadFields, accessKey: string, fetchImpl: typeof fetch): Promise<LeadResult> {
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
        email: fields.correo,
        telefono: fields.telefono,
        veterinaria: fields.veterinaria,
        "h-captcha-response": fields.captcha,
      }),
    });
    const data = (await res.json()) as { success?: boolean };
    return res.ok && data.success === true ? "ok" : "error";
  } catch {
    return "error";
  }
}
