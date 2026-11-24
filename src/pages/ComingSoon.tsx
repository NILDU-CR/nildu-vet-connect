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
// En celular todo cabe en una pantalla de 375×667 sin desplazarse: espacios más cortos y letra un poco menor que en
// computadora. min-h-dvh mide el alto visible, sin la parte que tapan las barras del navegador del celular.
// "Próximamente" mide unas 7.2 veces su tamaño de letra: con 12.4vw siempre cabe en el ancho del celular (menos los
// 16 px de margen a cada lado), de 320 a 639 px; desde 640 px toma los tamaños fijos.
const ComingSoon = () => {
  const [lang] = useLang();
  const t = textos[lang];

  useEffect(() => {
    document.title = t.pestana;
  }, [t.pestana]);

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-gradient-to-b from-white to-mist px-4 py-10 text-center sm:px-6 sm:py-16">
      <img src={wordmark} alt="Nildu" width={241} height={84} className="h-9 w-auto sm:h-12" />

      <h1 className="titulo-proximamente mt-6 pb-2 text-[clamp(2.25rem,12.4vw,4.5rem)] font-semibold leading-tight tracking-tight sm:mt-10 sm:text-7xl lg:text-8xl">
        {t.titulo}
      </h1>
      {/* Los tres puntos del logo (celeste, violeta y anaranjado) saltan uno tras otro, como algo que está por llegar;
          sus colores, la animación y el degradado del título están en src/index.css. */}
      <div aria-hidden="true" className="puntos-proximamente mt-3 flex gap-2.5 sm:mt-4">
        <span className="h-3 w-3 rounded-full" />
        <span className="h-3 w-3 rounded-full" />
        <span className="h-3 w-3 rounded-full" />
      </div>

      <h2 className="mt-8 max-w-3xl text-balance text-[1.75rem] font-semibold leading-tight tracking-tight sm:mt-10 sm:text-5xl">
        <HeroTitle />
      </h2>
      <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-ink sm:mt-6 sm:text-lg">{HERO_BAJADA[lang]}</p>

      <Countdown className="mt-8 sm:mt-10" />

      <p className="mt-6 max-w-xl text-pretty text-sm leading-relaxed text-ink sm:mt-10 sm:text-base">{t.nota}</p>
      {/* En celular el botón ocupa el ancho, hasta 24 rem: más fácil de tocar. */}
      <a href={`mailto:${correoInfo}`} className={`${primaryButton} mt-5 w-full max-w-sm sm:mt-6 sm:w-auto`}>
        {t.escribir}
      </a>
    </main>
  );
};

export default ComingSoon;
