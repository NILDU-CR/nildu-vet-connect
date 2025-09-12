import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-vet.jpg";

const HeroSection = () => {
  const { t } = useLanguage();
  
  return (
    <section id="hero" className="relative h-[70vh] min-h-[600px] bg-gradient-hero overflow-hidden pt-16">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-radial from-brand-purple/20 via-transparent to-brand-blue/20"></div>
      
      <div className="container mx-auto px-4 h-full flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          {/* Content */}
          <div className="text-center lg:text-left space-y-6 animate-fade-in order-2 lg:order-1">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              {t('hero.title')}{" "}
              <span className="bg-gradient-to-r from-brand-fuschia to-brand-pink bg-clip-text text-transparent">
                NILDU
              </span>
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t('hero.subtitle')}
            </p>
            
            <div className="pt-4">
              <Button 
                size="lg" 
                className="bg-brand-fuschia hover:bg-brand-fuschia/90 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-full shadow-button hover:shadow-glow transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-fuschia focus:ring-offset-2"
                aria-label={t('hero.cta')}
              >
                {t('hero.cta')}
              </Button>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative animate-slide-up order-1 lg:order-2">
            <div className="relative z-10">
              <img 
                src={heroImage} 
                alt="Veterinario examinando mascota" 
                className="w-full h-auto rounded-2xl shadow-glass"
                loading="eager"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 md:w-24 md:h-24 bg-brand-pink/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-20 h-20 md:w-32 md:h-32 bg-brand-purple/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;