export type Period = "mensual" | "anual";

// Precio propuesto en el spec §7. Debe coincidir con el plan cargado en Nildu.
// ponytail: extraUserAnnual = $50 (los "2 meses gratis" también aplican a los adicionales); pendiente de que Steve lo confirme.
export const PLAN = { monthly: 25, annual: 250, includedUsers: 3, extraUserMonthly: 5, extraUserAnnual: 50 };

export type Quote = { base: number; extraUsers: number; extraCost: number; total: number; perMonth: number };

export function quote(users: number, period: Period): Quote {
  const extraUsers = Math.max(0, users - PLAN.includedUsers);
  const annual = period === "anual";
  const base = annual ? PLAN.annual : PLAN.monthly;
  const extraCost = extraUsers * (annual ? PLAN.extraUserAnnual : PLAN.extraUserMonthly);
  const total = base + extraCost;
  return { base, extraUsers, extraCost, total, perMonth: annual ? total / 12 : total };
}

export function formatUsd(amount: number): string {
  return Number.isInteger(amount) ? `$${amount}` : `$${amount.toFixed(2)}`;
}
