import { test } from "node:test";
import assert from "node:assert/strict";
import { submitLead } from "./lead.ts";
import type { LeadFields } from "./lead.ts";

const fields: LeadFields = {
  nombre: "Ana Mora",
  correo: "ana@example.com",
  telefono: "+506 8888 0000",
  veterinaria: "Vet Demo",
  botcheck: "",
  captcha: "token-hcaptcha",
};

function recordingFetch(respond: () => Response) {
  const calls: { url: string; init: RequestInit }[] = [];
  const impl = (async (url: string | URL | Request, init?: RequestInit) => {
    calls.push({ url: String(url), init: init ?? {} });
    return respond();
  }) as typeof fetch;
  return { impl, calls };
}

const json = (status: number, body: unknown) => () => new Response(JSON.stringify(body), { status });

test("sin llave no envía nada", async () => {
  const f = recordingFetch(json(200, { success: true }));
  assert.equal(await submitLead(fields, "", f.impl), "no-key");
  assert.equal(f.calls.length, 0);
});

test("envía los campos a Web3Forms y devuelve ok", async () => {
  const f = recordingFetch(json(200, { success: true }));
  assert.equal(await submitLead(fields, "llave-123", f.impl), "ok");
  assert.equal(f.calls[0].url, "https://api.web3forms.com/submit");
  const body = JSON.parse(String(f.calls[0].init.body));
  assert.equal(body.access_key, "llave-123");
  assert.equal(body.nombre, "Ana Mora");
  assert.equal(body.email, "ana@example.com");
  assert.equal(body.telefono, "+506 8888 0000");
  assert.equal(body.veterinaria, "Vet Demo");
  assert.equal(body.subject, "Solicitud de demo — Vet Demo");
  assert.equal(body["h-captcha-response"], "token-hcaptcha");
});

test("envía con timeout de 15 s", async () => {
  const f = recordingFetch(json(200, { success: true }));
  await submitLead(fields, "llave-123", f.impl);
  assert.ok(f.calls[0].init.signal instanceof AbortSignal);
});

test("success:false de Web3Forms es error", async () => {
  const f = recordingFetch(json(200, { success: false, message: "Invalid access key" }));
  assert.equal(await submitLead(fields, "llave-123", f.impl), "error");
});

test("HTTP 500 es error aunque diga success", async () => {
  const f = recordingFetch(json(500, { success: true }));
  assert.equal(await submitLead(fields, "llave-123", f.impl), "error");
});

test("respuesta que no es JSON es error", async () => {
  const f = recordingFetch(() => new Response("<html>Bad gateway</html>", { status: 502 }));
  assert.equal(await submitLead(fields, "llave-123", f.impl), "error");
});

test("fallo de red es error", async () => {
  const impl = (async () => {
    throw new TypeError("Failed to fetch");
  }) as typeof fetch;
  assert.equal(await submitLead(fields, "llave-123", impl), "error");
});

test("campo trampa lleno: no envía y simula éxito", async () => {
  const f = recordingFetch(json(200, { success: true }));
  assert.equal(await submitLead({ ...fields, botcheck: "1" }, "llave-123", f.impl), "ok");
  assert.equal(f.calls.length, 0);
});
