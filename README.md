# Nildu · landing

Sitio público de www.nildu.com. Vite + React + TypeScript + Tailwind. Vercel lo despliega
(equipo "nildus-projects") en cada push a `main`.

## Correr en local

```bash
pnpm install
pnpm dev
```

Abre http://localhost:8080. "Próximamente" solo aparece en nildu.com, así que en local se ve la landing.

## Variables

| Variable | Uso |
|---|---|
| `VITE_COMING_SOON` | `1`: nildu.com y www.nildu.com muestran solo "Próximamente"; la URL de Vercel (*.vercel.app) muestra la landing. |
| `VITE_LAUNCH_DATE` | Fecha ISO opcional para la cuenta regresiva de "Próximamente". |
| `VITE_WEB3FORMS_KEY` | Llave pública de Web3Forms. Los envíos llegan al correo de la cuenta de Web3Forms (hoy root@nildu.com). |

Si Vercel define alguna de estas variables, gana sobre `.env`.

## Verificar

```bash
pnpm typecheck && pnpm lint && pnpm test && pnpm build
```

## Capturas del portal

Las capturas salen del portal de QA con la clínica demo.

- Hero (agenda mensual y tres recortes flotantes): las fuentes van en `capturas/` (ignorada por git) y se procesan con
  `python scripts/hero-screens.py`, que también genera `public/og.png`.
- Sección de flujo: a 1440×778, como PNG (`consulta.png`, `caja.png`, `fiscal.png`) en una carpeta, y luego:

```bash
python scripts/optimize-screens.py <carpeta>
```

## Publicar

1. `dev` de NLD.PortalAPI en producción (inventario, caja y factura electrónica).
2. El plan de Nildu cargado con el precio de la landing.
3. Costo por comprobante de Monedly revisado.
4. `VITE_COMING_SOON=0` en `.env` y verificar que Vercel no la sobrescriba.
5. Merge a `main`.

> Con `main` en Vercel, la landing completa (precios incluidos) queda pública en nildu-vet-connect.vercel.app y dentro del JS de nildu.com, aunque ahí se vea "Próximamente". `index.html` (description y og.png) también describe el producto completo en nildu.com.
