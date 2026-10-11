import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import agenda from "@/assets/screens/modulos/agenda.webp";
import agenda720 from "@/assets/screens/modulos/agenda-720.webp";
import inventario from "@/assets/screens/modulos/inventario.webp";
import inventario720 from "@/assets/screens/modulos/inventario-720.webp";
import reportes from "@/assets/screens/modulos/reportes.webp";
import tareas from "@/assets/screens/modulos/tareas.webp";
import tareas720 from "@/assets/screens/modulos/tareas-720.webp";
import consulta from "@/assets/screens/consulta.webp";
import consulta720 from "@/assets/screens/consulta-720.webp";
import fiscal from "@/assets/screens/fiscal.webp";
import fiscal720 from "@/assets/screens/fiscal-720.webp";
import BrowserFrame from "./BrowserFrame";

// Ancho de la captura: en lg+ la columna mide ~510 px; abajo ocupa el panel menos sus márgenes.
const SIZES = "(min-width: 1024px) 510px, calc(100vw - 98px)";
const srcSet = (chica: string, grande: string) => `${chica} 720w, ${grande} 1440w`;

// Titular provisional mientras Steve elige.
const TITULAR = "Seis módulos. Una sola historia por paciente.";

type Modulo = {
  id: string;
  pestana: string;
  titulo: string;
  texto: string;
  items: string[];
  // Sin captura, el panel ocupa todo el ancho.
  img?: { src: string; srcSet?: string; alt: string; width: number; height: number };
};

// Cada frase corresponde a una fila de la sección 3 del spec. No agregar nada que no esté ahí.
const modulos: Modulo[] = [
  {
    id: "agenda",
    pestana: "Agenda",
    titulo: "Agenda",
    texto: "Citas por profesional y consultorio, con la disponibilidad a la vista. El cliente recibe un correo cuando creas, mueves o cancelas su cita.",
    items: ["Vistas de mes, semana y día", "Reprogramar arrastrando", "Horarios y disponibilidad por profesional", "Motivos de cita configurables"],
    img: { src: agenda, srcSet: srcSet(agenda720, agenda), alt: "Vista semanal de la agenda de Nildu, con citas de dos consultorios y dos profesionales", width: 1440, height: 778 },
  },
  {
    id: "expediente",
    pestana: "Expediente",
    titulo: "Expediente clínico",
    texto: "Cada consulta usa el formulario de su tipo, con los signos vitales comparados contra su rango normal.",
    items: ["Vacunas con lote y próxima dosis", "Desparasitaciones y medicamentos", "Curva de peso y archivos adjuntos", "Vacunas aplicadas en otra veterinaria"],
    img: { src: consulta, srcSet: srcSet(consulta720, consulta), alt: "Consulta en Nildu con signos vitales y su rango normal", width: 1440, height: 778 },
  },
  {
    id: "facturacion",
    pestana: "Facturación",
    titulo: "Facturación",
    texto: "El botón Cobrar pasa la consulta a caja. Emites la factura o el tiquete electrónico ante Hacienda y el cliente recibe el XML y el PDF por correo.",
    items: [
      "Factura, tiquete, notas de crédito y débito",
      "Pago dividido: efectivo, tarjeta, SINPE Móvil o transferencia",
      "Abonos y ventas a crédito",
      "Totales del día por sucursal",
    ],
    img: { src: fiscal, srcSet: srcSet(fiscal720, fiscal), alt: "Orden en caja con la opción de emitir factura o tiquete electrónico", width: 1440, height: 778 },
  },
  {
    id: "inventario",
    pestana: "Inventario",
    titulo: "Inventario",
    texto: "Existencias por sucursal y bodega, con lotes y vencimientos. Lo que vendes se rebaja solo.",
    items: ["Alertas de reorden, por vencer y vencido", "Kárdex por artículo", "Código CABYS e impuesto por artículo", "Importación del catálogo desde Excel"],
    img: { src: inventario, srcSet: srcSet(inventario720, inventario), alt: "Existencias en Nildu con avisos de reponer y un lote por vencer", width: 1440, height: 692 },
  },
  {
    id: "tareas",
    pestana: "Tareas",
    titulo: "Tareas",
    texto: "Un tablero para el equipo: cada tarea lleva responsable, fecha de vencimiento y prioridad, y puede quedar ligada a un cliente o a un paciente.",
    items: ["Columnas por estado: mueves las tarjetas arrastrando", "Responsables, prioridad y etiquetas", "Ligadas a un cliente o a un paciente", "Comentarios e historial de cambios"],
    img: { src: tareas, srcSet: srcSet(tareas720, tareas), alt: "Tablero de tareas de Nildu con columnas Por hacer, En proceso y Completado", width: 1440, height: 490 },
  },
  {
    id: "reportes",
    pestana: "Reportes",
    titulo: "Reportes",
    texto: "Tu clínica en números: el inicio muestra clientes y pacientes activos, citas de hoy y de la semana, y tareas pendientes.",
    items: ["Reporte de citas en Excel", "Reporte de pacientes en Excel", "Citas de hoy y de la semana en el inicio", "Tareas atrasadas y pendientes"],
    img: { src: reportes, alt: "Panel de control con clientes y pacientes activos, citas de hoy y de la semana, y tareas", width: 644, height: 408 },
  },
];

const tabId = (m: Modulo) => `modulo-tab-${m.id}`;
const panelId = (m: Modulo) => `modulo-panel-${m.id}`;

const ModulesSection = () => {
  const [activo, setActivo] = useState(0);
  const pestanas = useRef<(HTMLButtonElement | null)[]>([]);

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
          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">{TITULAR}</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-ink">
            Agenda, expediente, facturación, inventario, tareas y reportes, conectados. Lo que registras en la consulta llega a la caja y al inventario.
          </p>
        </div>

        <div className="mt-12">
          {/* La fila hace scroll dentro de sí misma en celular, sin barra visible. */}
          <div
            role="tablist"
            aria-label="Módulos de Nildu"
            onKeyDown={onKeyDown}
            className="flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                className={`shrink-0 whitespace-nowrap rounded-t-xl px-5 pb-3.5 pt-3 text-sm font-medium sm:px-6 ${
                  i === activo ? "bg-navy text-white" : "text-ink hover:text-navy"
                }`}
              >
                {m.pestana}
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
              className={`rounded-b-2xl rounded-tr-2xl bg-navy p-8 text-white lg:p-10 ${activo === 0 ? "" : "rounded-tl-2xl"}`}
            >
              <div className={`grid items-center gap-10 ${m.img ? "lg:grid-cols-[1fr_1.15fr]" : ""}`}>
                <div>
                  <h3 className="text-2xl font-semibold">{m.titulo}</h3>
                  <p className="mt-3 leading-relaxed text-white/75">{m.texto}</p>
                  <ul role="list" className="mt-6 space-y-2">
                    {m.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden="true" className="text-cta">
                          —
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {m.img && <BrowserFrame src={m.img.src} srcSet={m.img.srcSet} sizes={m.img.srcSet && SIZES} alt={m.img.alt} url="nildu.app" eager={false} width={m.img.width} height={m.img.height} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;
