import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-vet.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-radial from-brand-purple/20 via-transparent to-brand-blue/20"></div>
      
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Optimiza tu práctica veterinaria con{" "}
              <span className="bg-gradient-to-r from-brand-fuschia to-brand-pink bg-clip-text text-transparent">
                NILDU
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl">
              Moderniza tu clínica con atención excepcional y seguimiento único para tus pacientes peludos
            </p>
            
            <div className="pt-4">
              <Button 
                size="lg" 
                className="bg-brand-fuschia hover:bg-brand-fuschia/90 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-button hover:shadow-glow transition-all duration-300 hover:scale-105"
              >
                Quiero más info
              </Button>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative animate-slide-up">
            <div className="relative z-10">
              <img 
                src={heroImage} 
                alt="Veterinario examinando mascota" 
                className="w-full h-auto rounded-2xl shadow-glass"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-pink/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-purple/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;