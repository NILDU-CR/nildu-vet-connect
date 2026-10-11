import { useLang } from "@/lib/i18n";
import { ComputerIcon, PhoneIcon, TabletIcon } from "./Icons";

const textos = {
  es: {
    etiqueta: "MULTIPLATAFORMA",
    titulo: "En la computadora, la tablet o el celular.",
    texto: "Nildu funciona en el navegador. No instalas nada ni necesitas un servidor en la veterinaria: entras con tu usuario desde la recepción, el consultorio o la casa.",
    equipos: [
      { nombre: "Computadora", sistemas: "Windows o Mac", Icono: ComputerIcon },
      { nombre: "Tablet", sistemas: "iPad o Android", Icono: TabletIcon },
      { nombre: "Celular", sistemas: "iPhone o Android", Icono: PhoneIcon },
    ],
  },
  en: {
    etiqueta: "ANY DEVICE",
    titulo: "On your computer, tablet or phone.",
    texto: "Nildu runs in the browser. Nothing to install and no server at the practice: sign in from the front desk, the exam room or home.",
    equipos: [
      { nombre: "Computer", sistemas: "Windows or Mac", Icono: ComputerIcon },
      { nombre: "Tablet", sistemas: "iPad or Android", Icono: TabletIcon },
      { nombre: "Phone", sistemas: "iPhone or Android", Icono: PhoneIcon },
    ],
  },
};

const PlatformsSection = () => {
  const [lang] = useLang();
  const t = textos[lang];

  return (
    <section className="border-t border-line py-16">
      <div className="mx-auto grid max-w-page items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="text-xs font-medium tracking-[0.12em] text-brand">{t.etiqueta}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{t.titulo}</h2>
          <p className="mt-4 max-w-md leading-relaxed text-ink">{t.texto}</p>
        </div>
        <ul role="list" className="grid grid-cols-3 gap-3 sm:gap-4">
          {t.equipos.map(({ nombre, sistemas, Icono }) => (
            <li key={nombre} className="flex flex-col items-center rounded-xl bg-mist px-2 py-8 text-center">
              <Icono className="h-12 w-12 text-brand sm:h-16 sm:w-16" />
              <p className="mt-4 text-sm font-semibold sm:text-base">{nombre}</p>
              <p className="mt-1 text-xs text-ink sm:text-sm">{sistemas}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PlatformsSection;
