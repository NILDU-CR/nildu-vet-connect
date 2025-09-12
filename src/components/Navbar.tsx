import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { id: 'hero', label: t('nav.home') },
    { id: 'features', label: t('nav.features') },
    { id: 'pricing', label: t('nav.pricing') },
    { id: 'contact', label: t('nav.contact') },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'features', 'pricing', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom > 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-brand-purple to-brand-fuschia bg-clip-text text-transparent">
              NILDU
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors duration-200 hover:text-brand-fuschia focus:outline-none focus:text-brand-fuschia ${
                  activeSection === item.id
                    ? 'text-brand-fuschia'
                    : 'text-foreground/70'
                }`}
                aria-label={`Navigate to ${item.label}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Language Selector & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-foreground/70 hover:text-brand-fuschia"
              aria-label={`Switch to ${language === 'es' ? 'English' : 'Spanish'}`}
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-medium uppercase">{language}</span>
            </Button>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-md rounded-lg mt-2 shadow-lg">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md hover:bg-muted focus:outline-none focus:bg-muted ${
                    activeSection === item.id
                      ? 'text-brand-fuschia bg-muted'
                      : 'text-foreground/70'
                  }`}
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;