import wordmarkWhite from "@/assets/brand/wordmark-white.png";
import { FacebookIcon, InstagramIcon, LinkedInIcon, XIcon } from "./Icons";

const redes = [
  { href: "https://www.linkedin.com/company/nildu/", label: "LinkedIn", Icon: LinkedInIcon },
  { href: "https://www.facebook.com/nildu", label: "Facebook", Icon: FacebookIcon },
  { href: "https://www.instagram.com/nilduvet", label: "Instagram", Icon: InstagramIcon },
  { href: "https://x.com/nilduvet", label: "X", Icon: XIcon },
];

const Footer = () => (
  <footer className="bg-navy text-white">
    <div className="mx-auto flex max-w-page flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
      <div>
        <img src={wordmarkWhite} alt="Nildu" className="h-7 w-auto" />
        <a href="mailto:info@nildu.com" className="mt-4 block text-sm text-white/80 hover:text-white">
          info@nildu.com
        </a>
        <nav aria-label="Enlaces del pie" className="mt-4 flex gap-5 text-sm text-white/80">
          <a href="/ayuda" className="hover:text-white">
            Ayuda
          </a>
          <a href="/terminos" className="hover:text-white">
            Términos
          </a>
        </nav>
      </div>
      <ul className="flex gap-5 text-white/80">
        {redes.map(({ href, label, Icon }) => (
          <li key={href}>
            <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Nildu en ${label}`} title={label} className="block hover:text-white">
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

export default Footer;
