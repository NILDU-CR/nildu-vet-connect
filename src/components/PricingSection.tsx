import { useState } from "react";
import { primaryButton } from "@/lib/styles";
import { formatUsd, quote } from "@/lib/pricing";
import type { Period } from "@/lib/pricing";

const MIN_USERS = 1;
const MAX_USERS = 50;

const preguntas = [
  { q: "¿La factura electrónica cuesta aparte?", a: "No, va incluida en el plan." },
  { q: "¿Qué cuenta como usuario?", a: "Cada persona de tu equipo con acceso a Nildu." },
  { q: "¿El precio incluye IVA?", a: "No, el IVA se suma al precio." },
];

const periodoBase = "rounded-full px-4 py-1.5";
const contadorBoton = "h-9 w-9 rounded-md border border-white/30 disabled:opacity-40";

const PricingSection = () => {
  const [period, setPeriod] = useState<Period>("anual");
  const [users, setUsers] = useState(5);
  const q = quote(users, period);
  const anual = period === "anual";

  return (
    <section id="precios" className="scroll-mt-20 bg-navy py-20 text-white">
      <div className="mx-auto max-w-page px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="text-xs font-medium tracking-[0.12em] text-cta">PRECIO</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Un plan. Todo incluido.
              <br />
              Pagas por tu equipo, no por funciones.
            </h2>
            <p className="mt-6 flex flex-wrap items-baseline gap-x-3">
              <span className="text-6xl font-semibold tracking-tight">$25</span>
              <span className="text-sm text-white/70">USD al mes + IVA</span>
            </p>
            <p className="mt-3">Incluye 3 usuarios. Cada usuario adicional, $5 al mes.</p>
            <div role="group" aria-label="Periodo de pago" className="mt-8 inline-flex rounded-full border border-white/25 p-1 text-sm">
              <button
                type="button"
                aria-pressed={!anual}
                onClick={() => setPeriod("mensual")}
                className={`${periodoBase} ${!anual ? "bg-white font-medium text-navy" : "text-white/75"}`}
              >
                Mensual
              </button>
              <button
                type="button"
                aria-pressed={anual}
                onClick={() => setPeriod("anual")}
                className={`${periodoBase} ${anual ? "bg-white font-medium text-navy" : "text-white/75"}`}
              >
                Anual · 2 meses gratis
              </button>
            </div>
            <p className="mt-8 text-sm text-white/75">¿Cuántas personas usarán Nildu?</p>
            <div className="mt-3 flex items-center gap-4">
              <button
                type="button"
                aria-label="Quitar un usuario"
                disabled={users === MIN_USERS}
                onClick={() => setUsers(users - 1)}
                className={contadorBoton}
              >
                −
              </button>
              <span aria-live="polite" className="min-w-[2ch] text-center text-2xl font-semibold">
                {users}
              </span>
              <button
                type="button"
                aria-label="Agregar un usuario"
                disabled={users === MAX_USERS}
                onClick={() => setUsers(users + 1)}
                className={contadorBoton}
              >
                +
              </button>
              <span className="text-xs text-white/70">3 incluidos en el plan</span>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 text-navy shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
            <p className="text-sm font-semibold">Tu plan</p>
            <p className="text-xs text-ink">
              {anual ? "Anual" : "Mensual"} · {users} {users === 1 ? "usuario" : "usuarios"}
            </p>
            <div className="mt-3">
              <p className="flex justify-between py-1.5 text-sm">
                <span>Plan Nildu ({period})</span>
                <span>{formatUsd(q.base)}</span>
              </p>
              <p className="flex justify-between py-1.5 text-sm">
                <span>3 usuarios incluidos</span>
                <span className="text-ink">$0</span>
              </p>
              {q.extraUsers > 0 && (
                <p className="flex justify-between py-1.5 text-sm">
                  <span>
                    {q.extraUsers} {q.extraUsers === 1 ? "usuario adicional" : "usuarios adicionales"}
                  </span>
                  <span>{formatUsd(q.extraCost)}</span>
                </p>
              )}
              <p className="flex justify-between py-1.5 text-sm">
                <span>Factura electrónica</span>
                <span className="text-ink">Incluida</span>
              </p>
              <p className="flex justify-between py-1.5 text-sm">
                <span>Inventario y caja</span>
                <span className="text-ink">Incluido</span>
              </p>
            </div>
            <div aria-live="polite" className="mt-3 border-t border-line pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Total</span>
                <span className="text-right">
                  <span className="block text-2xl font-semibold">{formatUsd(q.total)}</span>
                  <span className="block text-xs text-ink">{anual ? "al año" : "al mes"} + IVA</span>
                </span>
              </div>
              {anual && <p className="mt-1 text-right text-xs text-ink">equivale a {formatUsd(q.perMonth)} al mes</p>}
            </div>
            <a href="#contacto" className={`${primaryButton} mt-5 w-full text-center`}>
              Agenda una demo
            </a>
          </div>
        </div>

        <div className="mt-14 grid gap-6 text-sm sm:grid-cols-3">
          {preguntas.map((p) => (
            <div key={p.q} className="border-t border-white/15 pt-4">
              <p className="font-semibold">{p.q}</p>
              <p className="mt-1 text-white/75">{p.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
