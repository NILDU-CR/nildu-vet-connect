import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { primaryButton } from "@/lib/styles";
import { PLAN, formatUsd, isVolume, quote } from "@/lib/pricing";
import type { Period, PlanElegido } from "@/lib/pricing";

const MIN_USERS = 1;
// Un paso por encima del tope cotizable: ahí el contador muestra "10+" y la tarjeta pasa a precio por volumen.
const MAX_USERS = PLAN.maxQuotedUsers + 1;

const textos = {
  es: {
    etiqueta: "PRECIO",
    titulo: "Un plan. Todo incluido.",
    titulo2: "Pagas por tu equipo, no por funciones.",
    alMesIva: "USD al mes, IVA incluido",
    alMes: "al mes",
    alAno: "al año",
    iva: "IVA incluido",
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
    masDe: `Más de ${PLAN.maxQuotedUsers} usuarios`,
    volumen: "Precio por volumen",
    volumenDetalle: `Con más de ${PLAN.maxQuotedUsers} usuarios, recibe una propuesta a la medida de tu equipo.`,
    propuesta: "Solicitar contacto para propuesta",
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
      { q: "¿Qué cuenta como usuario?", a: "Cada persona de tu equipo con acceso a Nildu es un usuario." },
      { q: "¿El precio incluye IVA?", a: "Sí, el precio ya incluye el IVA." },
    ],
  },
  en: {
    etiqueta: "PRICING",
    titulo: "One plan. Everything included.",
    titulo2: "You pay for your team, not for features.",
    alMesIva: "USD per month, VAT included",
    alMes: "per month",
    alAno: "per year",
    iva: "VAT included",
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
    masDe: `More than ${PLAN.maxQuotedUsers} users`,
    volumen: "Volume pricing",
    volumenDetalle: `With more than ${PLAN.maxQuotedUsers} users, get a proposal tailored to your team.`,
    propuesta: "Request a proposal",
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
      { q: "What counts as a user?", a: "Each person on your team with access to Nildu is one user." },
      { q: "Does the price include VAT?", a: "Yes, VAT is already included in the price." },
    ],
  },
};

const periodoBase = "rounded-full px-4 py-1.5";
const contadorBoton = "h-9 w-9 rounded-md border border-white/30 disabled:opacity-40";

// onElegir avisa a la página el plan que la persona armó, para enviarlo con la solicitud de demo. Solo cuenta si tocó
// el periodo, el contador o el botón de la tarjeta: los valores iniciales, sin tocar, no son una elección.
const PricingSection = ({ onElegir }: { onElegir: (plan: PlanElegido) => void }) => {
  const [period, setPeriod] = useState<Period>("anual");
  const [users, setUsers] = useState(3);
  const elegir = (p: Period, u: number) => {
    setPeriod(p);
    setUsers(u);
    onElegir({ period: p, users: u });
  };
  const [lang] = useLang();
  const t = textos[lang];
  const q = quote(users, period);
  const anual = period === "anual";
  const volumen = isVolume(users);

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
            <p className="mt-6 flex items-baseline gap-x-3">
              <span className="text-6xl font-semibold tracking-tight">{formatUsd(PLAN.monthly)}</span>
              <span className="text-sm text-white/70">{t.alMesIva}</span>
            </p>
            <p className="mt-4">
              {t.incluye} {t.usuarios(PLAN.includedUsers)}. {t.adicionalPrecio}
            </p>
            <div role="group" aria-label={t.periodo} className="mt-8 inline-flex rounded-full border border-white/25 p-1 text-sm">
              <button
                type="button"
                aria-pressed={!anual}
                onClick={() => elegir("mensual", users)}
                className={`${periodoBase} ${!anual ? "bg-white font-medium text-navy" : "text-white/75"}`}
              >
                {t.mensual}
              </button>
              <button
                type="button"
                aria-pressed={anual}
                onClick={() => elegir("anual", users)}
                className={`${periodoBase} ${anual ? "bg-white font-medium text-navy" : "text-white/75"}`}
              >
                {t.anualGratis}
              </button>
            </div>
            <p className="mt-8 text-sm text-white/75">{t.cuantos}</p>
            <div className="mt-3 flex items-center gap-4">
              <button type="button" aria-label={t.quitar} disabled={users === MIN_USERS} onClick={() => elegir(period, users - 1)} className={contadorBoton}>
                −
              </button>
              <span aria-live="polite" className="min-w-[3ch] text-center text-2xl font-semibold">
                {volumen ? `${PLAN.maxQuotedUsers}+` : users}
              </span>
              <button type="button" aria-label={t.agregar} disabled={users === MAX_USERS} onClick={() => elegir(period, users + 1)} className={contadorBoton}>
                +
              </button>
              <span className="text-xs text-white/70">
                {t.incluidos(PLAN.includedUsers)} {t.enPlan}
              </span>
            </div>
          </div>

          <div id="tu-plan" className="rounded-xl bg-white p-6 text-navy shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
            <p className="text-sm font-semibold">{t.tuPlan}</p>
            <p className="text-xs text-ink">{volumen ? t.masDe : `${anual ? t.anual : t.mensual} · ${t.usuarios(users)}`}</p>
            <div className="mt-3">
              {!volumen && (
                <>
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
                </>
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
              {volumen ? (
                <>
                  <p className="text-lg font-semibold">{t.volumen}</p>
                  <p className="mt-1 text-sm text-ink">{t.volumenDetalle}</p>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">Total</span>
                    <span className="text-right">
                      <span className="block text-2xl font-semibold">{formatUsd(q.total)}</span>
                      <span className="block text-xs text-ink">
                        {anual ? t.alAno : t.alMes}, {t.iva}
                      </span>
                    </span>
                  </div>
                  {anual && (
                    <p className="mt-1 text-right text-xs text-ink">
                      {t.equivale} {formatUsd(q.perMonth)} {t.alMes}
                    </p>
                  )}
                </>
              )}
            </div>
            <a href="#contacto" onClick={() => elegir(period, users)} className={`${primaryButton} mt-5 w-full text-center`}>
              {volumen ? t.propuesta : t.demo}
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
