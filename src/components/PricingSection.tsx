import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { primaryButton } from "@/lib/styles";
import { PLAN, formatUsd, quote } from "@/lib/pricing";
import type { Period } from "@/lib/pricing";

const MIN_USERS = 1;
const MAX_USERS = 50;

const textos = {
  es: {
    etiqueta: "PRECIO",
    titulo: "Un plan. Todo incluido.",
    titulo2: "Pagas por tu equipo, no por funciones.",
    lanzamiento: "Precio de lanzamiento · por tiempo limitado",
    alMesIva: "USD al mes + IVA",
    oficial: "Precio oficial",
    alMes: "al mes",
    alAno: "al año",
    iva: "+ IVA",
    ahorro: `Ahorras ${formatUsd(PLAN.regularMonthly - PLAN.monthly)} al mes frente al precio oficial mientras dure el lanzamiento.`,
    usuarios: (n: number) => `${n} ${n === 1 ? "usuario" : "usuarios"}`,
    incluidos: (n: number) => `${n} ${n === 1 ? "usuario incluido" : "usuarios incluidos"}`,
    adicionales: (n: number) => `${n} ${n === 1 ? "usuario adicional" : "usuarios adicionales"}`,
    adicionalPrecio: `Cada usuario adicional, ${formatUsd(PLAN.extraUserMonthly)} al mes.`,
    incluye: "Incluye",
    periodo: "Periodo de pago",
    mensual: "Mensual",
    anual: "Anual",
    anualGratis: "Anual · 2 meses gratis",
    cuantos: "¿Cuántas personas usarán Nildu?",
    quitar: "Quitar un usuario",
    agregar: "Agregar un usuario",
    enPlan: "en el plan",
    tuPlan: "Tu plan",
    plan: (anual: boolean) => `Plan Nildu ${anual ? "anual" : "mensual"}`,
    factura: "Factura electrónica (Costa Rica)",
    incluida: "Incluida",
    inventario: "Inventario y caja",
    incluido: "Incluido",
    equivale: "equivale a",
    demo: "Agenda una demo",
    preguntas: [
      { q: "¿La factura electrónica cuesta aparte?", a: "No, va incluida en el plan." },
      { q: "¿Qué cuenta como usuario?", a: "Cada persona de tu equipo con acceso a Nildu." },
      { q: "¿El precio incluye IVA?", a: "No, el IVA se suma al precio." },
    ],
  },
  en: {
    etiqueta: "PRICING",
    titulo: "One plan. Everything included.",
    titulo2: "You pay for your team, not for features.",
    lanzamiento: "Launch price · limited time",
    alMesIva: "USD per month + VAT",
    oficial: "Regular price",
    alMes: "per month",
    alAno: "per year",
    iva: "+ VAT",
    ahorro: `You save ${formatUsd(PLAN.regularMonthly - PLAN.monthly)} a month off the regular price while the launch lasts.`,
    usuarios: (n: number) => `${n} ${n === 1 ? "user" : "users"}`,
    incluidos: (n: number) => `${n} ${n === 1 ? "user" : "users"} included`,
    adicionales: (n: number) => `${n} additional ${n === 1 ? "user" : "users"}`,
    adicionalPrecio: `Each additional user, ${formatUsd(PLAN.extraUserMonthly)} per month.`,
    incluye: "Includes",
    periodo: "Billing period",
    mensual: "Monthly",
    anual: "Annual",
    anualGratis: "Annual · 2 months free",
    cuantos: "How many people will use Nildu?",
    quitar: "Remove a user",
    agregar: "Add a user",
    enPlan: "in the plan",
    tuPlan: "Your plan",
    plan: (anual: boolean) => `Nildu plan, ${anual ? "annual" : "monthly"}`,
    factura: "Electronic invoicing (Costa Rica)",
    incluida: "Included",
    inventario: "Inventory and till",
    incluido: "Included",
    equivale: "equals",
    demo: "Book a demo",
    preguntas: [
      { q: "Does electronic invoicing cost extra?", a: "No, it's included in the plan." },
      { q: "What counts as a user?", a: "Each person on your team with access to Nildu." },
      { q: "Does the price include VAT?", a: "No, VAT is added to the price." },
    ],
  },
};

const periodoBase = "rounded-full px-4 py-1.5";
const contadorBoton = "h-9 w-9 rounded-md border border-white/30 disabled:opacity-40";

