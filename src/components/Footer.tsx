import wordmarkWhite from "@/assets/brand/wordmark-white.png";
import { useLang } from "@/lib/i18n";
import { FacebookIcon, InstagramIcon, LinkedInIcon, XIcon } from "./Icons";

const redes = [
  { href: "https://www.linkedin.com/company/nildu/", label: "LinkedIn", Icon: LinkedInIcon },
  { href: "https://www.facebook.com/nildu", label: "Facebook", Icon: FacebookIcon },
  { href: "https://www.instagram.com/nilduvet", label: "Instagram", Icon: InstagramIcon },
  { href: "https://x.com/nilduvet", label: "X", Icon: XIcon },
];

const textos = {
  es: { nav: "Enlaces del pie", ayuda: "Ayuda", terminos: "Términos", privacidad: "Privacidad", en: "Nildu en" },
  en: { nav: "Footer links", ayuda: "Help", terminos: "Terms", privacidad: "Privacy", en: "Nildu on" },
};

const Footer = () => {
  const [lang] = useLang();
  const t = textos[lang];

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto flex max-w-page flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div>
          <img src={wordmarkWhite} alt="Nildu" width={241} height={84} className="h-7 w-auto" />
          <a href="mailto:info@nildu.com" className="mt-4 block text-sm text-white/80 hover:text-white">
            info@nildu.com
          </a>
          <nav aria-label={t.nav} className="mt-4 flex gap-5 text-sm text-white/80">
            <a href="/ayuda" className="hover:text-white">
              {t.ayuda}
            </a>
            <a href="/terminos" className="hover:text-white">
              {t.terminos}
            </a>
            <a href="/privacidad" className="hover:text-white">
              {t.privacidad}
            </a>
          </nav>
        </div>
        <ul className="flex gap-5 text-white/80">
          {redes.map(({ href, label, Icon }) => (
            <li key={href}>
              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${t.en} ${label}`} title={label} className="block hover:text-white">
                <Icon className="h-5 w-5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-page px-4 py-6 text-xs text-white/60 sm:px-6">© {new Date().getFullYear()} NILDU S.R.L.</p>
      </div>
    </footer>
  );
};

export default Footer;
