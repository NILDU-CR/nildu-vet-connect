type DoodleProps = { className: string };

// Adornos dibujados a mano, solo para el hero. Decorativos: aria-hidden, sin animación.

// Flecha con rulo, dibujada a mano, que apunta hacia abajo a la izquierda (estilo jane.app).
export const LoopArrow = ({ className }: DoodleProps) => (
  <svg viewBox="0 0 120 110" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
    <path d="M112 18C80 2 40 6 30 38c-8 26 18 44 38 30 16-11 6-36-14-30-20 6-30 34-24 62" />
    <path d="M22 88l8 14 12-10" />
  </svg>
);

// "Palitos" de chispa: trazos cortos que salen de un mismo punto.
export const Sparks = ({ className }: DoodleProps) => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" aria-hidden="true" className={className}>
    <path d="M10 22V6" />
    <path d="M18 26l10-12" />
    <path d="M22 34h16" />
    <path d="M20 42l14 4" />
  </svg>
);
