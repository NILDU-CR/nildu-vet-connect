import { useEffect } from "react";
import wordmark from "@/assets/brand/wordmark.png";
import Countdown from "@/components/Countdown";
import HeroTitle from "@/components/HeroTitle";
import { correoInfo } from "@/lib/contact";
import { HERO_BAJADA } from "@/lib/hero";
import { useLang } from "@/lib/i18n";
import { primaryButton } from "@/lib/styles";

const textos = {
  es: {
    pestana: "Nildu · Próximamente",
    titulo: "Próximamente",
    nota: "Estamos preparando el lanzamiento. Escríbenos y te contamos cómo Nildu puede ayudar a tu veterinaria.",
    escribir: `Escríbenos a ${correoInfo}`,
  },
  en: {
    pestana: "Nildu · Coming soon",
    titulo: "Coming soon",
    nota: "We're getting ready to launch. Write to us and we'll tell you how Nildu can help your vet clinic.",
    escribir: `Email ${correoInfo}`,
  },
};

// Lo que muestra nildu.com antes del lanzamiento (VITE_COMING_SOON=1; ver App.tsx). Una sola pantalla, sin menú ni
// pie: el logo, "Próximamente" en grande con los colores del logo en movimiento, el título y la bajada de la landing
// y el correo de contacto. Con "reducir movimiento" activado en el sistema, nada se mueve.
// El idioma sale de ?lang= o de lo elegido antes en este navegador; si no, español.
const ComingSoon = () => {
  const [lang] = useLang();
  const t = textos[lang];

  useEffect(() => {
    document.title = t.pestana;
  }, [t.pestana]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-mist px-4 py-16 text-center sm:px-6">
      <img src={wordmark} alt="Nildu" width={241} height={84} className="h-10 w-auto sm:h-12" />

      <h1 className="titulo-proximamente mt-10 pb-2 text-[2.75rem] font-semibold leading-tight tracking-tight min-[400px]:text-6xl sm:text-7xl lg:text-8xl">
        {t.titulo}
      </h1>
      {/* Los tres puntos del logo (celeste, violeta y anaranjado) saltan uno tras otro, como algo que está por llegar;
          sus colores, la animación y el degradado del título están en src/index.css. */}
      <div aria-hidden="true" className="puntos-proximamente mt-4 flex gap-2.5">
        <span className="h-3 w-3 rounded-full" />
        <span className="h-3 w-3 rounded-full" />
        <span className="h-3 w-3 rounded-full" />
      </div>

      <h2 className="mt-10 max-w-3xl text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
        <HeroTitle />
      </h2>
      <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink">{HERO_BAJADA[lang]}</p>

      <Countdown className="mt-10" />

      <p className="mt-10 max-w-xl text-pretty leading-relaxed text-ink">{t.nota}</p>
      <a href={`mailto:${correoInfo}`} className={`${primaryButton} mt-6`}>
        {t.escribir}
      </a>
    </main>
  );
};

export default ComingSoon;
