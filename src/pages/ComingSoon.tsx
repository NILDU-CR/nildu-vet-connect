import Countdown from "@/components/Countdown";
import ConstellationBackground from "@/components/ConstellationBackground";
import TaglineRotator from "@/components/TaglineRotator";
import { useEffect, useState } from "react";

// Página temporal "Próximamente" con fondo de constelaciones y frases rotando.
const ComingSoon = () => {
  const [expired, setExpired] = useState(false);
  useEffect(() => {
    const targetStr = import.meta.env.VITE_LAUNCH_DATE;
    if (!targetStr) return;
    const target = new Date(targetStr).getTime();
    const check = () => {
      if (Date.now() > target) setExpired(true);
    };
    check();
    const id = setInterval(check, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center text-white px-4 py-20 bg-slate-950">
      <ConstellationBackground density={90} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(0,200,170,0.12),transparent_70%)]" />
      <div className="absolute inset-0 backdrop-blur-[1px]" />
      <div className="relative max-w-2xl w-full text-center space-y-12">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-cyan-200 to-emerald-400 animate-[titleGlow_4s_ease-in-out_infinite]">
          Próximamente
        </h1>
        <TaglineRotator />
        <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light max-w-xl mx-auto">
          Plataforma inteligente para bienestar veterinario, registros vivos y conexión real con las familias.
        </p>
        {!expired && (
          <div className="pt-4">
            <Countdown />
          </div>
        )}
        {expired && (
          <p className="text-emerald-300/80 text-sm tracking-wide uppercase mt-2">Listo para despegar</p>
        )}
        <div className="flex flex-col items-center space-y-6 pt-4">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-300/70">En construcción</p>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
          <p className="text-slate-500 text-sm max-w-md">
            Vuelve pronto y sé de los primeros en explorar lo que viene. Lo mejor aún no se ha mostrado.
          </p>
          <p className="text-slate-500 text-sm max-w-md">
            Si quieres información escribe a{' '}
            <a
              href="mailto:info@nildu.com"
              className="underline decoration-dotted underline-offset-2 hover:text-emerald-300 focus:outline-none focus:text-emerald-300 transition-colors"
            >
              info@nildu.com
            </a>
          </p>
        </div>
        <p className="text-xs text-slate-600/60">&copy; {new Date().getFullYear()} Nildu Vet Connect</p>
      </div>
      <style>{`
        @keyframes pulseGradient { 
          0%,100% { filter: hue-rotate(0deg) brightness(1); }
          50% { filter: hue-rotate(35deg) brightness(1.15); }
        }
        @keyframes titleGlow {
          0%,100% { text-shadow: 0 0 14px rgba(0,255,200,0.15), 0 0 28px rgba(0,180,160,0.08); }
          50% { text-shadow: 0 0 18px rgba(0,255,220,0.35), 0 0 42px rgba(0,200,170,0.18); }
        }
      `}</style>
    </div>
  );
};

export default ComingSoon;
