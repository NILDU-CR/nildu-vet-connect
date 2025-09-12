import { Linkedin, Facebook, Instagram, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-foreground text-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-6 md:gap-8">
          {/* Logo and Company */}
          <div className="space-y-4 col-span-full md:col-span-1">
            <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-brand-fuschia to-brand-pink bg-clip-text text-transparent">
              NILDU
            </h3>
            <p className="text-white/70 text-sm">
              {t('footer.description')}
            </p>
            {/* Microsoft for Startups Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-xs">
              <span className="w-2 h-2 bg-brand-blue rounded-full"></span>
              Microsoft for Startups
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-sm md:text-base">{t('footer.links')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => scrollToSection('hero')}
                  className="text-white/70 hover:text-brand-fuschia transition-colors focus:outline-none focus:text-brand-fuschia"
                >
                  {t('nav.home')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('features')}
                  className="text-white/70 hover:text-brand-fuschia transition-colors focus:outline-none focus:text-brand-fuschia"
                >
                  {t('nav.features')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('pricing')}
                  className="text-white/70 hover:text-brand-fuschia transition-colors focus:outline-none focus:text-brand-fuschia"
                >
                  {t('nav.pricing')}
                </button>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-sm md:text-base">{t('footer.contact')}</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a 
                  href="mailto:info@nildu.com" 
                  className="hover:text-brand-fuschia transition-colors focus:outline-none focus:text-brand-fuschia"
                >
                  info@nildu.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <a 
                  href="https://wa.me/50688888888" 
                  className="hover:text-brand-fuschia transition-colors focus:outline-none focus:text-brand-fuschia"
                  aria-label="Contact us on WhatsApp"
                >
                  WhatsApp: (+506) 8888-8888
                </a>
              </li>
            </ul>
          </div>
          
          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-sm md:text-base">{t('footer.follow')}</h4>
            <div className="flex gap-3">
              <a 
                href="https://www.linkedin.com/company/nildu/" 
                className="w-8 h-8 md:w-10 md:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-fuschia/20 transition-colors group focus:outline-none focus:ring-2 focus:ring-brand-fuschia"
                aria-label="Follow us on LinkedIn"
                target="_blank" rel="noopener noreferrer"
              >
                <Linkedin className="w-4 h-4 md:w-5 md:h-5 text-white/70 group-hover:text-brand-fuschia" />
              </a>
              <a 
                href="https://www.facebook.com/nildu" 
                className="w-8 h-8 md:w-10 md:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-fuschia/20 transition-colors group focus:outline-none focus:ring-2 focus:ring-brand-fuschia"
                aria-label="Follow us on Facebook"
                target="_blank" rel="noopener noreferrer"
              >
                <Facebook className="w-4 h-4 md:w-5 md:h-5 text-white/70 group-hover:text-brand-fuschia" />
              </a>
              <a 
                href="https://www.instagram.com/nilduvet" 
                className="w-8 h-8 md:w-10 md:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-fuschia/20 transition-colors group focus:outline-none focus:ring-2 focus:ring-brand-fuschia"
                aria-label="Follow us on Instagram"
                target="_blank" rel="noopener noreferrer"
              >
                <Instagram className="w-4 h-4 md:w-5 md:h-5 text-white/70 group-hover:text-brand-fuschia" />
              </a>
              <a 
                href="https://x.com/nilduvet" 
                className="w-8 h-8 md:w-10 md:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-fuschia/20 transition-colors group focus:outline-none focus:ring-2 focus:ring-brand-fuschia"
                aria-label="Follow us on X (Twitter)"
                target="_blank" rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5 text-white/70 group-hover:text-brand-fuschia">
                  <path d="M17.53 3.25H21.25L14.39 10.87L22.38 20.75H16.16L10.98 14.39L5.19 20.75H1.47L8.71 12.61L1 3.25H7.41L12.13 8.97L17.53 3.25ZM16.46 19.07H18.13L6.99 4.82H5.18L16.46 19.07Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-6 md:mt-8 pt-6 md:pt-8 text-center">
          <p className="text-xs md:text-sm text-white/60">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;