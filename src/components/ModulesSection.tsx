import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import agenda from "@/assets/screens/modulos/agenda.webp";
import agenda720 from "@/assets/screens/modulos/agenda-720.webp";
import agendaEn from "@/assets/screens/modulos/agenda-en.webp";
import agendaEn720 from "@/assets/screens/modulos/agenda-en-720.webp";
import inventario from "@/assets/screens/modulos/inventario.webp";
import inventario720 from "@/assets/screens/modulos/inventario-720.webp";
import inventarioEn from "@/assets/screens/modulos/inventario-en.webp";
import inventarioEn720 from "@/assets/screens/modulos/inventario-en-720.webp";
import reportes from "@/assets/screens/modulos/reportes.webp";
import reportesEn from "@/assets/screens/modulos/reportes-en.webp";
import tareas from "@/assets/screens/modulos/tareas.webp";
import tareas720 from "@/assets/screens/modulos/tareas-720.webp";
import tareasEn from "@/assets/screens/modulos/tareas-en.webp";
import tareasEn720 from "@/assets/screens/modulos/tareas-en-720.webp";
import consulta from "@/assets/screens/consulta.webp";
import consulta720 from "@/assets/screens/consulta-720.webp";
import consultaEn from "@/assets/screens/consulta-en.webp";
import consultaEn720 from "@/assets/screens/consulta-en-720.webp";
import fiscal from "@/assets/screens/fiscal.webp";
import fiscal720 from "@/assets/screens/fiscal-720.webp";
import fiscalEn from "@/assets/screens/fiscal-en.webp";
import fiscalEn720 from "@/assets/screens/fiscal-en-720.webp";
import { useLang } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";
import BrowserFrame from "./BrowserFrame";

// Ancho de la captura: en lg+ la columna mide ~510 px; abajo ocupa el panel menos sus márgenes.
const SIZES = "(min-width: 1024px) 510px, calc(100vw - 98px)";
const srcSet = (chica: string, grande: string) => `${chica} 720w, ${grande} 1440w`;

// Titular provisional mientras Steve elige.
const textos = {
  es: {
    titular: "Seis módulos. Una sola historia por paciente.",
    bajada: "Agenda, expediente, facturación, inventario, tareas y reportes, conectados. Lo que registras en la consulta llega a la caja y al inventario.",
    tablist: "Módulos de Nildu",
  },
  en: {
    titular: "Six modules. One story per patient.",
    bajada: "Schedule, records, invoicing, inventory, tasks and reports, all connected. What you record in the visit reaches the till and the inventory.",
    tablist: "Nildu modules",
  },
};

type Texto = { pestana: string; titulo: string; texto: string; items: string[]; alt: string; nota?: string };

type Modulo = {
  id: string;
  es: Texto;
  en: Texto;
  // Sin captura, el panel ocupa todo el ancho. Cada idioma tiene su captura, del mismo tamaño.
  img?: { src: Record<Lang, string>; srcSet?: Record<Lang, string>; width: number; height: number };
};

