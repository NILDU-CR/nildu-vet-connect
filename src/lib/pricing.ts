export type Period = "mensual" | "anual";

// Lo que la persona armó en la sección de precios; viaja con la solicitud de demo.
export type PlanElegido = { period: Period; users: number };

// Debe coincidir con el plan cargado en Nildu (SubscriptionType.IncludedSeat en la base de datos).
// El anual cobra 10 meses ("2 meses gratis"), también en los usuarios adicionales.
// Por encima de maxQuotedUsers no se muestra precio: es precio por volumen, con propuesta aparte.
export const PLAN = { monthly: 65, annual: 650, includedUsers: 3, extraUserMonthly: 10, extraUserAnnual: 100, maxQuotedUsers: 10 };

export type Quote = { base: number; extraUsers: number; extraCost: number; total: number; perMonth: number };

export function quote(users: number, period: Period): Quote {
  const extraUsers = Math.max(0, users - PLAN.includedUsers);
  const annual = period === "anual";
  const base = annual ? PLAN.annual : PLAN.monthly;
  const extraCost = extraUsers * (annual ? PLAN.extraUserAnnual : PLAN.extraUserMonthly);
  const total = base + extraCost;
  return { base, extraUsers, extraCost, total, perMonth: annual ? total / 12 : total };
}

export function isVolume(users: number): boolean {
  return users > PLAN.maxQuotedUsers;
}

export function formatUsd(amount: number): string {
  return Number.isInteger(amount) ? `$${amount}` : `$${amount.toFixed(2)}`;
}
