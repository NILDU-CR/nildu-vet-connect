import React, { createContext, useContext, useState } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.features': 'Funciones',
    'nav.pricing': 'Precios',
    'nav.contact': 'Contacto',
    
    // Hero Section
    'hero.title': 'Optimiza tu práctica veterinaria con',
    'hero.subtitle': 'Moderniza tu clínica con atención excepcional y seguimiento único para tus pacientes peludos',
    'hero.cta': 'Quiero más info',
    
    // Features Section
    'features.title': '¿Qué puedes encontrar en',
    'features.clients.title': 'Gestión de clientes',
    'features.clients.description': 'Administra toda la información de los dueños y su historial de manera organizada y eficiente.',
    'features.patients.title': 'Gestión de pacientes',
    'features.patients.description': 'Lleva un registro completo del historial médico, vacunas, peso y tratamientos de cada mascota.',
    'features.schedule.title': 'Agenda y recordatorios',
    'features.schedule.description': 'Programa citas y envía notificaciones automáticas para mantener a tus clientes informados.',
    
    // Pricing Section
    'pricing.title': 'Paquete de',
    'pricing.highlight': 'lanzamiento',
    'pricing.month': '/mes + IVA',
    'pricing.regular': 'Precio regular $45',
    'pricing.cta': 'Comenzar ahora',
    'pricing.feature.1': '1 usuario',
    'pricing.feature.2': 'Agenda completa',
    'pricing.feature.3': 'Gestión de clientes',
    'pricing.feature.4': 'Gestión de pacientes',
    'pricing.feature.5': 'Control de vacunas',
    'pricing.feature.6': 'Historial de pesos',
    'pricing.feature.7': 'Multiplataforma',
    'pricing.feature.8': 'Personalización',
    'pricing.feature.9': 'Soporte técnico',
    
    // Contact Form
    'contact.title': '¿Quieres',
    'contact.highlight': 'NILDU',
    'contact.subtitle': 'en tu veterinaria?',
    'contact.name': 'Nombre',
    'contact.surname': 'Apellidos',
    'contact.email': 'Email',
    'contact.phone': 'Teléfono',
    'contact.country': 'País',
    'contact.clinic': 'Nombre de la veterinaria',
    'contact.submit': 'Enviar solicitud',
    'contact.privacy': 'Tus datos se usarán solo para atender tu solicitud y respetamos tu privacidad.',
    'contact.success.title': '¡Gracias por tu interés!',
    'contact.success.description': 'Nos pondremos en contacto contigo pronto.',
    
    // Footer
    'footer.description': 'Modernizando la práctica veterinaria con tecnología avanzada.',
    'footer.links': 'Enlaces rápidos',
    'footer.contact': 'Contacto',
    'footer.follow': 'Síguenos',
    'footer.copyright': '© 2025 NILDU S.R.L. Todos los derechos reservados.',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.features': 'Features',
    'nav.pricing': 'Pricing',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'Optimize your veterinary practice with',
    'hero.subtitle': 'Modernize your clinic with exceptional care and unique monitoring for your furry patients',
    'hero.cta': 'Get more info',
    
    // Features Section
    'features.title': 'What can you find in',
    'features.clients.title': 'Client Management',
    'features.clients.description': 'Manage all owner information and history in an organized and efficient way.',
    'features.patients.title': 'Patient Management',
    'features.patients.description': 'Keep a complete record of medical history, vaccines, weight and treatments for each pet.',
    'features.schedule.title': 'Schedule & Reminders',
    'features.schedule.description': 'Schedule appointments and send automatic notifications to keep your clients informed.',
    
    // Pricing Section
    'pricing.title': 'Launch',
    'pricing.highlight': 'Package',
    'pricing.month': '/month + VAT',
    'pricing.regular': 'Regular price $45',
    'pricing.cta': 'Get Started',
    'pricing.feature.1': '1 user',
    'pricing.feature.2': 'Complete schedule',
    'pricing.feature.3': 'Client management',
    'pricing.feature.4': 'Patient management',
    'pricing.feature.5': 'Vaccine control',
    'pricing.feature.6': 'Weight history',
    'pricing.feature.7': 'Multi-platform',
    'pricing.feature.8': 'Customization',
    'pricing.feature.9': 'Technical support',
    
    // Contact Form
    'contact.title': 'Want',
    'contact.highlight': 'NILDU',
    'contact.subtitle': 'in your veterinary?',
    'contact.name': 'Name',
    'contact.surname': 'Last Name',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.country': 'Country',
    'contact.clinic': 'Clinic Name',
    'contact.submit': 'Send Request',
    'contact.privacy': 'Your data will only be used to attend your request and we respect your privacy.',
    'contact.success.title': 'Thank you for your interest!',
    'contact.success.description': 'We will contact you soon.',
    
    // Footer
    'footer.description': 'Modernizing veterinary practice with advanced technology.',
    'footer.links': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.follow': 'Follow Us',
    'footer.copyright': '© 2025 NILDU S.R.L. All rights reserved.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};