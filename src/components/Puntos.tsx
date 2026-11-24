import type { ReactNode } from "react";

// Pinta los puntos de un título con los colores del logo: el de cada "i" minúscula en celeste y cada punto que
// cierra una oración en anaranjado (clases .i-celeste y .punto-naranja en src/index.css). La landing y
// "Próximamente" lo usan en todos sus títulos, menos en la palabra animada de "Próximamente", que ya lleva los colores
// del logo en movimiento. El corte del celeste está calibrado para Poppins 600, el peso de los títulos.
const Puntos = ({ texto }: { texto: string }) => {
  const partes: ReactNode[] = [];
  let tramo = "";
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    const finDeOracion = c === "." && (i === texto.length - 1 || texto[i + 1] === " ");
    if (c !== "i" && !finDeOracion) {
      tramo += c;
      continue;
    }
    if (tramo) partes.push(tramo);
    tramo = "";
    partes.push(
      <span key={i} className={c === "i" ? "i-celeste" : "punto-naranja"}>
        {c}
      </span>,
    );
  }
  if (tramo) partes.push(tramo);
  return <>{partes}</>;
};

export default Puntos;
