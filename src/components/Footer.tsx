import { Linkedin, Facebook, Instagram, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Company */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-brand-fuschia to-brand-pink bg-clip-text text-transparent">
              NILDU
            </h3>
            <p className="text-white/70 text-sm">
              Modernizando la práctica veterinaria con tecnología avanzada.
            </p>
            {/* Microsoft for Startups Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-xs">
              <span className="w-2 h-2 bg-brand-blue rounded-full"></span>
              Microsoft for Startups
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Enlaces rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#inicio" className="text-white/70 hover:text-brand-fuschia transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#funciones" className="text-white/70 hover:text-brand-fuschia transition-colors">
                  Funciones
                </a>
              </li>
              <li>
                <a href="#precios" className="text-white/70 hover:text-brand-fuschia transition-colors">
                  Precios
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Contacto</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="mailto:info@nildu.com" className="hover:text-brand-fuschia transition-colors">
                  info@nildu.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <a href="https://wa.me/50688888888" className="hover:text-brand-fuschia transition-colors">
                  WhatsApp: (+506) 8888-8888
                </a>
              </li>
            </ul>
          </div>
          
          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Síguenos</h4>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-fuschia/20 transition-colors group"
              >
                <Linkedin className="w-5 h-5 text-white/70 group-hover:text-brand-fuschia" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-fuschia/20 transition-colors group"
              >
                <Facebook className="w-5 h-5 text-white/70 group-hover:text-brand-fuschia" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-fuschia/20 transition-colors group"
              >
                <Instagram className="w-5 h-5 text-white/70 group-hover:text-brand-fuschia" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-sm text-white/60">
            © 2025 NILDU S.R.L. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;