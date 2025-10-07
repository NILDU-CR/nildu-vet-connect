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
  'pricing.regular': 'Precio regular $45 USD',
    'pricing.currency': 'USD',
    'pricing.cta': 'Quiero más info',
    'pricing.feature.1': '1 usuario',
    'pricing.feature.2': 'Agenda completa',
    'pricing.feature.3': 'Gestión de clientes',
    'pricing.feature.4': 'Gestión de pacientes',
    'pricing.feature.5': 'Control de vacunas',
    'pricing.feature.6': 'Historial de pesos',
    'pricing.feature.7': 'Multiplataforma',
    'pricing.feature.8': 'Personalización de motivos',
    'pricing.feature.9': 'Soporte técnico',
    'pricing.annual.price': '$255',
    'pricing.annual.unit': '/año + IVA',
  'pricing.annual.regular': 'Precio regular $459 USD',
    'pricing.annual.discount': 'Descuento: 15%',
  'pricing.popular': 'Más popular',
  'pricing.monthly.label': 'Plan Mensual',
  'pricing.annual.label': 'Plan Anual',
  'pricing.feature.agenda': 'Agenda completa',
  'pricing.feature.clients': 'Gestión de clientes',
  'pricing.feature.vaccines': 'Control de vacunas',
  'pricing.feature.weight': 'Historial de peso',
  'pricing.feature.multi': 'Multiplataforma',
  'pricing.feature.custom': 'Personalización',
  'pricing.feature.support': 'Soporte técnico',

  'how.title': 'Cómo funciona',
  'how.step1.title': 'Crea tu cuenta',
  'how.step1.desc': 'Accede al panel y configura tu clínica en minutos.',
  'how.step2.title': 'Registra clientes y pacientes',
  'how.step2.desc': 'Centraliza historiales y datos clave en un mismo lugar.',
  'how.step3.title': 'Agenda y recordatorios',
  'how.step3.desc': 'Programa citas y envía notificaciones automáticas.',
  'how.step4.title': 'Control y seguimiento',
  'how.step4.desc': 'Vacunas, peso y más métricas siempre actualizadas.',

  'testimonials.title': 'Testimonios',
  'testimonials.subtitle': 'Profesionales que ya confían en NILDU',
  'faq.title': 'Preguntas frecuentes',
  'faq.more': '¿Tienes otra pregunta?',

  'faq.q1': '¿Cómo protegen mis datos?',
  'faq.a1': 'Usamos cifrado y cumplimos buenas prácticas de seguridad.',
  'faq.q2': '¿Puedo cancelar en cualquier momento?',
  'faq.a2': 'Sí, sin penalizaciones. El acceso dura hasta el final del ciclo.',
  'faq.q3': '¿Incluye integraciones?',
  'faq.a3': 'Pronto añadiremos integraciones con herramientas clave.',
  'faq.q4': '¿Ofrecen soporte?',
  'faq.a4': 'Soporte por email y chat en horario comercial.',
  'faq.q5': '¿Habrá más planes?',
  'faq.a5': 'Sí, añadiremos planes según necesidades de usuarios.',

  'demo.title': 'Explora la plataforma',
  'demo.subtitle': 'Vistas previas de las principales funciones',

    
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
  'pricing.regular': 'Regular price $45 USD',
  'pricing.currency': 'USD',
    'pricing.cta': 'Get more info',
    'pricing.feature.1': '1 user',
    'pricing.feature.2': 'Complete schedule',
    'pricing.feature.3': 'Client management',
    'pricing.feature.4': 'Patient management',
    'pricing.feature.5': 'Vaccine control',
    'pricing.feature.6': 'Weight history',
    'pricing.feature.7': 'Multi-platform',
    'pricing.feature.8': 'Reasons customization',
    'pricing.feature.9': 'Technical support',
  // Annual Pricing Section
  'pricing.annual.price': '$255',
  'pricing.annual.unit': '/year + VAT',
  'pricing.annual.regular': 'Regular price $459 USD',
  'pricing.annual.discount': 'Discount: 15%',
  'pricing.popular': 'Most popular',
  'pricing.monthly.label': 'Monthly Plan',
  'pricing.annual.label': 'Annual Plan',
  'pricing.feature.agenda': 'Full agenda',
  'pricing.feature.clients': 'Client management',
  'pricing.feature.vaccines': 'Vaccine tracking',
  'pricing.feature.weight': 'Weight history',
  'pricing.feature.multi': 'Multi-platform',
  'pricing.feature.custom': 'Customization',
  'pricing.feature.support': 'Technical support',

  'how.title': 'How it works',
  'how.step1.title': 'Create your account',
  'how.step1.desc': 'Access the dashboard and configure your clinic in minutes.',
  'how.step2.title': 'Register clients & patients',
  'how.step2.desc': 'Centralize records and key data in one place.',
  'how.step3.title': 'Scheduling & reminders',
  'how.step3.desc': 'Schedule appointments and send automatic notifications.',
  'how.step4.title': 'Control & tracking',
  'how.step4.desc': 'Vaccines, weight and more always updated.',

  'testimonials.title': 'Testimonials',
  'testimonials.subtitle': 'Professionals already trusting NILDU',
  'faq.title': 'Frequently Asked Questions',
  'faq.more': 'Still have a question?',

  'faq.q1': 'How do you protect my data?',
  'faq.a1': 'We use encryption and follow security best practices.',
  'faq.q2': 'Can I cancel anytime?',
  'faq.a2': 'Yes, no penalties. Access lasts until the cycle ends.',
  'faq.q3': 'Are integrations included?',
  'faq.a3': 'Integrations with key tools coming soon.',
  'faq.q4': 'Do you offer support?',
  'faq.a4': 'Support via email and chat during business hours.',
  'faq.q5': 'Will there be more plans?',
  'faq.a5': 'Yes, we will add plans as user needs grow.',

  'demo.title': 'Explore the platform',
  'demo.subtitle': 'Preview of the main features',

    
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