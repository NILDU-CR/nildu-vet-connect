export type Period = "mensual" | "anual";

// monthly/annual: precio de lanzamiento, por tiempo limitado. regular*: el precio oficial después del lanzamiento.
// Debe coincidir con el plan cargado en Nildu (SubscriptionType.IncludedSeat en la base de datos).
// ponytail: extraUserAnnual = $50 (los "2 meses gratis" también aplican a los adicionales); pendiente de que Steve lo confirme.
export const PLAN = { monthly: 25, annual: 250, regularMonthly: 45, regularAnnual: 450, includedUsers: 1, extraUserMonthly: 5, extraUserAnnual: 50 };

export type Quote = { base: number; extraUsers: number; extraCost: number; total: number; perMonth: number; regularTotal: number };

export function quote(users: number, period: Period): Quote {
  const extraUsers = Math.max(0, users - PLAN.includedUsers);
  const annual = period === "anual";
  const base = annual ? PLAN.annual : PLAN.monthly;
  const extraCost = extraUsers * (annual ? PLAN.extraUserAnnual : PLAN.extraUserMonthly);
  const total = base + extraCost;
  const regularTotal = (annual ? PLAN.regularAnnual : PLAN.regularMonthly) + extraCost;
  return { base, extraUsers, extraCost, total, perMonth: annual ? total / 12 : total, regularTotal };
}

export function formatUsd(amount: number): string {
  return Number.isInteger(amount) ? `$${amount}` : `$${amount.toFixed(2)}`;
}