// Cada frase corresponde a una fila de la sección 3 del spec. No agregar nada que no esté ahí.
const modulos: Modulo[] = [
  {
    id: "agenda",
    es: {
      pestana: "Agenda",
      titulo: "Agenda",
      texto: "Citas por profesional y consultorio, con la disponibilidad a la vista. El cliente recibe un correo cuando creas, mueves o cancelas su cita.",
      items: ["Vistas de mes, semana y día", "Reprogramar arrastrando", "Horarios y disponibilidad por profesional", "Motivos de cita configurables"],
      alt: "Vista semanal de la agenda de Nildu, con citas de dos consultorios y dos profesionales",
    },
    en: {
      pestana: "Schedule",
      titulo: "Schedule",
      texto: "Appointments by provider and exam room, with availability at a glance. The client gets an email when you create, move or cancel their appointment.",
      items: ["Month, week and day views", "Drag to reschedule", "Hours and availability per provider", "Configurable appointment reasons"],
      alt: "Weekly view of the Nildu schedule, with appointments in two exam rooms for two providers",
    },
    img: { src: { es: agenda, en: agendaEn }, srcSet: { es: srcSet(agenda720, agenda), en: srcSet(agendaEn720, agendaEn) }, width: 1440, height: 778 },
  },
  {
    id: "expediente",
    es: {
      pestana: "Expediente",
      titulo: "Expediente clínico",
      texto: "Cada consulta usa el formulario de su tipo, con los signos vitales comparados contra su rango normal.",
      items: ["Vacunas con lote y próxima dosis", "Desparasitaciones y medicamentos", "Curva de peso y archivos adjuntos", "Vacunas aplicadas en otra veterinaria"],
      alt: "Consulta en Nildu con signos vitales y su rango normal",
    },
    en: {
      pestana: "Records",
      titulo: "Medical records",
      texto: "Each visit uses the form for its type, with vital signs compared against their normal range.",
      items: ["Vaccines with lot and next dose", "Deworming and medications", "Weight curve and attached files", "Vaccines given at another practice"],
      alt: "A visit in Nildu with vital signs and their normal range",
    },
    img: { src: { es: consulta, en: consultaEn }, srcSet: { es: srcSet(consulta720, consulta), en: srcSet(consultaEn720, consultaEn) }, width: 1440, height: 778 },
  },
  {
    id: "facturacion",
    es: {
      pestana: "Facturación",
      titulo: "Facturación",
      texto: "El botón Cobrar pasa la consulta a caja. Emites la factura o el tiquete electrónico ante Hacienda y el cliente recibe el XML y el PDF por correo.",
      items: [
        "Factura, tiquete, notas de crédito y débito",
        "Pago dividido: efectivo, tarjeta, SINPE Móvil o transferencia",
        "Abonos y ventas a crédito",
        "Totales del día por sucursal",
      ],
      nota: "La factura electrónica ante Hacienda es solo para Costa Rica. En otros países puedes facturar desde Nildu, pero los comprobantes no tienen validez fiscal.",
      alt: "Orden en caja con la opción de emitir factura o tiquete electrónico",
    },
    en: {
      pestana: "Invoicing",
      titulo: "Invoicing",
      texto: "The Charge button sends the visit to the till. You issue the electronic invoice or receipt with Hacienda, and the client gets the XML and PDF by email.",
      items: ["Invoices, receipts, credit and debit notes", "Split payment: cash, card, SINPE Móvil or transfer", "Deposits and sales on credit", "Daily totals by branch"],
      nota: "Electronic invoicing with Hacienda is only available in Costa Rica. In other countries you can invoice from Nildu, but the documents have no tax validity.",
      alt: "Order at the till with the option to issue an electronic invoice or receipt",
    },
    img: { src: { es: fiscal, en: fiscalEn }, srcSet: { es: srcSet(fiscal720, fiscal), en: srcSet(fiscalEn720, fiscalEn) }, width: 1440, height: 778 },
  },
  {
    id: "inventario",
    es: {
      pestana: "Inventario",
      titulo: "Inventario",
      texto: "Existencias por sucursal y bodega, con lotes y vencimientos. Lo que vendes se rebaja solo.",
      items: ["Alertas de reorden, por vencer y vencido", "Kárdex por artículo", "Código CABYS e impuesto por artículo", "Importación del catálogo desde Excel"],
      alt: "Existencias en Nildu con avisos de reponer y un lote por vencer",
    },
    en: {
      pestana: "Inventory",
      titulo: "Inventory",
      texto: "Stock by branch and warehouse, with lots and expiry dates. What you sell is deducted automatically.",
      items: ["Reorder, expiring and expired alerts", "Stock ledger per item", "CABYS code and tax per item", "Catalog import from Excel"],
      alt: "Stock in Nildu with reorder warnings and a lot about to expire",
    },
    img: { src: { es: inventario, en: inventarioEn }, srcSet: { es: srcSet(inventario720, inventario), en: srcSet(inventarioEn720, inventarioEn) }, width: 1440, height: 692 },
  },
  {
    id: "tareas",
    es: {
      pestana: "Tareas",
      titulo: "Tareas",
      texto: "Un tablero para el equipo: cada tarea lleva responsable, fecha de vencimiento y prioridad, y puede quedar ligada a un cliente o a un paciente.",
      items: ["Columnas por estado: mueves las tarjetas arrastrando", "Responsables, prioridad y etiquetas", "Ligadas a un cliente o a un paciente", "Comentarios e historial de cambios"],
      alt: "Tablero de tareas de Nildu con columnas Por hacer, En proceso y Completado",
    },
    en: {
      pestana: "Tasks",
      titulo: "Tasks",
      texto: "A board for the team: each task has an owner, a due date and a priority, and can be linked to a client or a patient.",
      items: ["Status columns: drag the cards", "Owners, priority and labels", "Linked to a client or a patient", "Comments and change history"],
      alt: "Nildu task board with To do, In progress and Done columns",
    },
    img: { src: { es: tareas, en: tareasEn }, srcSet: { es: srcSet(tareas720, tareas), en: srcSet(tareasEn720, tareasEn) }, width: 1440, height: 490 },
  },
  {
    id: "reportes",
    es: {
      pestana: "Reportes",
      titulo: "Reportes",
      texto: "Tu veterinaria en números: el inicio muestra clientes y pacientes activos, citas de hoy y de la semana, y tareas pendientes.",
      items: ["Reporte de citas en Excel", "Reporte de pacientes en Excel", "Citas de hoy y de la semana en el inicio", "Tareas atrasadas y pendientes"],
      alt: "Panel de control con clientes y pacientes activos, citas de hoy y de la semana, y tareas",
    },
    en: {
      pestana: "Reports",
      titulo: "Reports",
      texto: "Your practice in numbers: the home page shows active clients and patients, today's and this week's appointments, and pending tasks.",
      items: ["Appointments report in Excel", "Patients report in Excel", "Today's and this week's appointments on the home page", "Overdue and pending tasks"],
      alt: "Dashboard with active clients and patients, today's and this week's appointments, and tasks",
    },
    img: { src: { es: reportes, en: reportesEn }, width: 644, height: 408 },
  },
];