const PricingSection = () => {
  const [period, setPeriod] = useState<Period>("anual");
  const [users, setUsers] = useState(3);
  const [lang] = useLang();
  const t = textos[lang];
  const q = quote(users, period);
  const anual = period === "anual";

  return (
    <section id="precios" className="scroll-mt-20 bg-navy py-20 text-white">
      <div className="mx-auto max-w-page px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="text-xs font-medium tracking-[0.12em] text-cta">{t.etiqueta}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              {t.titulo}
              <br />
              {t.titulo2}
            </h2>
            <p className="mt-6 inline-block rounded-full bg-dot-gold px-3 py-1 text-xs font-semibold text-navy">{t.lanzamiento}</p>
            <div className="mt-4 flex flex-wrap items-end gap-x-8 gap-y-4">
              <p className="flex items-baseline gap-x-3">
                <span className="text-6xl font-semibold tracking-tight">{formatUsd(PLAN.monthly)}</span>
                <span className="text-sm text-white/70">{t.alMesIva}</span>
              </p>
              <p className="text-white/70">
                <span className="block text-xs">{t.oficial}</span>
                <s className="text-2xl font-semibold decoration-2">{formatUsd(PLAN.regularMonthly)}</s> <span className="text-sm">{t.alMes}</span>
              </p>
            </div>
            <p className="mt-4 text-white/85">{t.ahorro}</p>
            <p className="mt-2">
              {t.incluye} {t.usuarios(PLAN.includedUsers)}. {t.adicionalPrecio}
            </p>
            <div role="group" aria-label={t.periodo} className="mt-8 inline-flex rounded-full border border-white/25 p-1 text-sm">
              <button
                type="button"
                aria-pressed={!anual}
                onClick={() => setPeriod("mensual")}
                className={`${periodoBase} ${!anual ? "bg-white font-medium text-navy" : "text-white/75"}`}
              >
                {t.mensual}
              </button>
              <button
                type="button"
                aria-pressed={anual}
                onClick={() => setPeriod("anual")}
                className={`${periodoBase} ${anual ? "bg-white font-medium text-navy" : "text-white/75"}`}
              >
                {t.anualGratis}
              </button>
            </div>
            <p className="mt-8 text-sm text-white/75">{t.cuantos}</p>
            <div className="mt-3 flex items-center gap-4">
              <button type="button" aria-label={t.quitar} disabled={users === MIN_USERS} onClick={() => setUsers(users - 1)} className={contadorBoton}>
                −
              </button>
              <span aria-live="polite" className="min-w-[2ch] text-center text-2xl font-semibold">
                {users}
              </span>
              <button type="button" aria-label={t.agregar} disabled={users === MAX_USERS} onClick={() => setUsers(users + 1)} className={contadorBoton}>
                +
              </button>
              <span className="text-xs text-white/70">
                {t.incluidos(PLAN.includedUsers)} {t.enPlan}
              </span>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 text-navy shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
            <p className="text-sm font-semibold">{t.tuPlan}</p>
            <p className="text-xs text-ink">
              {anual ? t.anual : t.mensual} · {t.usuarios(users)}
            </p>
            <div className="mt-3">
              <p className="flex justify-between py-1.5 text-sm">
                <span>{t.plan(anual)}</span>
                <span>{formatUsd(q.base)}</span>
              </p>
              <p className="flex justify-between py-1.5 text-sm">
                <span>{t.incluidos(PLAN.includedUsers)}</span>
                <span className="text-ink">$0</span>
              </p>
              {q.extraUsers > 0 && (
                <p className="flex justify-between py-1.5 text-sm">
                  <span>{t.adicionales(q.extraUsers)}</span>
                  <span>{formatUsd(q.extraCost)}</span>
                </p>
              )}
              <p className="flex justify-between py-1.5 text-sm">
                <span>{t.factura}</span>
                <span className="text-ink">{t.incluida}</span>
              </p>
              <p className="flex justify-between py-1.5 text-sm">
                <span>{t.inventario}</span>
                <span className="text-ink">{t.incluido}</span>
              </p>
            </div>
            <div aria-live="polite" className="mt-3 border-t border-line pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Total</span>
                <span className="text-right">
                  <span className="block text-xs text-ink">
                    {t.oficial} <s>{formatUsd(q.regularTotal)}</s>
                  </span>
                  <span className="block text-2xl font-semibold">{formatUsd(q.total)}</span>
                  <span className="block text-xs text-ink">
                    {anual ? t.alAno : t.alMes} {t.iva}
                  </span>
                </span>
              </div>
              {anual && (
                <p className="mt-1 text-right text-xs text-ink">
                  {t.equivale} {formatUsd(q.perMonth)} {t.alMes}
                </p>
              )}
            </div>
            <a href="#contacto" className={`${primaryButton} mt-5 w-full text-center`}>
              {t.demo}
            </a>
          </div>
        </div>

        <div className="mt-14 grid gap-6 text-sm sm:grid-cols-3">
          {t.preguntas.map((p) => (
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
