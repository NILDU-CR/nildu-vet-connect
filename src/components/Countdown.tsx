import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

const unidades = ["days", "hours", "minutes", "seconds"] as const;

const etiquetas = {
  es: { days: "días", hours: "horas", minutes: "minutos", seconds: "segundos", faltan: "Tiempo para el lanzamiento" },
  en: { days: "days", hours: "hours", minutes: "minutes", seconds: "seconds", faltan: "Time to launch" },
};

function calculateTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, expired: false };
}

// Cuenta regresiva hasta VITE_LAUNCH_DATE (fecha ISO). Sin fecha, o cuando ya pasó, no muestra nada.
export const Countdown = ({ date, className = "" }: { date?: string; className?: string }) => {
  const [lang] = useLang();
  const t = etiquetas[lang];
  const targetStr = date || import.meta.env.VITE_LAUNCH_DATE;
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    targetStr ? calculateTimeLeft(new Date(targetStr)) : { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true },
  );

  useEffect(() => {
    if (!targetStr) return;
    const target = new Date(targetStr);
    const id = setInterval(() => setTimeLeft(calculateTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [targetStr]);

  if (!targetStr || timeLeft.expired) return null;

  return (
    <div role="timer" aria-label={t.faltan} className={`flex justify-center gap-2 sm:gap-4 ${className}`}>
      {unidades.map((k) => (
        <div key={k} className="flex min-w-[4.25rem] flex-col items-center rounded-lg border border-line bg-white px-2 py-3 sm:min-w-[5.5rem]">
          <span className="text-2xl font-semibold tabular-nums text-navy sm:text-3xl">{String(timeLeft[k]).padStart(2, "0")}</span>
          <span className="mt-1 text-xs text-ink">{t[k]}</span>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
