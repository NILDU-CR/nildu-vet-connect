import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Plugin } from "vite";
import { HERO_SIZES, HERO_WIDTHS, heroFile } from "../src/lib/hero.ts";
import type { HeroLang } from "../src/lib/hero.ts";

// Precarga la imagen del hero (el elemento LCP de la landing) desde el HTML. La landing es una SPA: sin esto, el
// navegador recién descubre la imagen cuando el JS de React ya bajó, corrió y pintó el hero.
//
// El idioma se decide en el navegador, así que un script en línea elige el srcset del idioma y agrega el
// <link rel="preload">. Repite la lógica de idiomaInicial() en src/lib/i18n.ts (?lang=, lo guardado en
// localStorage y, si no, español) y la del "Próximamente" de App.tsx: si una cambia, cambiar la otra.
//
// Los srcset, que llevan los nombres con hash de Vite, van en <meta> fuera del script. Así el texto del script no
// cambia cuando cambian las imágenes, y su hash en el CSP de vercel.json (script-src 'sha256-...') tampoco.
// El script va en una sola línea para que los saltos de línea de Windows no le cambien el hash.
const SCRIPT = String.raw`(function(){if(location.pathname!=="/")return;var d=document,m=function(n){var e=d.querySelector('meta[name="nildu-'+n+'"]');return e&&e.getAttribute("content")};if(m("coming-soon")==="1"&&/nildu\.com$/.test(location.hostname))return;var l=null;try{l=new URLSearchParams(location.search).get("lang");if(l!=="es"&&l!=="en")l=localStorage.getItem("lang")}catch(e){}if(l!=="es"&&l!=="en")l="es";var s=m("hero-"+l);if(!s)return;var k=d.createElement("link");k.rel="preload";k.as="image";k.setAttribute("imagesrcset",s);k.setAttribute("imagesizes",m("hero-sizes"));k.setAttribute("fetchpriority","high");d.head.appendChild(k)})();`;

const SCRIPT_CSP = `'sha256-${createHash("sha256").update(SCRIPT).digest("base64")}'`;

const attr = (v: string) => v.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

function vercelCsp(root: string): string {
  const config = JSON.parse(readFileSync(join(root, "vercel.json"), "utf8")) as { headers?: { headers: { key: string; value: string }[] }[] };
  const header = config.headers?.flatMap((h) => h.headers).find((h) => h.key.toLowerCase() === "content-security-policy");
  return header?.value ?? "";
}

export function heroPreload(): Plugin {
  let root = process.cwd();
  let base = "/";
  let comingSoon = false;

  return {
    name: "nildu-hero-preload",
    apply: "build",
    configResolved(config) {
      root = config.root;
      base = config.base;
      comingSoon = config.env.VITE_COMING_SOON === "1";
    },
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        if (!ctx.bundle) return html;

        // Sin el hash en el CSP, el navegador bloquea el script en producción: mejor que falle el build.
        const csp = vercelCsp(root);
        if (!csp.includes(SCRIPT_CSP)) {
          throw new Error(`hero-preload: agrega ${SCRIPT_CSP} a script-src en el Content-Security-Policy de vercel.json (el hash es del script en línea de vite-plugins/hero-preload.ts).`);
        }

        const assets = Object.values(ctx.bundle).filter((o) => o.type === "asset");
        const url = (name: string) => {
          const asset = assets.find((a) => (a.originalFileNames ?? []).some((f) => f.replace(/\\/g, "/").endsWith(`/hero/${name}`)));
          if (!asset) throw new Error(`hero-preload: no encontré ${name} en el build; revisa HERO_WIDTHS en src/lib/hero.ts y los imports de HeroSection.tsx.`);
          return base + asset.fileName;
        };
        const srcset = (lang: HeroLang) => HERO_WIDTHS.map((w) => `${url(heroFile(lang, w))} ${w}w`).join(", ");

        const tags = [
          "<!-- Precarga de la imagen del hero: vite-plugins/hero-preload.ts -->",
          `<meta name="nildu-hero-es" content="${attr(srcset("es"))}" />`,
          `<meta name="nildu-hero-en" content="${attr(srcset("en"))}" />`,
          `<meta name="nildu-hero-sizes" content="${attr(HERO_SIZES)}" />`,
          ...(comingSoon ? ['<meta name="nildu-coming-soon" content="1" />'] : []),
          `<script>${SCRIPT}</script>`,
        ];

        // Antes de la hoja de estilos: un script en línea que va después de un <link rel="stylesheet"> espera a que
        // baje el CSS, y la imagen empezaría a bajar más tarde.
        const viewport = /<meta name="viewport"[^>]*>/;
        if (!viewport.test(html)) throw new Error('hero-preload: no encontré <meta name="viewport"> en index.html.');
        return html.replace(viewport, (m) => [m, ...tags].join("\n    "));
      },
    },
  };
}
