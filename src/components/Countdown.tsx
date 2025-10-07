import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

function calculateTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, expired: false };
}

export const Countdown = ({ date }: { date?: string }) => {
  const targetStr = date || import.meta.env.VITE_LAUNCH_DATE;
  const targetDate = targetStr ? new Date(targetStr) : null;
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    targetDate ? calculateTimeLeft(targetDate) : { days: 0, hours: 0, minutes: 0, seconds: 0, expired: false }
  );

  useEffect(() => {
    if (!targetDate) return;
    const id = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(id);
  }, [targetStr]);

  if (!targetDate) return null;

  return (
    <div className="flex gap-4 justify-center text-slate-200 font-mono text-sm md:text-base">
      {(["days", "hours", "minutes", "seconds"] as const).map((k, i) => {
        const value = (timeLeft as any)[k] as number;
        return (
          <div key={k} className="flex flex-col items-center">
            <span className="px-3 py-2 rounded-md bg-slate-800/70 backdrop-blur border border-slate-700/40 min-w-[60px] text-center text-lg md:text-2xl font-semibold text-emerald-300">
              {String(value).padStart(2, "0")}
            </span>
            <span className="mt-1 text-[10px] uppercase tracking-widest text-slate-500">{k}</span>
            {i < 3 && <span className="hidden" aria-hidden>:</span>}
          </div>
        );
      })}
    </div>
  );
};

export default Countdown;
