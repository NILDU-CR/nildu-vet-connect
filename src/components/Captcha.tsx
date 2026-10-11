import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

declare global {
  interface Window {
    hcaptcha?: { render: (el: HTMLElement, opts: Record<string, unknown>) => string };
    onHCaptchaLoad?: () => void;
  }
}

// Llave pública que Web3Forms da a las cuentas gratis; Web3Forms valida el token del lado del servidor.
const SITEKEY = "50b2fe65-b00b-4b9e-ad62-3ba471098be2";

let ready: Promise<void> | null = null;

// El script de hCaptcha se carga una sola vez, la primera vez que se monta el widget.
function loadHCaptcha(): Promise<void> {
  ready ??= new Promise((resolve, reject) => {
    window.onHCaptchaLoad = () => resolve();
    const script = document.createElement("script");
    script.src = "https://js.hcaptcha.com/1/api.js?render=explicit&hl=es&onload=onHCaptchaLoad";
    script.async = true;
    script.onerror = () => {
      ready = null;
      reject(new Error("hCaptcha no cargó"));
    };
    document.head.appendChild(script);
  });
  return ready;
}

type CaptchaProps = { onToken: (token: string) => void; fallback: ReactNode };

// Para pedir un token nuevo (por ejemplo, después de un envío fallido), el padre lo vuelve a montar con otra `key`.
const Captcha = ({ onToken, fallback }: CaptchaProps) => {
  const box = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    loadHCaptcha().then(
      () => {
        if (!alive || !box.current || !window.hcaptcha) return;
        window.hcaptcha.render(box.current, {
          sitekey: SITEKEY,
          // El widget normal mide 303 px; en pantallas angostas se usa el compacto.
          size: box.current.offsetWidth < 303 ? "compact" : "normal",
          callback: onToken,
          "expired-callback": () => onToken(""),
          "error-callback": () => onToken(""),
        });
      },
      () => alive && setFailed(true),
    );
    return () => {
      alive = false;
    };
  }, [onToken]);

  if (failed) return <p className="text-sm text-ink">No se pudo cargar la verificación. {fallback}</p>;
  return <div ref={box} className="min-h-[78px]" />;
};

export default Captcha;
