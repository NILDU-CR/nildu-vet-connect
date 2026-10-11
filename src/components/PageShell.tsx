import { useEffect } from "react";
import type { ReactNode } from "react";
import wordmark from "@/assets/brand/wordmark.png";
import { useLang } from "@/lib/i18n";
import Footer from "./Footer";
import LangToggle from "./LangToggle";

type PageShellProps = { title: string; children: ReactNode };

// Marco de las páginas sueltas (ayuda, términos, privacidad): encabezado mínimo, sin el menú de la landing.
const PageShell = ({ title, children }: PageShellProps) => {
  const [lang] = useLang();

  useEffect(() => {
    document.title = `${title} · Nildu`;
  }, [title]);

  return (
    <>
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex h-16 max-w-page items-center justify-between px-4 sm:px-6">
          <a href="/" className="shrink-0">
            <img src={wordmark} alt="Nildu" width={241} height={84} className="h-7 w-auto" />
          </a>
          <div className="flex items-center gap-3">
            <LangToggle />
            <a href="https://nildu.app" className="rounded-md border border-line px-4 py-2 text-sm font-medium text-navy hover:border-navy">
              {lang === "en" ? "Log in" : "Iniciar sesión"}
            </a>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default PageShell;