const tabId = (m: Modulo) => `modulo-tab-${m.id}`;
const panelId = (m: Modulo) => `modulo-panel-${m.id}`;

const ModulesSection = () => {
  const [activo, setActivo] = useState(0);
  const pestanas = useRef<(HTMLButtonElement | null)[]>([]);
  const [lang] = useLang();
  const t = textos[lang];

  const ir = (i: number) => {
    setActivo(i);
    pestanas.current[i]?.focus();
  };

  // Flechas con vuelta al otro extremo, Home y End: el patrón de pestañas de WAI-ARIA.
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const ultima = modulos.length - 1;
    if (e.key === "ArrowRight") ir(activo === ultima ? 0 : activo + 1);
    else if (e.key === "ArrowLeft") ir(activo === 0 ? ultima : activo - 1);
    else if (e.key === "Home") ir(0);
    else if (e.key === "End") ir(ultima);
    else return;
    e.preventDefault();
  };

  return (
    <section id="funciones" className="scroll-mt-20 bg-mist py-20">
      <div className="mx-auto max-w-page px-4 sm:px-6">
        <div className="text-center">
          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">{t.titular}</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-ink">{t.bajada}</p>
        </div>

        <div className="mt-12">
          {/* En celular, dos filas de tres pestañas sueltas; desde 768 px, una fila de pestañas de carpeta pegadas al panel. */}
          <div
            role="tablist"
            aria-label={t.tablist}
            onKeyDown={onKeyDown}
            className="grid grid-cols-3 gap-2 md:flex md:gap-1 md:overflow-x-auto md:[scrollbar-width:none] md:[&::-webkit-scrollbar]:hidden"
          >
            {modulos.map((m, i) => (
              <button
                key={m.id}
                ref={(el) => {
                  pestanas.current[i] = el;
                }}
                type="button"
                role="tab"
                id={tabId(m)}
                aria-selected={i === activo}
                aria-controls={panelId(m)}
                tabIndex={i === activo ? 0 : -1}
                onClick={() => setActivo(i)}
                className={`shrink-0 whitespace-nowrap rounded-xl px-2 py-3 text-sm font-medium md:rounded-b-none md:rounded-t-xl md:px-6 md:pb-3.5 md:pt-3 ${
                  i === activo ? "bg-navy text-white" : "bg-white text-ink hover:text-navy md:bg-transparent"
                }`}
              >
                {m[lang].pestana}
              </button>
            ))}
          </div>

          {modulos.map((m, i) => (
            <div
              key={m.id}
              role="tabpanel"
              id={panelId(m)}
              aria-labelledby={tabId(m)}
              tabIndex={0}
              hidden={i !== activo}
              // La esquina superior izquierda queda cuadrada solo cuando la primera pestaña se funde con el panel.
              className={`mt-2 rounded-2xl bg-navy p-8 text-white md:mt-0 lg:p-10 ${activo === 0 ? "md:rounded-tl-none" : ""}`}
            >
              <div className={`grid items-center gap-10 ${m.img ? "lg:grid-cols-[1fr_1.15fr]" : ""}`}>
                <div>
                  <h3 className="text-2xl font-semibold">{m[lang].titulo}</h3>
                  <p className="mt-3 leading-relaxed text-white/75">{m[lang].texto}</p>
                  <ul role="list" className="mt-6 space-y-2">
                    {m[lang].items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden="true" className="text-cta">
                          —
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  {m[lang].nota && <p className="mt-6 rounded-md border border-white/20 px-4 py-3 text-sm leading-relaxed text-white/75">{m[lang].nota}</p>}
                </div>
                {m.img && <BrowserFrame src={m.img.src[lang]} srcSet={m.img.srcSet?.[lang]} sizes={m.img.srcSet && SIZES} alt={m[lang].alt} url="nildu.app" eager={false} width={m.img.width} height={m.img.height} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;
