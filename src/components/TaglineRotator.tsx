import { useEffect, useState } from 'react';

const phrases = [
  'Historia clínica viva. No un PDF estático.',
  'Salud preventiva primero.',
  'Menos papeleo. Más cuidado real.',
  'Conecta. Informa. Acompaña.',
  'Resultados claros. Decisiones rápidas.',
  'Una experiencia centrada en el bienestar animal.'
];

const TaglineRotator = ({ interval = 4000 }: { interval?: number }) => {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % phrases.length);
        setFading(false);
      }, 450);
    }, interval);
    return () => clearInterval(id);
  }, [interval]);

  return (
    <div className="h-8 md:h-10 flex items-center justify-center overflow-hidden">
      <span
        className={
          'text-base md:text-lg font-light tracking-wide text-emerald-100 transition-opacity duration-500 ' +
          (fading ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0')
        }
      >
        {phrases[index]}
      </span>
    </div>
  );
};

export default TaglineRotator;
